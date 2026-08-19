import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import { getSession, logout } from "./lib/auth";
import Index from "./pages/Index";
import Install from "./pages/Install";
import ResetPwa from "./pages/ResetPwa";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    getSession()
      .then((session) => setEmail(session.authenticated ? session.email || null : null))
      .catch(() => setEmail(null))
      .finally(() => setIsChecking(false));
  }, []);

  const handleLogout = async () => {
    await logout().catch(() => undefined);
    setEmail(null);
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" aria-label="Chargement" />
      </div>
    );
  }

  if (!email) return <LoginScreen onAuthenticated={setEmail} />;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index onLogout={handleLogout} />} />
            <Route path="/install" element={<Install />} />
            <Route path="/reset-pwa" element={<ResetPwa />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
