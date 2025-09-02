import { motion } from "framer-motion";
import { AlertTriangle, Calendar, MapPin, ExternalLink, Flag, TrendingUp, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { scamReports } from "@/data/fraudData";

export function Alerts() {
  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="gradient-danger w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 pulse-danger">
            <AlertTriangle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Community Alerts</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed about the latest scams and fraudulent activities reported 
            by the South African community. Knowledge is your best defense.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm">
            <Flag className="h-8 w-8 text-destructive mx-auto mb-3" />
            <div className="text-2xl font-bold text-destructive mb-1">
              {scamReports.reduce((sum, report) => sum + report.reportCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Reports</div>
          </Card>
          
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm">
            <TrendingUp className="h-8 w-8 text-warning mx-auto mb-3" />
            <div className="text-2xl font-bold text-warning mb-1">
              {scamReports.filter(r => r.riskLevel === "critical").length}
            </div>
            <div className="text-sm text-muted-foreground">Critical Threats</div>
          </Card>

          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm">
            <Users className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-primary mb-1">98.3%</div>
            <div className="text-sm text-muted-foreground">Detection Rate</div>
          </Card>
        </motion.div>

        {/* Active Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            Active Threats
          </h2>
          
          <div className="space-y-6">
            {scamReports
              .filter(report => report.riskLevel === "critical")
              .map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 border-destructive/50 bg-destructive/5 backdrop-blur-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant={getRiskBadgeVariant(report.riskLevel)}>
                            {report.riskLevel.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">{report.category}</Badge>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">
                          {report.url || report.phoneNumber}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4">
                          {report.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Flag className="h-4 w-4" />
                            <span>{report.reportCount} reports</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Last reported: {formatDate(report.lastReported)}</span>
                          </div>
                          {report.verified && (
                            <Badge variant="secondary" className="bg-success/20 text-success">
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {report.url && (
                          <Button variant="outline" size="sm" asChild>
                            <a href="/checker" className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4" />
                              Check URL
                            </a>
                          </Button>
                        )}
                        <Button variant="outline" size="sm" asChild>
                          <a href="/reports" className="flex items-center gap-2">
                            <Flag className="h-4 w-4" />
                            Report Similar
                          </a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* All Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6">All Community Reports</h2>
          
          <div className="grid gap-6">
            {scamReports
              .filter(report => report.riskLevel !== "critical")
              .map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-card/30 backdrop-blur-sm hover:shadow-security transition-smooth">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant={getRiskBadgeVariant(report.riskLevel)}>
                            {report.riskLevel.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">{report.category}</Badge>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">
                          {report.url || report.phoneNumber}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4">
                          {report.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Flag className="h-4 w-4" />
                            <span>{report.reportCount} reports</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>First reported: {formatDate(report.firstReported)}</span>
                          </div>
                          {report.verified && (
                            <Badge variant="secondary" className="bg-success/20 text-success">
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="p-8 gradient-security">
            <h3 className="text-2xl font-bold text-white mb-4">
              Help Strengthen Our Community Shield
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Every report makes our detection system smarter and protects more South Africans 
              from falling victim to fraud. Join the fight today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" asChild>
                <a href="/reports">Report a Scam</a>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <a href="/checker">Check a Link</a>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}