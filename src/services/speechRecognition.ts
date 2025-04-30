
import { RecitationFeedback } from "@/components/FeedbackPanel";
import { QuranVerse } from "@/data/quranVerses";
import { analyzeTarteel } from "@/services/recitationAnalyzer";

// Re-export the analyzeTarteel function to maintain backward compatibility
export { analyzeTarteel };

// Re-export types and functions from other modules to maintain compatibility
export type { SpeechRecognitionResult } from "@/services/transcriptionService";
export { transcribeAudio } from "@/services/transcriptionService";
export { calculateTextSimilarity, calculateLevenshteinDistance } from "@/utils/textComparison";
