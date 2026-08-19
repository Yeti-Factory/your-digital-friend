import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import ChatScreen from "@/components/ChatScreen";

interface IndexProps {
  onLogout: () => void;
}

const Index = ({ onLogout }: IndexProps) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string | undefined>();

  const handleStart = () => {
    setInitialMessage(undefined);
    setChatOpen(true);
  };

  const handleSuggestion = (q: string) => {
    setInitialMessage(q);
    setChatOpen(true);
  };

  const handleBack = () => {
    setChatOpen(false);
    setInitialMessage(undefined);
  };

  if (chatOpen) {
    return <ChatScreen onBack={handleBack} onLogout={onLogout} initialMessage={initialMessage} />;
  }

  return <WelcomeScreen onStart={handleStart} onSuggestion={handleSuggestion} onLogout={onLogout} />;
};

export default Index;
