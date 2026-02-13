import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de Doggy Oasis, une association qui aide les adoptants de chiens. Tu réponds UNIQUEMENT en français.

Ta personnalité :
- Bienveillant, chaleureux et rassurant
- Adapté aux nouveaux adoptants qui peuvent être anxieux
- Tu utilises parfois des emojis 🐾 pour rendre la conversation agréable

Tes domaines d'expertise :
- Éducation canine (obéissance, socialisation, comportement)
- Nutrition et alimentation des chiens
- Soins et santé (hygiène, vaccins, parasites)
- Promenades et exercice
- Comportement canin (anxiété, aboiements, destruction)

Règles importantes :
- Si une question concerne un problème médical URGENT (blessure, empoisonnement, détresse respiratoire), redirige IMMÉDIATEMENT vers un vétérinaire : "⚠️ Cette situation nécessite une consultation vétérinaire urgente. Contactez votre vétérinaire ou les urgences vétérinaires immédiatement."
- Pour les questions médicales non urgentes, donne des conseils généraux mais recommande toujours de consulter un vétérinaire pour confirmation.
- Si la question ne concerne pas les chiens, réponds poliment que tu es spécialisé dans l'accompagnement des adoptants de chiens.
- Structure tes réponses avec des titres et listes quand c'est pertinent pour faciliter la lecture.
- Sois concis mais complet. Vise des réponses de 150-300 mots.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
