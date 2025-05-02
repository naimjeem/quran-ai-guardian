
// Helper types for mistake analysis
export type MistakeType = 'pronunciation' | 'tajweed' | 'omission' | 'addition';
export type MistakeSeverity = 'major' | 'minor';

export interface RecitationMistake {
  type: MistakeType;
  word: string;
  description: string;
  severity: MistakeSeverity;
}

// Helper function to generate mistake descriptions
export const getMistakeDescription = (type: MistakeType, word: string, beginnerMode: boolean = false): string => {
  switch (type) {
    case 'pronunciation':
      return beginnerMode 
        ? `The sound of "${word}" was a bit different from the example. Try listening to the verse again.` 
        : `The pronunciation of "${word}" needs improvement. Focus on proper makhraj (articulation point).`;
    case 'tajweed':
      return beginnerMode
        ? `The rhythm or tone for "${word}" can be improved with practice.`
        : `Apply proper tajweed rule for "${word}". Pay attention to the elongation (madd).`;
    case 'omission':
      return beginnerMode
        ? `It seems "${word}" was missed in your recitation. Try again, taking your time.`
        : `The word "${word}" was omitted or not clearly pronounced in your recitation.`;
    case 'addition':
      return beginnerMode
        ? `There was an extra sound when reciting near "${word}".`
        : `An extra syllable or sound was added when reciting "${word}".`;
    default:
      return beginnerMode
        ? `There was a small difference in how you recited "${word}".`
        : `There was an issue with your recitation of "${word}".`;
  }
};

// Helper function to generate suggestions based on mistakes
export const generateSuggestions = (
  mistakes: RecitationMistake[], 
  surahName: string,
  beginnerMode: boolean = false
): string[] => {
  const suggestions: string[] = [];
  
  // Count mistake types
  const mistakeTypes = mistakes.reduce((acc: Record<string, number>, mistake) => {
    acc[mistake.type] = (acc[mistake.type] || 0) + 1;
    return acc;
  }, {});
  
  // Generate suggestions based on mistake types and mode
  if (beginnerMode) {
    // Beginner-friendly suggestions
    if (mistakeTypes.pronunciation && mistakeTypes.pronunciation > 1) {
      suggestions.push("Try to mimic the sounds as closely as you can. It's okay if they're not perfect!");
    }
    
    if (mistakeTypes.tajweed && mistakeTypes.tajweed > 1) {
      suggestions.push("Focus on the rhythm and flow of the verse. Listen to the example and try to match the pace.");
    }
    
    if (mistakeTypes.omission && mistakeTypes.omission > 0) {
      suggestions.push("Take your time and recite more slowly. It's better to be accurate than fast.");
    }
    
    // Add general beginner suggestions
    suggestions.push(`Listen to the example recitation of ${surahName} several times before trying again.`);
    suggestions.push("Try repeating just one word at a time until you feel comfortable.");
    suggestions.push("Remember that learning to recite the Quran takes time. Be patient with yourself!");
    
    // Encouragement for beginners
    if (mistakes.length > 3) {
      suggestions.push("You're making great progress! Learning to recite in a new language is challenging.");
    } else if (mistakes.length > 0) {
      suggestions.push("Excellent effort! Your pronunciation is getting better with each attempt.");
    } else {
      suggestions.push("Perfect recitation! Keep practicing to maintain your progress.");
    }
  } else {
    // Standard suggestions
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
  }
  
  return suggestions;
};
