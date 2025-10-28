# trimNonCharacters

## Description

This JavaScript function removes special characters from strings while preserving valid characters from multiple language groups.

Useful for validating names or user input in internationalized applications.

> Sorry, Elon Musk's firstborn — `X Æ A-12` might not make it through unscathed.

## Features

- Removes punctuation, emojis, and symbols
- Preserves:
  - Basic Latin letters (A–Z, a–z)
  - Digits (0–9)
  - Whitespace and parentheses
  - Accented characters (e.g., é, ñ, ü)
  - Characters from:
    - Central/Eastern European languages
    - Cyrillic (Russian, Ukrainian)
    - Greek
    - Arabic
    - Hindi/Sanskrit (Devanagari)
    - Chinese, Japanese, Korean (CJK ideographs)

## Compatibility

- Fully compatible with **ServiceNow background scripts**
- Avoids unsupported features like:
  - Unicode property escapes (`\p{L}`)
  - Multi-line regex literals
  - Inline comments inside regex

## Usage

Change the input string to your own text/variable, call the function with the input, handle the result:
```
var input = "Hello, мир! Γειά σου κόσμε! مرحبا بالعالم! नमस्ते दुनिया! 你好，世界！";
var cleaned = trimNonCharacters(input);
gs.info("Cleaned: " + cleaned);
```
## Customization
Language support is modular. Unicode ranges are defined in an array and can be commented out or modified as needed:
```
var allowedRanges = [
  "a-zA-Z0-9()",     // Basic Latin
  "\\s",             // Whitespace
  "\\u00C0-\\u00FF", // Western European
  "\\u0100-\\u017F", // Central/Eastern European
  "\\u0400-\\u04FF", // Cyrillic
  "\\u0370-\\u03FF", // Greek
  "\\u0600-\\u06FF", // Arabic
  "\\u0900-\\u097F", // Hindi/Sanskrit
  "\\u4E00-\\u9FFF"  // Chinese, Japanese, Korean
];
```
