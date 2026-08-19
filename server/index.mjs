import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SYSTEM_PROMPT } from "./prompt.mjs";

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.resolve(serverDirectory, "../dist");
const port = Number(process.env.PORT || 3000);
const adminEmail = (process.env.ADMIN_EMAIL || "y.nalovic@yeti-factory.com").trim().toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD || "";
const sessionSecret = process.env.SESSION_SECRET || "";
const sessionDays = Math.max(1, Number(process.env.SESSION_DAYS || 7));
const aiApiUrl = process.env.AI_API_URL || "https://api.openai.com/v1/chat/completions";
const aiApiKey = process.env.AI_API_KEY || "";
const aiModel = process.env.AI_MODEL || "";
const cookieSecure = process.env.COOKIE_SECURE !== "false";

if (!adminPassword || sessionSecret.length < 32 || !aiModel) {
  console.error("Configuration incomplète : ADMIN_PASSWORD, SESSION_SECRET (32 caractères minimum) et AI_MODEL sont obligatoires.");
  process.exit(1);
}

const loginAttempts = new Map();
const chatAttempts = new Map();
const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".gif", "image/gif"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webmanifest", "application/manifest+json"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

function hash(value) {
  return createHash("sha256").update(String(value)).digest();
}

function safeEqual(left, right) {
  return timingSafeEqual(hash(left), hash(right));
}

function sign(payload) {
  return createHmac("sha256", sessionSecret).update(payload).digest("base64url");
}

function createSessionToken(email) {
  const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + sessionDays * 86400000 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function parseCookies(req) {
  return Object.fromEntries(
    String(req.headers.cookie || "")
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const separator = item.indexOf("=");
        return separator === -1 ? [item, ""] : [item.slice(0, separator), decodeURIComponent(item.slice(separator + 1))];
      }),
  );
}

function getSession(req) {
  const token = parseCookies(req).doggy_friend_session;
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (session.email !== adminEmail || !Number.isFinite(session.exp) || session.exp <= Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

function clientIp(req) {
  return String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown").split(",")[0].trim();
}

function isRateLimited(store, key, limit, windowMs) {
  const now = Date.now();
  const current = store.get(key);
  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  current.count += 1;
  return current.count > limit;
}

function securityHeaders(contentType = "application/json; charset=utf-8") {
  return {
    "Cache-Control": "no-store",
    "Content-Security-Policy": "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; font-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'",
    "Content-Type": contentType,
    "Cross-Origin-Opener-Policy": "same-origin",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
  };
}

function sendJson(res, status, body, extraHeaders = {}) {
  res.writeHead(status, { ...securityHeaders(), ...extraHeaders });
  res.end(JSON.stringify(body));
}

async function readJson(req, maximumBytes = 65536) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
    if (Buffer.byteLength(body) > maximumBytes) throw new Error("PAYLOAD_TOO_LARGE");
  }
  return JSON.parse(body || "{}");
}

function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  const proto = String(req.headers["x-forwarded-proto"] || "http").split(",")[0].trim();
  return origin === `${proto}://${req.headers.host}`;
}

async function handleLogin(req, res) {
  const ip = clientIp(req);
  if (isRateLimited(loginAttempts, ip, 10, 15 * 60 * 1000)) {
    sendJson(res, 429, { error: "Trop de tentatives. Réessayez dans 15 minutes." });
    return;
  }
  const body = await readJson(req, 8192);
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  if (!safeEqual(email, adminEmail) || !safeEqual(password, adminPassword)) {
    sendJson(res, 401, { error: "Adresse ou mot de passe incorrect." });
    return;
  }
  loginAttempts.delete(ip);
  const cookie = [
    `doggy_friend_session=${encodeURIComponent(createSessionToken(email))}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${sessionDays * 86400}`,
    cookieSecure ? "Secure" : "",
  ].filter(Boolean).join("; ");
  sendJson(res, 200, { authenticated: true, email }, { "Set-Cookie": cookie });
}

