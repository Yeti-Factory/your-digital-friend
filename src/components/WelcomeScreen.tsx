import { Dog, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const suggestions = [
  "Comment éduquer mon chien ?",
  "Que donner à manger à mon chiot ?",
  "Comment gérer l'anxiété de séparation ?",
  "Quels sont les bons gestes de soin ?",
  "Comment promener mon chien en laisse ?",
  "Mon chien aboie beaucoup, que faire ?",
];

interface WelcomeScreenProps {
  onStart: () => void;
  onSuggestion: (q: string) => void;
}

const WelcomeScreen = ({ onStart, onSuggestion }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Dog className="w-9 h-9 text-primary" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-2">Doggy Oasis</h1>
      <p className="text-muted-foreground text-center max-w-sm mb-8">
        Bienvenue ! Posez-moi vos questions sur votre compagnon 🐾
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
        <Heart className="w-3 h-3" /> Doggy Oasis
      </div>
    </div>
  );
};

export default WelcomeScreen;
