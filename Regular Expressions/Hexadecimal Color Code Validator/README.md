# Hexadecimal Color Code Validator

This JavaScript module provides a regular expression for validating hexadecimal color codes, commonly used in web development (CSS, HTML, etc.).

## Features:

- Validates 3-digit or 6-digit hexadecimal color codes.
- Supports uppercase or lowercase letters.
- Accepts color codes both with and without the leading `#` symbol.
- Ensures that only valid hexadecimal characters (0-9, a-f, A-F) are used.

### **Examples of Valid Hex Codes:**

- `#ff5733` (6 digits, lowercase)
- `#FFF` (3 digits, uppercase)
- `fff` (3 digits, lowercase, without `#`)
- `FF5733` (6 digits, uppercase, without `#`)

### **Examples of Invalid Hex Codes:**

- `#123abz` (contains invalid character `z`)
- `#1234` (invalid length)
- `#ZZZ999` (invalid characters)
- `1234567` (invalid length)

## Usage:

```javascript
const hexColorRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

function validateHexColor(color) {
  return hexColorRegex.test(color);
}

// Example usage:
console.log(validateHexColor("#ff5733")); // true
console.log(validateHexColor("fff")); // true
console.log(validateHexColor("#123abz")); // false
```
