import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, Shield, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your Fraud Stop assistant. I'm here to help you stay safe online. I can help you with:",
      isBot: true,
      timestamp: new Date(),
      suggestions: [
        "Check a suspicious link",
        "Report a scam",
        "Get safety tips",
        "Learn about current alerts"
      ]
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        isBot: true,
        timestamp: new Date(),
        suggestions: botResponse.suggestions,
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
    handleSend();
  };

  const getBotResponse = (userInput: string): { text: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase();
    
    if (input.includes("check") || input.includes("link") || input.includes("url")) {
      return {
        text: "I can help you check suspicious links! To check a link, please paste it here and I'll analyze it for potential scams, phishing attempts, and other security threats. You can also use our dedicated Link Checker tool for a more detailed analysis.",
        suggestions: [
          "https://suspicious-site.com",
          "Go to Link Checker",
          "What makes a link suspicious?",
          "Show me safety tips"
        ]
      };
    }
    
    if (input.includes("report") || input.includes("scam")) {
      return {
        text: "Reporting scams helps protect our entire community! You can report suspicious links, phone numbers, or describe fraudulent activities. All reports are completely anonymous and secure. Would you like me to guide you through the reporting process?",
        suggestions: [
          "Start a new report",
          "What information do you need?",
          "Is my report anonymous?",
          "View recent community alerts"
        ]
      };
    }
    
    if (input.includes("safe") || input.includes("tips") || input.includes("help")) {
      return {
        text: "Here are some essential safety tips:\n\n🔒 Always check URLs carefully for spelling errors\n🏦 Banks NEVER ask for PINs via email or SMS\n🔐 Look for HTTPS (lock icon) on websites\n⚠️ If it seems too good to be true, it probably is\n📢 Report suspicious activities to help others",
        suggestions: [
          "Tell me about phishing",
          "How to spot fake websites",
          "Banking security tips",
          "Take the security quiz"
        ]
      };
    }
    
    if (input.includes("bank") || input.includes("nedbank") || input.includes("absa") || input.includes("fnb") || input.includes("standard")) {
      return {
        text: "⚠️ IMPORTANT: South African banks will NEVER:\n\n• Ask for your PIN, password, or OTP via email, SMS, or phone\n• Request banking details through unsecured channels\n• Ask you to click links in emails to 'verify' your account\n\nIf you receive such requests, it's a scam! Always contact your bank directly using the official number on your card or bank statement.",
        suggestions: [
          "Check bank website legitimacy",
          "Report banking scam",
          "What are official bank domains?",
          "Learn about phishing emails"
        ]
      };
    }
    
    if (input.includes("alert") || input.includes("warning") || input.includes("community")) {
      return {
        text: "Our community has reported several active scams:\n\n🚨 Fake Shein websites asking for banking details\n🚨 Nedbank phishing emails with suspicious links\n🚨 SARS impersonation phone calls\n🚨 Crypto giveaway scams on social media\n\nStay vigilant and check our Alerts page for the latest updates!",
        suggestions: [
          "View all community alerts",
          "How to verify if alert is real?",
          "Report similar scam",
          "Subscribe to alerts"
        ]
      };
    }
    
    if (input.includes("phishing") || input.includes("fake") || input.includes("fraud")) {
      return {
        text: "Phishing is when criminals create fake websites or messages to steal your personal information. Here's how to spot them:\n\n🔍 Check the URL carefully (look for misspellings)\n📧 Be suspicious of urgent or threatening messages\n🔒 Verify HTTPS and security certificates\n📞 When in doubt, contact the organization directly\n\nNever enter personal details on suspicious sites!",
        suggestions: [
          "Check a suspicious website",
          "Learn about social engineering",
          "Banking phishing examples",
          "Report phishing attempt"
        ]
      };
    }
    
    return {
      text: "I'm here to help you stay safe online! I can assist you with:\n\n🔍 Checking suspicious links and websites\n📢 Reporting scams and fraudulent activities\n🎓 Learning about online safety and security\n⚠️ Understanding current fraud alerts and trends\n\nWhat would you like to know more about?",
      suggestions: [
        "Check a suspicious link",
        "Report a scam",
        "Get safety tips",
        "View community alerts"
      ]
    };
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 glow-security">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Fraud Stop Assistant</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get instant help with fraud detection, safety tips, and scam reporting. 
            Your personal security advisor is always here to help.
          </p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-[600px] flex flex-col bg-card/50 backdrop-blur-sm shadow-security">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b gradient-security">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Fraud Stop Assistant</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-white/80">Online</span>
                  </div>
                </div>
              </div>
              <Badge className="bg-white/20 text-white border-0">AI Powered</Badge>
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
                  <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                    message.isBot ? "flex-row" : "flex-row-reverse space-x-reverse"
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isBot 
                        ? "gradient-primary" 
                        : "bg-muted"
                    }`}>
                      {message.isBot ? (
                        <Bot className="h-4 w-4 text-white" />
                      ) : (
                        <User className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className={`px-4 py-2 rounded-lg ${
                      message.isBot
                        ? "bg-muted text-muted-foreground"
                        : "gradient-primary text-white"
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-muted px-4 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Suggestions */}
              {messages.length > 0 && messages[messages.length - 1].suggestions && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestion(suggestion)}
                      className="text-xs"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me about fraud protection, checking links, or reporting scams..."
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="gradient-primary"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { title: "Check Link", desc: "Verify suspicious URLs", href: "/checker" },
            { title: "Report Scam", desc: "Help protect others", href: "/reports" },
            { title: "View Alerts", desc: "Latest community warnings", href: "/alerts" },
            { title: "Learn Safety", desc: "Education and tips", href: "/education" },
          ].map((action, index) => (
            <Card key={index} className="p-4 bg-card/30 backdrop-blur-sm hover:shadow-security transition-smooth cursor-pointer">
              <a href={action.href} className="block">
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.desc}</p>
              </a>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
}