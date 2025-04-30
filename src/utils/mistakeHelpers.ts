
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
export const getMistakeDescription = (type: MistakeType, word: string): string => {
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
export const generateSuggestions = (mistakes: RecitationMistake[], surahName: string): string[] => {
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
