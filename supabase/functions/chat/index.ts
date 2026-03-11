import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GUIDE_CONTENT = `
=== LIVRET D'ACCUEIL DOGGY OASIS INTERNATIONAL ===

1. RAPPEL SUR LA VIE AU REFUGE ET SUR LA SITUATION DES CHIENS EN GUYANE

Les chiens que nous accueillons au refuge arrivent dans un contexte de sauvetage, d'abandon ou par le biais de la fourrière. Ces chiens ont pour la plupart été malmenés, maltraités et peu considérés. Votre futur chien connaitra une vie familiale et le confort d'un foyer, certainement pour la première fois. Il lui faudra du temps pour découvrir et appréhender ce nouvel environnement : climat, bruits, congénères, règles du domicile, nouveaux maitres. Un peu de patience et beaucoup d'amour vous permettront de leur donner confiance en cette nouvelle vie.

Au refuge, nous les soignons, les aimons et les entrainons. Les chiens découvrent de nombreux congénères au sein de la meute. Avant d'être à l'adoption, nous prenons le temps de connaitre les caractères de nos protégés. Il est important de comprendre que nous connaissons les chiens à travers une vie collective, souvent en liberté et dans un grand espace. Les conditions dans lesquelles ils seront auprès de vous ne seront pas tout à fait les mêmes, et leurs caractères évolueront aussi en fonction de leurs expériences quotidiennes.

Les futurs adoptants nous demandent souvent si les chiens ne sont pas trop tristes de quitter le sanctuaire. Eh bien non ! Même si ce temps permet à votre chien de se remettre sur patte, la vie en meute est parfois lassante pour eux et ils ont besoin d'une attention toute particulière. C'est auprès de vous qu'ils trouveront un foyer stable.

2. ALIMENTATION - TRANSITION ALIMENTAIRE

Si vous changez de marque de croquettes, veillez à bien respecter les règles de la transition alimentaire. Un changement brutal peut causer des troubles du transit :
- Jour 1 et jour 2 : 75% de l'ancienne alimentation + 25% de la nouvelle
- Jour 3 et 4 : 50% de l'ancienne + 50% de la nouvelle
- Jour 5 et 6 : 25% de l'ancienne + 75% de la nouvelle

Respectez bien les recommandations sur les paquets alimentaires concernant la ration pour que l'alimentation soit toujours adaptée au poids, à l'exercice et à la condition de votre chien.

3. LES PREMIERS ACHATS

Quelques achats à prévoir pour son arrivée :
- Des gamelles (céramique ou inox) : Les doubles gamelles ne sont pas recommandées, privilégiez des gamelles séparées afin de préserver une eau propre.
- Des jouets : orientez-vous vers des jouets d'interaction mais aussi des jeux d'occupation pour vos premiers départs du domicile.
- Un panier, un coussin ou une cage d'intérieur.
- Une caisse de transport / sac de transport / Harnais de sécurité / filet de sécurité pour les trajets en voiture.
- Un collier / harnais : Nous conseillons un collier facilement ajustable pour commencer. Le harnais est conseillé et plus sécurisant. N'oubliez pas une petite médaille avec vos coordonnées.
- Une laisse et une longe : Une laisse courte pour la ville et une longe pour les balades au parc et les exercices de rappel.
- Des friandises : Pour récompenser votre chien et tester ses goûts. Des objets de mastication répondront à un besoin du chien et lui permettront de déstresser.
- Une muselière adaptée : Pour les déplacements en train en Ile de France (port muselière obligatoire dans les métros).

4. ANTICIPER LES VACANCES ET LES URGENCES

Assurez-vous qu'une personne de confiance pourra prendre le relais en cas d'urgence. Pour les vacances, renseignez-vous sur les possibilités de garde à proximité.

5. PRÉPARER LA RENCONTRE AVEC VOS AUTRES ANIMAUX

Avec les chiens : Nous préconisons toujours une rencontre en extérieur (jardin, parc sécurisé). Soyez vigilants les premiers jours mais restez détendu pour ne pas communiquer vos inquiétudes. N'intervenez pas en cas de jeu. Respectez la hiérarchie déjà établie. Priorisez d'abord votre chien déjà présent, puis votre nouvel arrivé.

Avec les chats : Préparez des éléments en hauteur pour que votre chat puisse se réfugier. Commencez par des séances de rencontre courtes et sous surveillance. Récompensez votre chien lorsqu'il est calme en présence de votre chat.

6. L'ARRIVÉE DE VOTRE CHIEN - JOUR J

Votre chien sera physiquement et émotionnellement fatigué après le voyage. Il est possible qu'il bave, se salisse, fasse ses besoins dans sa caisse de transport et qu'il soit stressé. Après un rapide tour pour se dégourdir, direction chez vous ! Nourrissez votre chien en priorité et montrez-lui où faire ses besoins.

Il est fort probable que même en étant propre, votre chien ait quelques accidents à l'intérieur. Récompensez-le lorsqu'il fait ses besoins à l'endroit voulu. Montrez-lui sa gamelle d'eau et présentez-lui les différentes pièces.

7. PREMIERS JOURS D'ADAPTATION

Du repos s'impose ! Votre chien sera chamboulé les premiers jours. Conseils :
- Libérez du temps pour passer quelques jours avec votre chien.
- Limiter les rencontres avec les autres personnes en dehors de ses nouveaux adoptants.
- Limiter un trop-plein d'informations.
- Mettre en place une routine avec un temps pour les repas, les sorties, les jeux.
- Être clair et cohérent dans vos demandes et les règles du domicile.
- Rester bienveillant et compréhensif, récompensez les bons comportements.
- Évitez les lieux très fréquentés au début.

8. PREMIÈRES BALADES

Les premières balades doivent permettre d'explorer l'environnement proche. Laissez-lui sentir et interagir. En milieu urbain, rassurez votre chien face aux bruits. N'oubliez pas vos friandises !

Certains chiens ne veulent pas sortir au début. Ne forcez pas. Son envie d'exploration viendra rapidement.

Ne tentez pas une balade sans laisse sans avoir un rappel fonctionnel. Exercez-vous d'abord en intérieur, puis en extérieur sécurisé avec une longe.

9. PREMIÈRES SEMAINES - POURSUITE DE L'ADAPTATION

Règle des 3 : 3 jours de repos, 3 semaines de découverte, 3 mois d'intégration.

Vous pouvez lui montrer les règles du domicile, faire des balades plus longues, tester de nouvelles activités. Votre chien réagira mieux à un renforcement positif qu'à un ton dur.

Commencez à l'habituer progressivement à votre absence. Laissez-lui un jeu d'occupation (type Kong).

Prenez rendez-vous chez le vétérinaire (pas dans la première semaine sauf urgence). Vermifugez-le rapidement après son arrivée.

Vérifiez que vous avez bien reçu la carte IcAD avec le numéro de puce et le changement de propriétaire.

En cas de difficultés, parlez-en dans le groupe d'adoptants ou faites appel à un professionnel (éducateur, comportementaliste).

10. PARTENAIRES

- Assurance Agria "Deuxième Chance" : 15 jours d'assurance offerte pour l'arrivée. Contact: Clélie QUENOT - 06 58 55 90 73.
- E-concierge "Tout pour le Toutou" : garde de jour/nuit, promenade, éducation, toilettage. Contact: 06 16 65 26 01, concierge@toutpourletoutou.com.
- Happy Scoop : Compléments alimentaires & produits de soins naturels.
- Olykan : Éducation urbaine (région parisienne). www.olykan.fr
- Esprit Dog : Méthode d'éducation 100% en ligne, 250+ exercices. Code promo: AR704613 (47€ au lieu de 59€). www.espritdog.com
- Hector Kitchen : Kit de bienvenue pour 1€ avec le code DOGGYOASIS. www.hectorkitchen.com
`;

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de Doggy Oasis International, une association qui sauve des chiens en Guyane et les fait adopter en France métropolitaine. Tu réponds UNIQUEMENT en français.

