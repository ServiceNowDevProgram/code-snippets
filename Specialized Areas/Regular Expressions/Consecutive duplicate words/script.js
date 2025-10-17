// Consecutive Duplicate Words Detector
// This regex finds repeated words that appear consecutively, such as "the the" or "and and".
// Useful for grammar or text quality checks.

const duplicateWordsRegex = /\b([A-Za-z]+)\s+\1\b/gi;

function hasDuplicateWords(text) {
  return duplicateWordsRegex.test(text);
}

// Example usage:
console.log(hasDuplicateWords("This is the the example.")); // true
console.log(hasDuplicateWords("We need to to check this.")); // true
console.log(hasDuplicateWords("Everything looks good here.")); // false
console.log(hasDuplicateWords("Hello hello world.")); // true (case-insensitive)
console.log(hasDuplicateWords("No repetition found.")); // false
