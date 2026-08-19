import { FormEvent, useState } from "react";
import { Loader2, LockKeyhole } from "lucide-react";
import logo from "@/assets/doggy-oasis-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth";

interface LoginScreenProps {
  onAuthenticated: (email: string) => void;
}

const LoginScreen = ({ onAuthenticated }: LoginScreenProps) => {
  const [email, setEmail] = useState("y.nalovic@yeti-factory.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password) return;
    setError("");
    setIsLoading(true);
    try {
      const session = await login(email, password);
      onAuthenticated(session.email || email.trim().toLowerCase());
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Connexion impossible.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-10 bg-background">
      <section className="w-full max-w-sm rounded-3xl border border-border bg-card p-7 shadow-sm">
        <img src={logo} alt="Doggy Help" className="w-40 h-auto mx-auto mb-6" />
        <div className="flex items-center justify-center gap-2 mb-2">
          <LockKeyhole className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold">Accès administrateur</h1>
        </div>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Cette application est privée et réservée au superadministrateur.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Adresse email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Se connecter
          </Button>
        </form>
      </section>
    </main>
  );
};

export default LoginScreen;
