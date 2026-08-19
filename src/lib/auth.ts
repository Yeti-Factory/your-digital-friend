export type Session = {
  authenticated: boolean;
  email?: string;
};

async function parseResponse(response: Response) {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "Une erreur est survenue.");
  return body;
}

export async function getSession(): Promise<Session> {
  const response = await fetch("/api/session", { credentials: "same-origin" });
  return parseResponse(response);
}

export async function login(email: string, password: string): Promise<Session> {
  const response = await fetch("/api/login", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return parseResponse(response);
}

export async function logout() {
  const response = await fetch("/api/logout", {
    method: "POST",
    credentials: "same-origin",
  });
  return parseResponse(response);
}
