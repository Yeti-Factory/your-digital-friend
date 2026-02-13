import { MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/doggy-oasis-logo.png";

const suggestions = [
  "Comment apprendre les bases à mon chien ?",
  "Mon chien est stressé en ville, que faire ?",
  "Comment gérer l'anxiété de séparation ?",
  "Quels sont les premiers achats à prévoir ?",
  "Comment promener mon chien en laisse ?",
  "Mon chien a peur, que faire les premiers jours ?",
  "Comment présenter mon chien à mon chat ?",
  "Quelle est la règle des 3 jours, 3 semaines, 3 mois ?",
  "Comment faire la transition alimentaire ?",
  "Mon chien n'est pas propre, que faire ?",
  "Quand prendre rendez-vous chez le vétérinaire ?",
  "Quels partenaires peuvent m'aider ?",
];

interface WelcomeScreenProps {
  onStart: () => void;
  onSuggestion: (q: string) => void;
}

const WelcomeScreen = ({ onStart, onSuggestion }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10">
      <img src={logo} alt="Doggy Oasis International" className="w-48 h-auto mb-6" />

      <p className="text-muted-foreground text-center max-w-md mb-8 text-base leading-relaxed">
        Merci d'avoir offert une nouvelle vie à l'un de nos protégés ! 🐾 Cette application est votre compagnon au quotidien : posez vos questions sur l'éducation, les soins, l'alimentation ou le comportement de votre chien, et recevez des conseils adaptés basés sur notre expérience.
      </p>

      <Button onClick={onStart} size="lg" className="rounded-full gap-2 px-8 mb-10 text-base font-semibold">
        <MessageCircle className="w-5 h-5" />
        Démarrer une conversation
      </Button>

      <div className="w-full max-w-md">
        <p className="text-sm font-semibold text-muted-foreground mb-3 text-center">Questions fréquentes</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {suggestions.map((q) => (
            <button
              key={q}
              onClick={() => onSuggestion(q)}
              className="text-left text-sm px-4 py-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:bg-secondary/50 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-10 flex items-center gap-1 text-xs text-muted-foreground">
        <Heart className="w-3 h-3" /> Doggy Oasis International
      </div>
    </div>
  );
};

export default WelcomeScreen;
