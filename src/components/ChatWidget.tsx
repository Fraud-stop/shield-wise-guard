import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your Fraud Stop assistant. I can help you check suspicious links, report scams, or provide safety tips. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("check") || input.includes("link") || input.includes("url")) {
      return "I can help you check suspicious links! Please paste the URL and I'll analyze it for potential scams or phishing attempts.";
    }
    if (input.includes("report") || input.includes("scam")) {
      return "To report a scam, please provide the suspicious link or phone number, and I'll guide you through the reporting process.";
    }
    if (input.includes("safe") || input.includes("tips") || input.includes("help")) {
      return "Here are some quick safety tips: 1) Never click suspicious links, 2) Verify bank communications directly, 3) Check for HTTPS and spelling errors, 4) Report suspicious activities.";
    }
    if (input.includes("bank") || input.includes("nedbank") || input.includes("absa") || input.includes("fnb")) {
      return "Remember: Banks will NEVER ask for your password, PIN, or OTP via email, SMS, or phone calls. Always verify by calling your bank directly.";
    }
    return "I can help you with checking suspicious links, reporting scams, getting safety tips, or learning about current fraud alerts. What would you like to know more about?";
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full gradient-primary shadow-security glow-security"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white" />
          )}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-80 h-96 z-50"
          >
            <Card className="h-full flex flex-col bg-card/95 backdrop-blur-sm border shadow-security">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b gradient-security">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-white" />
                  <span className="font-semibold text-white">Fraud Stop Assistant</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        message.isBot
                          ? "bg-muted text-muted-foreground"
                          : "gradient-primary text-white"
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSend}
                    size="sm"
                    className="gradient-primary"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}