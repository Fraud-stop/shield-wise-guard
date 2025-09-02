import { motion, useAnimation } from "framer-motion";
import { Shield, Search, Users, TrendingUp, ArrowRight, AlertTriangle, CheckCircle, Globe, Lock, Zap, Eye, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { CodeRain } from "@/components/CodeRain";

// Floating particle component
const FloatingParticle = ({ delay = 0, duration = 4, x = 0, y = 0, icon: Icon }: any) => (
  <motion.div
    className="absolute opacity-20"
    initial={{ x: x, y: y, opacity: 0 }}
    animate={{ 
      x: x + Math.random() * 100 - 50,
      y: y + Math.random() * 100 - 50,
      opacity: [0, 0.3, 0],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }}
  >
    <Icon className="h-6 w-6 text-primary" />
  </motion.div>
);
export function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [showTypewriter, setShowTypewriter] = useState(true);
  const [typeDone, setTypeDone] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setShowTypewriter(true);
      setTypeDone(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stats = [
    { label: "Threats Blocked", value: "12,847", icon: Shield, color: "text-red-400" },
    { label: "Links Analyzed", value: "89,234", icon: Search, color: "text-blue-400" },
    { label: "Community Reports", value: "3,567", icon: Users, color: "text-green-400" },
    { label: "AI Accuracy", value: "99.7%", icon: TrendingUp, color: "text-purple-400" },
  ];

  const features = [
    {
      title: "AI-Powered Link Analysis",
      description: "Military-grade threat detection using advanced machine learning",
      icon: Search,
      href: "/checker",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Real-time Threat Intelligence",
      description: "Live community-driven alerts with geo-location mapping",
      icon: AlertTriangle,
      href: "/alerts",
      gradient: "from-red-500 to-pink-500",
    },
    {
      title: "Zero-Knowledge Reporting",
      description: "Anonymous blockchain-secured fraud reporting system",
      icon: Lock,
      href: "/reports",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Neural Fraud Education",
      description: "Adaptive learning paths powered by behavioral analytics",
      icon: Code2,
      href: "/education",
      gradient: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
    {/* Prevent horizontal overflow for all children */}
    <style>{`html, body { overflow-x: hidden !important; }`}</style>
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      {/* Matrix Code Rain */}
      <CodeRain height={300} />
      {/* Floating Particles */}
      <FloatingParticle delay={0} x={100} y={200} icon={Shield} />
      <FloatingParticle delay={1} x={300} y={150} icon={Lock} />
      <FloatingParticle delay={2} x={500} y={300} icon={Eye} />
      <FloatingParticle delay={3} x={700} y={100} icon={Zap} />
      <FloatingParticle delay={4} x={200} y={400} icon={Code2} />

      {/* Mouse Follow Glow */}
      <motion.div
        className="fixed pointer-events-none z-0"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", damping: 30 }}
      >
        <div className="w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden z-10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge className="mb-6 gradient-security text-white border-0 px-6 py-2 text-sm backdrop-blur-sm" variant="secondary">
                  <Globe className="w-4 h-4 mr-2 animate-pulse" />
              </Badge>
            </motion.div>
            
            <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-primary mb-4 min-h-[3.5rem] md:min-h-[5rem] flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                <motion.span>
                  {isMobile ? (
                    showTypewriter && !typeDone ? (
                      <Typewriter
                        words={["FRAUD STOP - Next-Gen Cyber Shield"]}
                        loop={1}
                        cursor
                        cursorStyle="_"
                        typeSpeed={60}
                        deleteSpeed={40}
                        delaySpeed={1200}
                        onLoopDone={() => {
                          setTypeDone(true);
                          setShowTypewriter(false);
                        }}
                      />
                    ) : (
                      "FRAUD STOP - Next-Gen Cyber Shield"
                    )
                  ) : (
                    <Typewriter
                      words={["FRAUD STOP", "Next-Gen Cyber Shield"]}
                      loop={Infinity}
                      cursor
                      cursorStyle="_"
                      typeSpeed={60}
                      deleteSpeed={40}
                      delaySpeed={1200}
                    />
                  )}
                </motion.span>
            </motion.h1>
            
            {/* Removed broken <motion.p> block */}

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="gradient-primary shadow-security glow-security text-white border-0 px-8 py-4 text-lg font-semibold relative overflow-hidden group"
                  asChild
                >
                  <Link to="/checker">
                    <Search className="mr-3 h-6 w-6" />
                    Analyze Threat Vector
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Live Stats Ticker */}
              <motion.div
                className="mt-12 flex justify-center items-center space-x-8 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                  SYSTEM ONLINE
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2" />
                  AI ACTIVE
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-2" />
                  THREAT LEVEL: MINIMAL
                </div>
              </motion.div>
          </motion.div>
        </div>

        {/* Advanced Floating Elements */}
        <div className="absolute top-20 left-10">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            <div className="relative">
              <Shield className="h-16 w-16 text-primary/30" />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/20"
                animate={{ rotate: -360, scale: [1, 1.5, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-20 right-10">
          <motion.div
            animate={{ 
              rotate: -360,
              y: [0, -20, 0],
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              y: { duration: 3, repeat: Infinity }
            }}
          >
            <div className="relative">
              <Eye className="h-12 w-12 text-accent/30" />
              <motion.div
                className="absolute -inset-2 rounded-full bg-accent/10"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advanced Stats Section */}
      <section
        className="py-20 px-4 relative border-y border-border/30 bg-white dark:bg-[rgba(255,255,255,0.05)] night:bg-[rgba(255,255,255,0.05)]"
      >
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                REAL-TIME THREAT METRICS
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <Card
                  className="p-6 text-center border-border/50 hover:shadow-security transition-all duration-500 hover:border-primary/30 group relative overflow-hidden bg-white dark:bg-card/30 night:bg-card/30"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <motion.div
                    className={`h-12 w-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r ${
                      index === 0 ? 'from-red-500/20 to-red-600/20' :
                      index === 1 ? 'from-blue-500/20 to-blue-600/20' :
                      index === 2 ? 'from-green-500/20 to-green-600/20' :
                      'from-purple-500/20 to-purple-600/20'
                    }`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </motion.div>
                  <motion.div 
                    className="text-3xl font-bold text-foreground mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="gradient-primary bg-clip-text text-transparent">
                  NEURAL DEFENSE MATRIX
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Enterprise-grade cybersecurity infrastructure meets community intelligence.
              <br />Powered by quantum-resistant algorithms and blockchain verification.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  rotateX: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="p-8 h-full bg-card/20 backdrop-blur-md border-border/30 hover:shadow-security transition-all duration-500 group cursor-pointer relative overflow-hidden hover:border-primary/50">
                  <Link to={feature.href} className="block h-full relative z-10">
                    {/* Animated Background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />
                    
                    {/* Icon Container */}
                    <motion.div 
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 relative`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                      <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-white/30"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <motion.div 
                      className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm">Initialize System</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:rotate-45 transition-transform duration-300" />
                    </motion.div>
                    
                    {/* Scanning Effect */}
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    />
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced CTA Section */}
      <section className="py-24 px-4 relative gradient-security overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-white mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              INITIALIZE NEURAL NETWORK
            </motion.h2>
            
            <motion.p 
              className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Every threat detection strengthens our collective defense matrix.
              <br />
              <span className="text-cyan-200 font-semibold">
                Together, we create an impenetrable digital fortress.
              </span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-bold relative overflow-hidden group"
                  asChild
                >
                  <Link to="/reports">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <Lock className="mr-3 h-6 w-6" />
                    Report Threat Vector
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white/50 text-white hover:bg-white/10 hover:border-white px-8 py-4 text-lg font-bold backdrop-blur-sm relative group"
                  asChild
                >
                  <Link to="/dashboard">
                    <motion.div
                      className="absolute inset-0 bg-white/5"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <TrendingUp className="mr-3 h-6 w-6" />
                    Neural Analytics
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Live System Status */}
            <motion.div
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3" />
                  <span className="text-white font-semibold">DEFENSE STATUS</span>
                </div>
                <div className="text-green-300 text-2xl font-bold">OPTIMAL</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse mr-3" />
                  <span className="text-white font-semibold">AI PROCESSING</span>
                </div>
                <div className="text-blue-300 text-2xl font-bold">
                    24/7 ACTIVE
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse mr-3" />
                  <span className="text-white font-semibold">THREAT LEVEL</span>
                </div>
                <div className="text-purple-300 text-2xl font-bold">MINIMAL</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}