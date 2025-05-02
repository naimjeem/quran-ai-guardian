
import { QuranVerse } from "@/data/quranVerses";
import { RecitationFeedback } from "@/components/FeedbackPanel";
import { toast } from "sonner";
import { calculateTextSimilarity } from "@/utils/textComparison";
import { getMistakeDescription, generateSuggestions, RecitationMistake } from "@/utils/mistakeHelpers";
import { transcribeWithHuggingFace } from "@/services/transcriptionService";

// Function to analyze the recitation and provide feedback
export const analyzeTarteelRecitation = async (
  audioBlob: Blob, 
  targetVerse: QuranVerse
): Promise<RecitationFeedback> => {
  try {
    // Step 1: Get real transcription using HuggingFace
    let transcribedText;
    try {
      transcribedText = await transcribeWithHuggingFace(audioBlob);
      console.log("HuggingFace transcription:", transcribedText);
    } catch (error) {
      console.error("Error with HuggingFace transcription:", error);
      throw new Error("Failed to transcribe audio");
    }
    
    // Calculate similarity with the target verse
    const similarity = calculateTextSimilarity(transcribedText, targetVerse.arabicText);
    console.log("Calculated similarity:", similarity);
    
    // Parse results and generate real feedback
    const targetWords = targetVerse.arabicText.split(' ');
    const transcribedWords = transcribedText.split(' ');
    
    const correctWords: string[] = [];
    const mistakes: RecitationMistake[] = [];
    
    // Calculate correct words and real mistakes
    for (let i = 0; i < targetWords.length; i++) {
      const targetWord = targetWords[i];
      
      // Check if the word was correctly recited
      const isCorrect = i < transcribedWords.length && 
                        calculateTextSimilarity(targetWord, transcribedWords[i]) > 0.8;
      
      if (isCorrect) {
        correctWords.push(targetWord);
      } else {
        // Determine mistake type based on actual comparison
        let mistakeType: 'pronunciation' | 'tajweed' | 'omission' | 'addition';
        let severity: 'major' | 'minor';
        
        if (i >= transcribedWords.length) {
          mistakeType = 'omission';
          severity = 'major';
        } else if (transcribedWords[i].length > targetWord.length + 2) {
          mistakeType = 'addition';
          severity = 'major';
        } else {
          const wordSimilarity = calculateTextSimilarity(targetWord, transcribedWords[i]);
          if (wordSimilarity < 0.5) {
            mistakeType = 'pronunciation';
            severity = 'major';
          } else {
            mistakeType = 'tajweed';
            severity = 'minor';
          }
        }
        
        // Add the mistake with detailed information
        mistakes.push({
          type: mistakeType,
          word: targetWord,
          description: getMistakeDescription(mistakeType, targetWord),
          severity: severity
        });
      }
    }
    
    // Check for additional words in the transcription
    if (transcribedWords.length > targetWords.length) {
      for (let i = targetWords.length; i < transcribedWords.length; i++) {
        if (transcribedWords[i] && transcribedWords[i].trim() !== '') {
          mistakes.push({
            type: 'addition',
            word: transcribedWords[i],
            description: `Extra word "${transcribedWords[i]}" was added to your recitation.`,
            severity: 'major'
          });
        }
      }
    }
    
    // Calculate accuracy score based on correctly pronounced words instead of similarity
    const correctWordsCount = correctWords.length;
    const totalWordsCount = targetWords.length;
    const accuracy = Math.round((correctWordsCount / totalWordsCount) * 100);
    
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
