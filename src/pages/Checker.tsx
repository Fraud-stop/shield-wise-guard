import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Shield, AlertTriangle, CheckCircle, ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { checkLink } from "@/data/fraudData";
import { useToast } from "@/hooks/use-toast";

export function Checker() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ReturnType<typeof checkLink> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCheck = async () => {
    if (!url.trim()) {
      toast({
        title: "Please enter a URL",
        description: "Enter a suspicious link or phone number to check",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const checkResult = checkLink(url);
      setResult(checkResult);
      setIsLoading(false);
      
      toast({
        title: checkResult.safe ? "Check Complete" : "Threat Detected",
        description: checkResult.reason,
        variant: checkResult.safe ? "default" : "destructive",
      });
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "URL has been copied to your clipboard",
    });
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "safe": return "text-success";
      case "suspicious": return "text-warning";
      case "dangerous": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "safe": return CheckCircle;
      case "suspicious": return AlertTriangle;
      case "dangerous": return AlertTriangle;
      default: return Shield;
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="gradient-security w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 glow-security">
            <Search className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Link & Number Checker</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Paste any suspicious link or phone number below and we'll analyze it for potential 
            scams, phishing attempts, and other security threats.
          </p>
        </motion.div>

        {/* Checker Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8 mb-8 bg-card/50 backdrop-blur-sm shadow-security">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  URL or Phone Number
                </label>
                <div className="flex gap-4">
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://suspicious-website.com or +27 11 123 4567"
                    className="flex-1 text-lg py-6"
                    onKeyPress={(e) => e.key === "Enter" && handleCheck()}
                  />
                  <Button
                    onClick={handleCheck}
                    disabled={isLoading}
                    size="lg"
                    className="gradient-primary shadow-security"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Shield className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
                    {isLoading ? "Checking..." : "Check Now"}
                  </Button>
                </div>
              </div>

              {/* Quick Examples */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground">Try these examples:</span>
                {[
                  "shein-sa-deals.co.za",
                  "nedbank-secure-login.com",
                  "absa.co.za"
                ].map((example) => (
                  <Button
                    key={example}
                    variant="outline"
                    size="sm"
                    onClick={() => setUrl(`https://${example}`)}
                    className="text-xs"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className={`p-8 ${
              result.safe 
                ? "border-success/50 bg-success/5" 
                : result.riskLevel === "suspicious" 
                  ? "border-warning/50 bg-warning/5"
                  : "border-destructive/50 bg-destructive/5"
            }`}>
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-full ${
                  result.safe 
                    ? "bg-success/20" 
                    : result.riskLevel === "suspicious"
                      ? "bg-warning/20"
                      : "bg-destructive/20"
                } ${result.safe ? "pulse-success" : "pulse-danger"}`}>
                  {(() => {
                    const Icon = getRiskIcon(result.riskLevel);
                    return <Icon className={`h-8 w-8 ${getRiskColor(result.riskLevel)}`} />;
                  })()}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold">
                      {result.safe ? "Safe to Visit" : "Potential Threat Detected"}
                    </h3>
                    <Badge 
                      variant={result.safe ? "secondary" : "destructive"}
                      className={`${
                        result.safe 
                          ? "bg-success text-success-foreground" 
                          : result.riskLevel === "suspicious"
                            ? "bg-warning text-warning-foreground"
                            : "bg-destructive text-destructive-foreground"
                      }`}
                    >
                      {result.riskLevel.toUpperCase()}
                    </Badge>
                  </div>

                  <p className="text-lg mb-4 text-muted-foreground">
                    {result.reason}
                  </p>

                  <p className="mb-6">
                    {result.details}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      onClick={() => copyToClipboard(url)}
                      size="sm"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy URL
                    </Button>
                    
                    {result.safe && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Site
                        </a>
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a href="/reports">
                        Report This URL
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Safety Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Quick Safety Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Check the URL carefully",
                description: "Look for spelling mistakes, extra characters, or suspicious domains",
                icon: AlertTriangle,
              },
              {
                title: "Look for HTTPS",
                description: "Legitimate sites use HTTPS (lock icon) for secure connections",
                icon: Shield,
              },
              {
                title: "Verify with official sources",
                description: "When in doubt, contact the organization directly using official channels",
                icon: CheckCircle,
              },
              {
                title: "Trust your instincts",
                description: "If something feels wrong or too good to be true, it probably is",
                icon: Search,
              },
            ].map((tip, index) => (
              <Card key={tip.title} className="p-6 bg-card/30 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="gradient-security p-2 rounded-lg">
                    <tip.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}