import { motion } from "framer-motion";
import { Shield, Search, Users, TrendingUp, ArrowRight, AlertTriangle, CheckCircle, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Home() {
  const stats = [
    { label: "Scams Blocked", value: "12,847", icon: Shield },
    { label: "Links Checked", value: "89,234", icon: Search },
    { label: "Community Reports", value: "3,567", icon: Users },
    { label: "Safety Score", value: "98.3%", icon: TrendingUp },
  ];

  const features = [
    {
      title: "Real-time Link Checking",
      description: "Instantly verify suspicious URLs and phone numbers",
      icon: Search,
      href: "/checker",
    },
    {
      title: "Community Alerts",
      description: "Stay informed about latest scams in your area",
      icon: AlertTriangle,
      href: "/alerts",
    },
    {
      title: "Anonymous Reporting",
      description: "Help protect others by reporting suspicious activities",
      icon: Users,
      href: "/reports",
    },
    {
      title: "Fraud Education",
      description: "Learn to identify and avoid online scams",
      icon: CheckCircle,
      href: "/education",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 gradient-security text-white border-0" variant="secondary">
              <Globe className="w-4 h-4 mr-2" />
              Protecting South Africa from Online Fraud
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-primary bg-clip-text text-transparent">
                Fraud Stop
              </span>
              <br />
              <span className="text-foreground">
                Your Shield Against 
              </span>
              <br />
              <span className="text-foreground">
                Online Scams
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Empower yourself with real-time fraud detection, community-driven alerts, 
              and comprehensive education to stay safe in the digital world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gradient-primary shadow-security glow-security text-white border-0 hover:scale-105 transition-smooth"
                asChild
              >
                <Link to="/checker">
                  <Search className="mr-2 h-5 w-5" />
                  Check Suspicious Link
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link to="/education">
                  Learn Safety Tips
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Shield className="h-16 w-16 text-primary" />
          </motion.div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <Search className="h-12 w-12 text-accent" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-security transition-smooth">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Fraud Protection Suite
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to stay safe online, powered by community intelligence
              and advanced detection algorithms.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-security transition-smooth group cursor-pointer">
                  <Link to={feature.href} className="block h-full">
                    <div className="gradient-security w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-primary group-hover:translate-x-1 transition-smooth">
                      <span className="text-sm font-medium">Get Started</span>
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-security">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join the Fight Against Fraud
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Every report makes our community stronger. Together, we can build
              an impenetrable shield against online scams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link to="/reports">
                  Report a Scam
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link to="/dashboard">
                  View Trends
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}