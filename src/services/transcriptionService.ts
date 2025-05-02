
import { toast } from "sonner";
import { pipeline } from "@huggingface/transformers";

// Speech recognition result type
export interface SpeechRecognitionResult {
  text: string;
  confidence: number;
}

// Cache the speech recognition pipeline
let speechRecognitionPipeline: any = null;

// Load the HuggingFace speech model
export const loadSpeechModel = async () => {
  if (!speechRecognitionPipeline) {
    try {
      // Load the model only once and cache it
      speechRecognitionPipeline = await pipeline(
        "automatic-speech-recognition",
        "Xenova/whisper-small" // Using a model that's compatible with transformers.js
      );
      
      return speechRecognitionPipeline;
    } catch (error) {
      console.error("Failed to load speech model:", error);
      toast.error("Failed to load speech recognition model. Using fallback implementation.");
      throw error;
    }
  }
  return speechRecognitionPipeline;
};

// Real function to transcribe audio using the browser's speech recognition API
export const transcribeAudio = async (audioBlob: Blob): Promise<SpeechRecognitionResult> => {
  try {
    // First attempt to use HuggingFace Transformers
    const text = await transcribeWithHuggingFace(audioBlob);
    return {
      text,
      confidence: 0.85 // Estimating confidence as HF doesn't always provide this
    };
  } catch (error) {
    console.error("Error transcribing audio:", error);
    
    // Fallback to Web Speech API if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const text = await transcribeWithWebSpeechAPI(audioBlob);
        return {
          text,
          confidence: 0.7 // Lower confidence for Web Speech API
        };
      } catch (webSpeechError) {
        console.error("Web Speech API failed:", webSpeechError);
      }
    }
    
    // If all else fails, inform the user
    toast.error("Speech recognition failed. Please try again or use a different browser.");
    throw new Error("Could not transcribe audio with any available method");
  }
};

// Function to transcribe audio using Web Speech API
const transcribeWithWebSpeechAPI = (audioBlob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Create an audio element to play the blob
    const audio = new Audio();
    const url = URL.createObjectURL(audioBlob);
    audio.src = url;
    
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      reject(new Error("Speech recognition not supported in this browser"));
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA'; // Set language to Arabic
    recognition.continuous = true;
    recognition.interimResults = false;
    
    let result = '';
    
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join(' ');
      result += transcript;
    };
    
    recognition.onerror = (event) => {
      reject(new Error(`Speech recognition error: ${event.error}`));
    };
    
    recognition.onend = () => {
      resolve(result || ""); // Return empty string if no result
    };
    
    // Play the audio and start recognition
    audio.onplay = () => {
      recognition.start();
    };
    
    audio.onended = () => {
      recognition.stop();
      URL.revokeObjectURL(url);
    };
    
    audio.play().catch(reject);
  });
};

// Function to transcribe audio using HuggingFace's transformers.js
export const transcribeWithHuggingFace = async (audioBlob: Blob): Promise<string> => {
  try {
    // Try to load the speech recognition model
    const transcriber = await loadSpeechModel();
    
    if (!transcriber) {
      throw new Error("Speech model not loaded");
    }
    
    // Convert Blob to ArrayBuffer for the model
    const arrayBuffer = await audioBlob.arrayBuffer();
    
    // Create a Float32Array from the audio buffer for the model
    const buffer = new Uint8Array(arrayBuffer);
    
    // Transcribe the audio
    const result = await transcriber(buffer);
    
    // Check if result is an array or a single object and extract text accordingly
    let transcribedText = "";
    if (Array.isArray(result)) {
      transcribedText = result[0]?.text || "";
    } else {
      transcribedText = result?.text || "";
    }
    
    console.log("HuggingFace transcription result:", transcribedText);
    return transcribedText;
  } catch (error) {
    console.error("Error transcribing with HuggingFace:", error);
    throw error;
  }
};

// Extend the Window interface to include SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
