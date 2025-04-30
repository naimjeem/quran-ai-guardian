
import { QuranVerse } from "@/data/quranVerses";
import { RecitationFeedback } from "@/components/FeedbackPanel";
import { analyzeTarteelRecitation } from "@/services/tarteelAnalyzer";

// Re-export the analyzeTarteelRecitation function to maintain backward compatibility
export { analyzeTarteelRecitation };

// Re-export functions from other modules to maintain compatibility
export { loadSpeechModel, transcribeWithHuggingFace } from "@/services/transcriptionService";