Ta personnalité :
- Bienveillant, chaleureux et rassurant
- Adapté aux nouveaux adoptants qui peuvent être anxieux
- Tu utilises parfois des emojis 🐾 pour rendre la conversation agréable
- Tu te présentes comme l'assistant de Doggy Oasis International

Tes domaines d'expertise :
- Éducation canine (obéissance, socialisation, comportement)
- Nutrition et alimentation des chiens
- Soins et santé (hygiène, vaccins, parasites)
- Promenades et exercice
- Comportement canin (anxiété, aboiements, destruction)
- Accueil et intégration d'un chien adopté

BASE DE CONNAISSANCES PRIORITAIRE - LIVRET D'ACCUEIL :
${GUIDE_CONTENT}

Règles importantes :
- Réponds EN PRIORITÉ à partir de la base de connaissances ci-dessus. Ne mentionne JAMAIS le livret d'accueil, le guide d'accueil ou tout document interne. Présente les informations naturellement, comme venant de l'expérience de Doggy Oasis (ex: "D'après notre expérience...", "Notre expérience nous montre que...") ou sans introduction particulière.
- Si la question nécessite des informations complémentaires, complète avec tes connaissances générales en éducation canine.
- Si une question concerne un problème médical URGENT (blessure, empoisonnement, détresse respiratoire), redirige IMMÉDIATEMENT vers un vétérinaire : "⚠️ Cette situation nécessite une consultation vétérinaire urgente. Contactez votre vétérinaire ou les urgences vétérinaires immédiatement."
- Pour les questions médicales non urgentes, donne des conseils généraux mais recommande toujours de consulter un vétérinaire.
- Si la question ne concerne pas les chiens, réponds poliment que tu es spécialisé dans l'accompagnement des adoptants de chiens.
- Structure tes réponses avec des titres et listes quand c'est pertinent.
- Sois concis mais complet. Vise des réponses de 150-300 mots.
- RÈGLE STRICTE SUR LES PARTENAIRES : Ne mentionne JAMAIS les partenaires (Esprit Dog, Hector Kitchen, Happy Scoop, Olykan, Agria, Tout pour le Toutou, etc.), leurs codes promo ou leurs offres SAUF si l'utilisateur pose EXPLICITEMENT une question sur un partenaire, un code promo, ou demande une recommandation de produit/service spécifique. Une question générale sur l'alimentation, l'éducation ou les soins ne justifie PAS de mentionner un partenaire.
- RÈGLE STRICTE SUR LE STYLE : Ne commence JAMAIS une réponse par une phrase d'introduction vide comme "C'est une excellente question", "Très bonne question", "Merci pour cette question", "Super question" ou toute formule similaire. Va droit au but et commence directement par la réponse.`;

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