async function handleChat(req, res) {
  const session = getSession(req);
  if (!session) {
    sendJson(res, 401, { error: "Session expirée." });
    return;
  }
  if (isRateLimited(chatAttempts, session.email, 60, 60 * 60 * 1000)) {
    sendJson(res, 429, { error: "Limite horaire atteinte. Réessayez plus tard." });
    return;
  }

  const body = await readJson(req);
  if (!Array.isArray(body.messages) || body.messages.length < 1 || body.messages.length > 20) {
    sendJson(res, 400, { error: "Conversation invalide." });
    return;
  }
  const messages = body.messages.map((message) => ({
    role: message?.role,
    content: String(message?.content || "").trim(),
  }));
  if (messages.some((message) => !["user", "assistant"].includes(message.role) || !message.content || message.content.length > 4000)) {
    sendJson(res, 400, { error: "Conversation invalide." });
    return;
  }

  const headers = { "Content-Type": "application/json" };
  if (aiApiKey) headers.Authorization = `Bearer ${aiApiKey}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000);
  res.on("close", () => {
    if (!res.writableEnded) controller.abort();
  });

  try {
    const upstream = await fetch(aiApiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: aiModel,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
      signal: controller.signal,
    });
    if (!upstream.ok || !upstream.body) {
      const status = upstream.status === 429 ? 429 : upstream.status === 402 ? 402 : 502;
      sendJson(res, status, { error: status === 429 ? "Trop de requêtes." : status === 402 ? "Crédits IA épuisés." : "Service IA indisponible." });
      return;
    }
    res.writeHead(200, {
      ...securityHeaders("text/event-stream; charset=utf-8"),
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    });
    for await (const chunk of upstream.body) res.write(chunk);
    res.end();
  } catch (error) {
    if (!res.headersSent) sendJson(res, 502, { error: "Service IA indisponible." });
    else res.end();
    if (error?.name !== "AbortError") console.error("Erreur IA :", error?.message || error);
  } finally {
    clearTimeout(timeout);
  }
}

async function sendStatic(req, res, pathname) {
  let relativePath = pathname === "/" ? "index.html" : decodeURIComponent(pathname).replace(/^\/+/, "");
  let filePath = path.resolve(distDirectory, relativePath);
  if (!filePath.startsWith(`${distDirectory}${path.sep}`) && filePath !== distDirectory) {
    sendJson(res, 400, { error: "Chemin invalide." });
    return;
  }
  try {
    if (!existsSync(filePath) || !(await stat(filePath)).isFile()) filePath = path.join(distDirectory, "index.html");
    const extension = path.extname(filePath).toLowerCase();
    const cacheControl = path.basename(filePath) === "index.html" || extension === ".webmanifest"
      ? "no-cache"
      : "public, max-age=31536000, immutable";
    res.writeHead(200, {
      ...securityHeaders(mimeTypes.get(extension) || "application/octet-stream"),
      "Cache-Control": cacheControl,
    });
    if (req.method === "HEAD") res.end();
    else createReadStream(filePath).pipe(res);
  } catch {
    sendJson(res, 404, { error: "Fichier introuvable." });
  }
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", "http://localhost");
    if (url.pathname === "/health" && req.method === "GET") {
      sendJson(res, 200, { status: "ok" });
      return;
    }
    if (url.pathname.startsWith("/api/") && !sameOrigin(req)) {
      sendJson(res, 403, { error: "Origine refusée." });
      return;
    }
    if (url.pathname === "/api/session" && req.method === "GET") {
      const session = getSession(req);
      sendJson(res, 200, session ? { authenticated: true, email: session.email } : { authenticated: false });
      return;
    }
    if (url.pathname === "/api/login" && req.method === "POST") {
      await handleLogin(req, res);
      return;
    }
    if (url.pathname === "/api/logout" && req.method === "POST") {
      sendJson(res, 200, { authenticated: false }, {
        "Set-Cookie": `doggy_friend_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${cookieSecure ? "; Secure" : ""}`,
      });
      return;
    }
    if (url.pathname === "/api/chat" && req.method === "POST") {
      await handleChat(req, res);
      return;
    }
    if (url.pathname.startsWith("/api/")) {
      sendJson(res, 404, { error: "Route introuvable." });
      return;
    }
    if (!["GET", "HEAD"].includes(req.method || "")) {
      sendJson(res, 405, { error: "Méthode refusée." });
      return;
    }
    await sendStatic(req, res, url.pathname);
  } catch (error) {
    console.error("Erreur serveur :", error?.message || error);
    if (!res.headersSent) sendJson(res, 500, { error: "Erreur interne." });
    else res.end();
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Doggy Friend écoute sur le port ${port}.`);
});
