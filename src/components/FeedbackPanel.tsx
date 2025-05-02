import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

export interface RecitationFeedback {
  mistakes: {
    type: 'pronunciation' | 'tajweed' | 'omission' | 'addition';
    word: string;
    description: string;
    severity: 'minor' | 'major';
  }[];
  correctWords: string[];
  accuracy: number;
  suggestions: string[];
}

interface FeedbackPanelProps {
  feedback: RecitationFeedback | null;
  isLoading: boolean;
}

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ feedback, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="w-full h-80">
        <CardHeader className="pb-2">
          <CardTitle>Analyzing Recitation...</CardTitle>
          <CardDescription>Please wait while we process your recording</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-48">
          <div className="w-12 h-12 border-4 border-tarteel-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">This may take a few moments</p>
        </CardContent>
      </Card>
    );
  }

  if (!feedback) {
    return (
      <Card className="w-full h-80">
        <CardHeader className="pb-2">
          <CardTitle>Recitation Feedback</CardTitle>
          <CardDescription>Record your recitation to see feedback</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-48">
          <Info className="h-16 w-16 text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">Recite a verse to get analysis and feedback</p>
        </CardContent>
      </Card>
    );
  }

  // Calculate color for accuracy indicator
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return "bg-green-600";
    if (accuracy >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Recitation Feedback</CardTitle>
          <Badge 
            variant={feedback.accuracy > 80 ? "default" : feedback.accuracy > 50 ? "secondary" : "destructive"}
            className={feedback.accuracy > 80 ? "bg-green-600" : feedback.accuracy > 50 ? "bg-amber-500" : ""}
          >
            Accuracy: {feedback.accuracy}%
          </Badge>
        </div>
        <CardDescription>Analysis of your recitation</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="comparison">
          <TabsList className="w-full">
            <TabsTrigger value="comparison" className="flex-1">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Comparison
            </TabsTrigger>
            <TabsTrigger value="mistakes" className="flex-1">
              Mistakes <Badge variant="outline" className="ml-2">{feedback.mistakes.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="correct" className="flex-1">
              Correct <Badge variant="outline" className="ml-2">{feedback.correctWords.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="flex-1">Suggestions</TabsTrigger>
          </TabsList>
          
          {/* Comparison Tab */}
          <TabsContent value="comparison" className="mt-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Accuracy</span>
                  <span className={`text-sm font-medium ${
                    feedback.accuracy >= 80 ? 'text-green-700' : 
                    feedback.accuracy >= 50 ? 'text-amber-700' : 'text-red-700'
                  }`}>{feedback.accuracy}%</span>
                </div>
                <Progress 
                  value={feedback.accuracy} 
                  className={`h-3 ${getAccuracyColor(feedback.accuracy)}`}
                />
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center mb-2 gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium">Words Correctly Recited</h4>
                  <span className="text-green-600 font-medium">{feedback.correctWords.length}</span>
                  <span className="text-xs text-muted-foreground">of {feedback.correctWords.length + feedback.mistakes.length}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {feedback.correctWords.map((word, index) => (
                    <Badge key={index} variant="outline" className="arabic-text text-base py-1 px-2 bg-green-50 text-green-700 border-green-200">
                      {word}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center mb-2 gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <h4 className="font-medium">Words with Mistakes</h4>
                  <span className="text-red-500 font-medium">{feedback.mistakes.length}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {feedback.mistakes.map((mistake, index) => (
                    <Badge key={index} variant="outline" className="arabic-text text-base py-1 px-2 bg-red-50 text-red-700 border-red-200">
                      {mistake.word}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="border p-3 rounded-md bg-tarteel-cream/20">
                <h4 className="font-medium flex items-center">
                  <Info className="h-4 w-4 mr-2 text-tarteel-primary" />
                  Recitation Summary
                </h4>
                <p className="mt-2 text-sm">
                  {feedback.accuracy >= 80 
                    ? "Excellent recitation! You've pronounced most words correctly with proper tajweed."
                    : feedback.accuracy >= 50
                    ? "Good effort! With more practice, you can improve your pronunciation and tajweed."
                    : "Keep practicing! Focus on the words highlighted as mistakes above."}
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mistakes" className="mt-4">
            <ScrollArea className="h-64 rounded-md">
              {feedback.mistakes.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-4">
                  <CheckCircle2 className="h-12 w-12 text-green-600 mb-2" />
                  <p className="text-center text-muted-foreground">No mistakes detected. Excellent recitation!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {feedback.mistakes.map((mistake, index) => (
                    <div key={index} className="p-3 border rounded-md bg-muted/50">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          {mistake.severity === 'major' ? (
                            <XCircle className="h-5 w-5 text-red-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium flex items-center">
                            <span className="arabic-text">{mistake.word}</span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {mistake.type.charAt(0).toUpperCase() + mistake.type.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{mistake.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="correct" className="mt-4">
            <ScrollArea className="h-64 rounded-md">
              {feedback.correctWords.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-4">
                  <AlertCircle className="h-12 w-12 text-amber-500 mb-2" />
                  <p className="text-center text-muted-foreground">No correctly pronounced words detected.</p>
                </div>
              ) : (
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {feedback.correctWords.map((word, index) => (
                      <Badge key={index} variant="secondary" className="arabic-text text-lg py-1 px-3 bg-green-50 text-green-700 border-green-200">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="suggestions" className="mt-4">
            <ScrollArea className="h-64 rounded-md">
              <div className="space-y-3 p-2">
                {feedback.suggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 border rounded-md flex">
                    <Info className="h-5 w-5 text-tarteel-primary mr-3 flex-shrink-0 mt-1" />
                    <p className="text-sm">{suggestion}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FeedbackPanel;
