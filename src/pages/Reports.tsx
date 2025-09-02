import { useState } from "react";
import { motion } from "framer-motion";
import { Flag, Shield, AlertTriangle, Upload, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export function Reports() {
  const [formData, setFormData] = useState({
    url: "",
    phoneNumber: "",
    category: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const categories = [
    { value: "banking", label: "Banking Fraud" },
    { value: "ecommerce", label: "E-commerce Scam" },
    { value: "phishing", label: "Phishing" },
    { value: "cryptocurrency", label: "Cryptocurrency Scam" },
    { value: "government", label: "Government Impersonation" },
    { value: "social", label: "Social Media Scam" },
    { value: "romance", label: "Romance Scam" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description.trim()) {
      toast({
        title: "Description required",
        description: "Please provide a description of the scam",
        variant: "destructive",
      });
      return;
    }

    if (!formData.url.trim() && !formData.phoneNumber.trim()) {
      toast({
        title: "URL or phone number required",
        description: "Please provide either a suspicious URL or phone number",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      toast({
        title: "Report submitted successfully",
        description: "Thank you for helping protect the community!",
      });
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="gradient-success w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 pulse-success">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-6">Report Submitted Successfully!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for helping protect the South African community from fraud. 
              Your report has been securely submitted and will help us identify and block 
              similar scams in the future.
            </p>
            
            <Card className="p-8 mb-8 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Anonymous & Secure</p>
                    <p className="text-sm text-muted-foreground">
                      Your report is completely anonymous and stored securely
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium">Community Alert</p>
                    <p className="text-sm text-muted-foreground">
                      If verified, this will be added to our community alerts
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Flag className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <p className="font-medium">Automatic Blocking</p>
                    <p className="text-sm text-muted-foreground">
                      The URL/number will be flagged for future users
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ url: "", phoneNumber: "", category: "", description: "" });
                }}
                variant="outline"
              >
                Submit Another Report
              </Button>
              <Button asChild>
                <a href="/alerts">View Community Alerts</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="gradient-danger w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Flag className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Report a Scam</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help protect the South African community by reporting suspicious links, 
            phone numbers, and fraudulent activities. All reports are anonymous and secure.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Report Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="p-8 bg-card/50 backdrop-blur-sm shadow-security">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Suspicious URL (Optional)
                    </label>
                    <Input
                      value={formData.url}
                      onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="https://suspicious-website.com"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number (Optional)
                    </label>
                    <Input
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      placeholder="+27 11 123 4567"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Scam Category
                  </label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description *
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the scam attempt, what happened, and any other relevant details..."
                    rows={6}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center p-4 bg-muted/50 rounded-lg">
                  <Shield className="h-5 w-5 text-primary mr-3" />
                  <div className="text-sm">
                    <p className="font-medium">Anonymous & Secure</p>
                    <p className="text-muted-foreground">
                      Your report is completely anonymous and helps protect the community.
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gradient-danger shadow-danger"
                  size="lg"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <Flag className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <Flag className="h-5 w-5 mr-2" />
                  )}
                  {isSubmitting ? "Submitting Report..." : "Submit Report"}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="p-6 bg-card/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Recent Community Activity</h3>
              <div className="space-y-3">
                {[
                  { count: 45, type: "Banking fraud reports" },
                  { count: 23, type: "Phishing attempts" },
                  { count: 18, type: "E-commerce scams" },
                  { count: 12, type: "Government impersonation" },
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{stat.type}</span>
                    <Badge variant="secondary">{stat.count}</Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-card/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Why Report?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="h-4 w-4 text-primary mt-1" />
                  <div>
                    <p className="text-sm font-medium">Protect Others</p>
                    <p className="text-xs text-muted-foreground">
                      Prevent others from falling victim
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-warning mt-1" />
                  <div>
                    <p className="text-sm font-medium">Build Intelligence</p>
                    <p className="text-xs text-muted-foreground">
                      Help us identify patterns
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Flag className="h-4 w-4 text-destructive mt-1" />
                  <div>
                    <p className="text-sm font-medium">Stop Criminals</p>
                    <p className="text-xs text-muted-foreground">
                      Aid law enforcement efforts
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}