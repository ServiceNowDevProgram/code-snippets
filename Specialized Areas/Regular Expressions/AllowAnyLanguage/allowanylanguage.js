function trimNonCharacters(str) {
  // Define Unicode ranges for each language group
  var allowedRanges = [
    "a-zA-Z0-9()",     // Basic Latin letters, digits, parentheses
    "\\s",             // Whitespace

    // Western European (Latin-1 Supplement)
    "\\u00C0-\\u00FF", // e.g., é, ñ, ü

    // Central/Eastern European (Latin Extended-A)
    "\\u0100-\\u017F", // e.g., Ą, Č, Ő

    // Cyrillic (Russian, Ukrainian, Bulgarian)
    "\\u0400-\\u04FF", // e.g., мир, привет

    // Greek
    "\\u0370-\\u03FF", // e.g., Γειά σου κόσμε

    // Arabic
    "\\u0600-\\u06FF", // e.g., مرحبا بالعالم

    // Devanagari (Hindi, Sanskrit)
    "\\u0900-\\u097F", // e.g., नमस्ते दुनिया

    // CJK Unified Ideographs (Chinese, Japanese Kanji, Korean Hanja)
    "\\u4E00-\\u9FFF"  // e.g., 你好，世界
  ];

  // Build the regex pattern string
  var pattern = "[^" + allowedRanges.join("") + "]+";

  // Create the RegExp object
  var regex = new RegExp(pattern, "g");

  // Apply the regex to clean the string
  return str.replace(regex, '');
}

// Example input with comments for each language
var input = 
  "Hello, " +                  // English: "Hello, "
  "мир! " +                    // Russian: "world!"
  "Γειά σου κόσμε! " +        // Greek: "Hello world!"
  "مرحبا بالعالم! " +         // Arabic: "Hello world!"
  "नमस्ते दुनिया! " +         // Hindi: "Hello world!"
  "你好，世界！";               // Chinese: "Hello, world!"

var cleaned = trimNonCharacters(input);

gs.info("Original: " + input);
gs.info("Cleaned: " + cleaned);
