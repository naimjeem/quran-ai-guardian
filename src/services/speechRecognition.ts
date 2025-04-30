import { RecitationFeedback } from "@/components/FeedbackPanel";
import { QuranVerse } from "@/data/quranVerses";
import { toast } from "sonner";

interface SpeechRecognitionResult {
  text: string;
  confidence: number;
}

// Improved Arabic text comparison using Levenshtein distance
const calculateLevenshteinDistance = (a: string, b: string): number => {
  const matrix: number[][] = [];

  // Initialize the matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[b.length][a.length];
};

const calculateSimilarity = (text1: string, text2: string): number => {
  // Normalize Arabic text by removing diacritics and extra spaces
  const normalize = (text: string) => {
    return text
      .replace(/[\u064B-\u065F]/g, '') // Remove diacritics
      .replace(/\s+/g, ' ')           // Normalize whitespace
      .trim();
  };
  
  const normalized1 = normalize(text1);
  const normalized2 = normalize(text2);
  
  // Calculate Levenshtein distance
  const distance = calculateLevenshteinDistance(normalized1, normalized2);
  
  // Convert to similarity score (0-1 range)
  const maxLength = Math.max(normalized1.length, normalized2.length);
  return maxLength > 0 ? 1 - (distance / maxLength) : 1;
};

// Mock function to simulate speech-to-text conversion with improved accuracy
export const transcribeAudio = async (audioBlob: Blob): Promise<SpeechRecognitionResult> => {
  // In a real implementation, we'd send this to a speech recognition service
  // or process it with a local model like Hugging Face
  
  // For demo purposes, we're going to simulate a delay and return mock data
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return mock transcription result with higher confidence
  return {
    text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
    confidence: 0.92
  };
};

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
    const similarity = calculateSimilarity(transcription.text, targetVerse.arabicText);
    console.log("Calculated similarity:", similarity);
    
    // Parse results and generate feedback
    const targetWords = targetVerse.arabicText.split(' ');
    const transcribedWords = transcription.text.split(' ');
    
    const correctWords: string[] = [];
    const mistakes = [];
    
    // More sophisticated comparison of words
    for (let i = 0; i < targetWords.length; i++) {
      const targetWord = targetWords[i];
      const transcribedWord = i < transcribedWords.length ? transcribedWords[i] : "";
      
      // Check if the word was correctly recited using word-level similarity
      const wordSimilarity = calculateSimilarity(targetWord, transcribedWord);
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

// Helper function to generate mistake descriptions
const getMistakeDescription = (type: 'pronunciation' | 'tajweed' | 'omission' | 'addition', word: string): string => {
  switch (type) {
    case 'pronunciation':
      return `The pronunciation of "${word}" needs improvement. Focus on proper makhraj (articulation point).`;
    case 'tajweed':
      return `Apply proper tajweed rule for "${word}". Pay attention to the elongation (madd).`;
    case 'omission':
      return `The word "${word}" was omitted or not clearly pronounced in your recitation.`;
    case 'addition':
      return `An extra syllable or sound was added when reciting "${word}".`;
    default:
      return `There was an issue with your recitation of "${word}".`;
  }
};

// Helper function to generate suggestions based on mistakes
const generateSuggestions = (mistakes: any[], surahName: string): string[] => {
  const suggestions: string[] = [];
  
  // Count mistake types
  const mistakeTypes = mistakes.reduce((acc: Record<string, number>, mistake) => {
    acc[mistake.type] = (acc[mistake.type] || 0) + 1;
    return acc;
  }, {});
  
  // Generate suggestions based on mistake types
  if (mistakeTypes.pronunciation && mistakeTypes.pronunciation > 1) {
    suggestions.push("Focus on proper makhraj (articulation points) when pronouncing the Arabic letters.");
  }
  
  if (mistakeTypes.tajweed && mistakeTypes.tajweed > 1) {
    suggestions.push("Pay special attention to tajweed rules, particularly the rules of elongation (madd) in this verse.");
  }
  
  if (mistakeTypes.omission && mistakeTypes.omission > 0) {
    suggestions.push("Try reciting more slowly to ensure you pronounce all words completely.");
  }
  
  // Add general suggestions
  suggestions.push(`Consider listening to a professional reciter's version of ${surahName} before your next attempt.`);
  suggestions.push("Practice with smaller portions of the verse before attempting the complete verse.");
  
  // If very few mistakes, add encouragement
  if (mistakes.length < 3) {
    suggestions.push("Your recitation is good overall. Continue practicing for even more improvement.");
  }
  
  return suggestions;
};
