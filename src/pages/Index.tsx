import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import ChatScreen from "@/components/ChatScreen";

const Index = () => {
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
    return <ChatScreen onBack={handleBack} initialMessage={initialMessage} />;
  }

  return <WelcomeScreen onStart={handleStart} onSuggestion={handleSuggestion} />;
};

export default Index;
