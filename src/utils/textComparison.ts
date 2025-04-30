
/**
 * Utility functions for comparing Arabic text and calculating similarity
 */

// Calculate Levenshtein distance between two strings
export const calculateLevenshteinDistance = (a: string, b: string): number => {
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

// Normalize Arabic text by removing diacritics and extra spaces
export const normalizeArabicText = (text: string): string => {
  return text
    .replace(/[\u064B-\u065F]/g, '') // Remove diacritics
    .replace(/\s+/g, ' ')           // Normalize whitespace
    .trim();
};

// Calculate similarity between two Arabic texts
export const calculateTextSimilarity = (text1: string, text2: string): number => {
  const normalized1 = normalizeArabicText(text1);
  const normalized2 = normalizeArabicText(text2);
  
  // Calculate Levenshtein distance
  const distance = calculateLevenshteinDistance(normalized1, normalized2);
  
  // Convert to similarity score (0-1 range)
  const maxLength = Math.max(normalized1.length, normalized2.length);
  return maxLength > 0 ? 1 - (distance / maxLength) : 1;
};

// Calculate word-level similarity
export const calculateWordSimilarity = (word1: string, word2: string): number => {
  const normalized1 = normalizeArabicText(word1);
  const normalized2 = normalizeArabicText(word2);
  
  // Calculate Levenshtein distance
  const distance = calculateLevenshteinDistance(normalized1, normalized2);
  
  // Convert to similarity score (0-1 range)
  const maxLength = Math.max(normalized1.length, normalized2.length);
  return maxLength > 0 ? 1 - (distance / maxLength) : 1;
};
