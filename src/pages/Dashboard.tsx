import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { TrendingUp, MapPin, AlertTriangle, Shield, Users, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fraudTrends, scamReports } from "@/data/fraudData";

export function Dashboard() {
  // Process data for charts
  const provinceData = fraudTrends.reduce((acc, trend) => {
    const existing = acc.find(item => item.province === trend.province);
    if (existing) {
      existing.scamCount += trend.scamCount;
    } else {
      acc.push({
        province: trend.province,
        scamCount: trend.scamCount,
      });
    }
    return acc;
  }, [] as { province: string; scamCount: number }[])
  .sort((a, b) => b.scamCount - a.scamCount);

  console.log('provinceData', provinceData);

  const monthlyData = [
    { month: "Jan", scams: 3750, blocked: 3652 },
    { month: "Feb", scams: 4220, blocked: 4108 },
    { month: "Mar", scams: 3890, blocked: 3801 },
    { month: "Apr", scams: 4560, blocked: 4441 },
    { month: "May", scams: 5120, blocked: 4987 },
    { month: "Jun", scams: 4780, blocked: 4653 },
  ];

  const categoryData = [
    { name: "Banking Fraud", value: 45, color: "#ef4444" },
    { name: "E-commerce", value: 25, color: "#f97316" },
    { name: "Phishing", value: 15, color: "#eab308" },
    { name: "Cryptocurrency", value: 10, color: "#8b5cf6" },
    { name: "Other", value: 5, color: "#6b7280" },
  ];

  const hotspots = [
    { province: "Gauteng", risk: "high", reports: 1420 },
    { province: "Western Cape", risk: "medium", reports: 950 },
    { province: "KwaZulu-Natal", risk: "medium", reports: 720 },
    { province: "Eastern Cape", risk: "low", reports: 380 },
    { province: "Limpopo", risk: "low", reports: 200 },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 glow-security">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Fraud Trends Dashboard</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time insights into fraud patterns across South Africa. 
            Essential intelligence for banks, law enforcement, and policy makers.
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm shadow-security dark:bg-card/70 dark:text-card-foreground">
            <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-primary mb-1">98.3%</div>
            <div className="text-sm text-muted-foreground">Detection Rate</div>
          </Card>
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm shadow-security dark:bg-card/70 dark:text-card-foreground">
            <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-3" />
            <div className="text-2xl font-bold text-destructive mb-1">
              {scamReports.reduce((sum, report) => sum + report.reportCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Reports</div>
          </Card>
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm shadow-security dark:bg-card/70 dark:text-card-foreground">
            <Users className="h-8 w-8 text-success mx-auto mb-3" />
            <div className="text-2xl font-bold text-success mb-1">27,642</div>
            <div className="text-sm text-muted-foreground">Protected Users</div>
          </Card>
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm shadow-security dark:bg-card/70 dark:text-card-foreground">
            <Calendar className="h-8 w-8 text-warning mx-auto mb-3" />
            <div className="text-2xl font-bold text-warning mb-1">5,120</div>
            <div className="text-sm text-muted-foreground">This Month</div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Monthly Trends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-sm dark:bg-card/70 dark:text-card-foreground">
                <h3 className="text-lg font-semibold mb-6">Monthly Fraud Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--popover))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="scams" 
                      stroke="hsl(var(--destructive))" 
                      strokeWidth={3}
                      name="Scam Attempts"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="blocked" 
                      stroke="hsl(var(--success))" 
                      strokeWidth={3}
                      name="Blocked"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Provincial Data */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-sm dark:bg-card/70 dark:text-card-foreground border-2 border-blue-500">
                <h3 className="text-lg font-semibold mb-6">Scams by Province</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={provinceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="province" type="category" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'currentColor' }} />
                    <YAxis type="number" stroke="hsl(var(--muted-foreground))" tick={{ fill: 'currentColor' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--popover))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                    <Bar 
                      dataKey="scamCount" 
                      fill="#3b82f6"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Scam Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-sm dark:bg-card/70 dark:text-card-foreground">
                <h3 className="text-lg font-semibold mb-6">Scam Categories</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {categoryData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Risk Hotspots */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-sm dark:bg-card/70 dark:text-card-foreground">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Risk Hotspots
                </h3>
                <div className="space-y-4">
                  {hotspots.map((hotspot, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{hotspot.province}</div>
                        <div className="text-sm text-muted-foreground">
                          {hotspot.reports} reports
                        </div>
                      </div>
                      <Badge variant={getRiskBadge(hotspot.risk)} className={getRiskColor(hotspot.risk)}>
                        {hotspot.risk.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-sm dark:bg-card/70 dark:text-card-foreground">
                <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">New phishing domain blocked</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">15 new scam reports</p>
                      <p className="text-xs text-muted-foreground">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">1,247 links verified safe</p>
                      <p className="text-xs text-muted-foreground">10 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Community alert issued</p>
                      <p className="text-xs text-muted-foreground">15 minutes ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Export Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12"
        >
          <Card className="p-8 gradient-security text-center dark:bg-card/70 dark:text-card-foreground">
            <h3 className="text-2xl font-bold text-white mb-4">
              Data Export & API Access
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Banking institutions, law enforcement, and government agencies can access 
              detailed fraud intelligence through our secure API endpoints.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-smooth">
                Request API Access
              </button>
              <button className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-primary transition-smooth">
                Download Report
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}