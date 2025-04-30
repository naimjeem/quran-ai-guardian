
import React, { useState, useRef } from 'react';
import TarteelHeader from '@/components/TarteelHeader';
import TarteelFooter from '@/components/TarteelFooter';
import RecordingButton from '@/components/RecordingButton';
import VerseSelector from '@/components/VerseSelector';
import VerseDisplay from '@/components/VerseDisplay';
import FeedbackPanel, { RecitationFeedback } from '@/components/FeedbackPanel';
import AudioPlayer from '@/components/AudioPlayer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { quranVerses } from '@/data/quranVerses';
import { analyzeTarteelRecitation } from '@/services/tarteelAI';
import { Info, BookOpen, Mic, History } from 'lucide-react';

const Index = () => {
  const [selectedVerseId, setSelectedVerseId] = useState<string>("1-1");
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<RecitationFeedback | null>(null);
  const [recitationHistory, setRecitationHistory] = useState<Array<{
    timestamp: Date;
    verseId: string;
    accuracy: number;
  }>>([]);
  
  const handleVerseSelect = (verseId: string) => {
    setSelectedVerseId(verseId);
    setRecordedAudioUrl(null);
    setFeedback(null);
  };
  
  const handleRecordingComplete = async (audioBlob: Blob) => {
    // Create a URL for the recorded audio
    const audioUrl = URL.createObjectURL(audioBlob);
    setRecordedAudioUrl(audioUrl);
    
    // Start processing
    setIsProcessing(true);
    toast.info("Analyzing your recitation...");
    
    try {
      // Get the target verse
      const targetVerse = quranVerses.find(v => v.id === selectedVerseId);
      
      if (!targetVerse) {
        throw new Error("Selected verse not found");
      }
      
      // Analyze the recitation
      const result = await analyzeTarteelRecitation(audioBlob, targetVerse);
      
      // Update feedback and history
      setFeedback(result);
      setRecitationHistory(prev => [
        {
          timestamp: new Date(),
          verseId: selectedVerseId,
          accuracy: result.accuracy
        },
        ...prev.slice(0, 9) // Keep only the 10 most recent entries
      ]);
      
      if (result.accuracy > 80) {
        toast.success("Excellent recitation! Great job!");
      } else if (result.accuracy > 50) {
        toast.info("Good effort! See feedback for improvement areas.");
      } else {
        toast.warning("Keep practicing! Check the feedback for guidance.");
      }
    } catch (error) {
      console.error("Error processing recitation:", error);
      toast.error("Failed to analyze recitation. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  const getVerseName = (verseId: string) => {
    const verse = quranVerses.find(v => v.id === verseId);
    return verse ? `${verse.surahName} ${verse.verseNumber}` : verseId;
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-tarteel-cream/50 bg-islamic-pattern">
      <TarteelHeader />
      
      <main className="flex-1 container py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-tarteel-primary mb-8">
            Tarteel AI <span className="text-tarteel-gold">Guardian</span>
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card className="overflow-hidden border-tarteel-gold/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-tarteel-primary">
                    Select & Record
                  </h3>
                  
                  <div className="space-y-6">
                    <VerseSelector 
                      selectedVerseId={selectedVerseId} 
                      onVerseSelect={handleVerseSelect} 
                    />
                    
                    <div className="pt-4">
                      <RecordingButton 
                        onRecordingComplete={handleRecordingComplete}
                        isProcessing={isProcessing}
                      />
                    </div>
                    
                    {recordedAudioUrl && (
                      <div className="pt-2">
                        <AudioPlayer 
                          audioUrl={recordedAudioUrl} 
                          label="Your Recitation" 
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-tarteel-gold/30">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-tarteel-primary flex items-center">
                    <Info className="h-5 w-5 mr-2" />
                    How to Use
                  </h3>
                  
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Select a verse from the dropdown</li>
                    <li>Click "Start Recording" and recite the verse</li>
                    <li>Click "Stop Recording" when done</li>
                    <li>Wait for AI analysis of your recitation</li>
                    <li>Review feedback to improve your recitation</li>
                  </ol>
                  
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    <p>This app uses your device's microphone to record your recitation and analyzes it using AI. No recordings are stored on servers.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <VerseDisplay verseId={selectedVerseId} />
              
              <Tabs defaultValue="feedback" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="feedback" className="flex-1">
                    <Mic className="h-4 w-4 mr-2" />
                    Recitation Feedback
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex-1">
                    <History className="h-4 w-4 mr-2" />
                    History
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="feedback" className="mt-4">
                  <FeedbackPanel 
                    feedback={feedback} 
                    isLoading={isProcessing} 
                  />
                </TabsContent>
                
                <TabsContent value="history" className="mt-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Recitation History</h3>
                      
                      {recitationHistory.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>No recitation history yet.</p>
                          <p className="text-sm">Your practice sessions will appear here.</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {recitationHistory.map((entry, index) => (
                            <div 
                              key={index} 
                              className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50"
                            >
                              <div>
                                <p className="font-medium">{getVerseName(entry.verseId)}</p>
                                <p className="text-xs text-muted-foreground">
                                  {entry.timestamp.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <span 
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    entry.accuracy > 80 
                                      ? 'bg-green-100 text-green-800' 
                                      : entry.accuracy > 50 
                                        ? 'bg-amber-100 text-amber-800' 
                                        : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {entry.accuracy}% Accuracy
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {recitationHistory.length > 0 && (
                        <div className="mt-4 flex justify-end">
                          <Button 
                            variant="outline" 
                            onClick={() => setRecitationHistory([])}
                            size="sm"
                          >
                            Clear History
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <TarteelFooter />
    </div>
  );
};

export default Index;
