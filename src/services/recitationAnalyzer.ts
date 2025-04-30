
import { QuranVerse } from "@/data/quranVerses";
import { RecitationFeedback } from "@/components/FeedbackPanel";
import { toast } from "sonner";
import { calculateTextSimilarity, calculateWordSimilarity } from "@/utils/textComparison";
import { getMistakeDescription, generateSuggestions, RecitationMistake } from "@/utils/mistakeHelpers";
import { transcribeAudio, transcribeWithHuggingFace, SpeechRecognitionResult } from "@/services/transcriptionService";

// Function to analyze the recitation and provide feedback with improved accuracy
export const analyzeTarteel = async (
  audioBlob: Blob, 
  targetVerse: QuranVerse
): Promise<RecitationFeedback> => {
  try {
    // Step 1: Transcribe the audio
    const transcription = await transcribeAudio(audioBlob);
    console.log("Transcription:", transcription);
    
    // Step 2: Compare with the target verse using the improved similarity algorithm
    const similarity = calculateTextSimilarity(transcription.text, targetVerse.arabicText);
    console.log("Calculated similarity:", similarity);
    
    // Parse results and generate feedback
    const targetWords = targetVerse.arabicText.split(' ');
    const transcribedWords = transcription.text.split(' ');
    
    const correctWords: string[] = [];
    const mistakes: RecitationMistake[] = [];
    
    // More sophisticated comparison of words
    for (let i = 0; i < targetWords.length; i++) {
      const targetWord = targetWords[i];
      const transcribedWord = i < transcribedWords.length ? transcribedWords[i] : "";
      
      // Check if the word was correctly recited using word-level similarity
      const wordSimilarity = calculateWordSimilarity(targetWord, transcribedWord);
      const isCorrect = wordSimilarity > 0.8;
      
      if (isCorrect) {
        correctWords.push(targetWord);
      } else {
        // Determine mistake type with better accuracy
        let mistakeType: 'pronunciation' | 'tajweed' | 'omission' | 'addition';
        
        if (transcribedWord === "") {
          mistakeType = 'omission';
        } else if (transcribedWord.length > targetWord.length + 2) {
          mistakeType = 'addition';
        } else if (wordSimilarity < 0.5) {
          mistakeType = 'pronunciation';
        } else {
          mistakeType = 'tajweed';
        }
        
        // Add mistake with more detailed information
        mistakes.push({
          type: mistakeType,
          word: targetWord,
          description: getMistakeDescription(mistakeType, targetWord),
          severity: wordSimilarity < 0.5 ? 'major' : 'minor'
        });
      }
    }
    
    // Add extra words as addition mistakes
    if (transcribedWords.length > targetWords.length) {
      for (let i = targetWords.length; i < transcribedWords.length; i++) {
        mistakes.push({
          type: 'addition',
          word: transcribedWords[i],
          description: `Extra word "${transcribedWords[i]}" was added to your recitation.`,
          severity: 'major'
        });
      }
    }
    
    // Calculate accuracy score based on improved similarity
    const accuracy = Math.round(similarity * 100);
    
    // Generate suggestions based on mistakes
    const suggestions = generateSuggestions(mistakes, targetVerse.surahName);
    
    return {
      mistakes,
      correctWords,
      accuracy,
      suggestions
    };
  } catch (error) {
    console.error("Error analyzing recitation:", error);
    toast.error("Failed to analyze recitation. Please try again.");
    
    // Return a default error feedback
    return {
      mistakes: [],
      correctWords: [],
      accuracy: 0,
      suggestions: ["An error occurred during analysis. Please try recording again."]
    };
  }
};
