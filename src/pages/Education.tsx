import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Trophy, ChevronRight, CheckCircle, X, Shield, Link, Lock, AlertTriangle, Flag, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { safetyTips, quizQuestions, QuizQuestion } from "@/data/fraudData";
import { useToast } from "@/hooks/use-toast";

const iconMap = {
  link: Link,
  shield: Shield,
  lock: Lock,
  "alert-triangle": AlertTriangle,
  flag: Flag,
  phone: Phone,
};

export function Education() {
  const [currentQuiz, setCurrentQuiz] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleQuizAnswer = (answerIndex: number) => {
    if (currentQuiz === null) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const question = quizQuestions[currentQuiz];
    const isCorrect = answerIndex === question.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setCompletedQuizzes(prev => new Set([...prev, question.id]));
      toast({
        title: "Correct! 🎉",
        description: "You're getting better at spotting scams!",
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Don't worry, learning takes practice!",
        variant: "destructive",
      });
    }
  };

  const nextQuiz = () => {
    if (currentQuiz !== null && currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCurrentQuiz(null);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const startQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const currentQuestion = currentQuiz !== null ? quizQuestions[currentQuiz] : null;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="gradient-security w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 glow-security">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Fraud Education Center</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the art of digital security through interactive learning, 
            practical tips, and gamified quizzes. Knowledge is your strongest shield.
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm">
            <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-primary mb-1">{safetyTips.length}</div>
            <div className="text-sm text-muted-foreground">Safety Tips Available</div>
          </Card>
          
          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm">
            <Trophy className="h-8 w-8 text-warning mx-auto mb-3" />
            <div className="text-2xl font-bold text-warning mb-1">{completedQuizzes.size}</div>
            <div className="text-sm text-muted-foreground">Quizzes Completed</div>
          </Card>

          <Card className="p-6 text-center bg-card/50 backdrop-blur-sm">
            <Shield className="h-8 w-8 text-success mx-auto mb-3" />
            <div className="text-2xl font-bold text-success mb-1">
              {Math.round((completedQuizzes.size / quizQuestions.length) * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">Security Knowledge</div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Safety Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <h2 className="text-2xl font-bold mb-6">Essential Safety Tips</h2>
            
            <div className="grid gap-6">
              {safetyTips.map((tip, index) => {
                const Icon = iconMap[tip.icon as keyof typeof iconMap] || Shield;
                return (
                  <motion.div
                    key={tip.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 bg-card/30 backdrop-blur-sm hover:shadow-security transition-smooth">
                      <div className="flex items-start gap-4">
                        <div className="gradient-security p-3 rounded-lg">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{tip.title}</h3>
                            <Badge variant="outline">{tip.category}</Badge>
                          </div>
                          <p className="text-muted-foreground">{tip.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Quiz Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">Security Quiz</h2>
            
            {currentQuiz === null ? (
              <Card className="p-6 bg-card/50 backdrop-blur-sm">
                <div className="text-center">
                  <Trophy className="h-12 w-12 text-warning mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Test Your Knowledge</h3>
                  <p className="text-muted-foreground mb-6">
                    Take our interactive quiz to test your fraud detection skills
                  </p>
                  
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{completedQuizzes.size}/{quizQuestions.length}</span>
                    </div>
                    <Progress 
                      value={(completedQuizzes.size / quizQuestions.length) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <Button 
                    onClick={startQuiz} 
                    className="w-full gradient-primary shadow-security"
                  >
                    Start Quiz
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-6 bg-card/50 backdrop-blur-sm">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Question {currentQuiz + 1} of {quizQuestions.length}</span>
                    <span>Score: {score}</span>
                  </div>
                  <Progress 
                    value={((currentQuiz + 1) / quizQuestions.length) * 100} 
                    className="h-2"
                  />
                </div>

                {currentQuestion && (
                  <div>
                    <h3 className="text-lg font-semibold mb-6">
                      {currentQuestion.question}
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                      {currentQuestion.options.map((option, index) => (
                        <Button
                          key={index}
                          variant={
                            showResult
                              ? index === currentQuestion.correctAnswer
                                ? "default"
                                : index === selectedAnswer && index !== currentQuestion.correctAnswer
                                  ? "destructive"
                                  : "outline"
                              : selectedAnswer === index
                                ? "default"
                                : "outline"
                          }
                          className={`w-full text-left justify-start ${
                            showResult && index === currentQuestion.correctAnswer
                              ? "gradient-success"
                              : ""
                          }`}
                          onClick={() => !showResult && handleQuizAnswer(index)}
                          disabled={showResult}
                        >
                          <div className="flex items-center gap-2">
                            {showResult && index === currentQuestion.correctAnswer && (
                              <CheckCircle className="h-4 w-4" />
                            )}
                            {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                              <X className="h-4 w-4" />
                            )}
                            <span>{option}</span>
                          </div>
                        </Button>
                      ))}
                    </div>

                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="p-4 bg-muted/50 rounded-lg mb-4">
                          <p className="text-sm">{currentQuestion.explanation}</p>
                        </div>
                        
                        <Button 
                          onClick={nextQuiz} 
                          className="w-full"
                        >
                          {currentQuiz < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    )}
                  </div>
                )}
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="p-6 bg-card/30 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tips Learned</span>
                  <Badge variant="secondary">{safetyTips.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Quiz Score</span>
                  <Badge variant="outline">{score}/{quizQuestions.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Security Level</span>
                  <Badge className="gradient-primary text-white border-0">
                    {completedQuizzes.size === quizQuestions.length ? "Expert" : 
                     completedQuizzes.size >= quizQuestions.length / 2 ? "Advanced" : "Beginner"}
                  </Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="p-8 gradient-security">
            <h3 className="text-2xl font-bold text-white mb-4">
              Put Your Knowledge to the Test
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Ready to apply what you've learned? Try our link checker or help the community 
              by reporting suspicious activities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" asChild>
                <a href="/checker">Test Link Checker</a>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <a href="/reports">Report Suspicious Activity</a>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}