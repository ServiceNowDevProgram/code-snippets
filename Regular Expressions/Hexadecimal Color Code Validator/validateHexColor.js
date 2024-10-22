// Hexadecimal Color Code Validator
// This regex validates 3 or 6 digit hexadecimal color codes (with or without #).
// It handles both uppercase and lowercase hex characters.

const hexColorRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

function validateHexColor(color) {
  return hexColorRegex.test(color);
}

// Example usage:
console.log(validateHexColor("#ff5733")); // true - valid 6-digit color
console.log(validateHexColor("fff")); // true - valid 3-digit color without #
console.log(validateHexColor("#FFF")); // true - valid 3-digit uppercase
console.log(validateHexColor("ff5733")); // true - valid 6-digit color without #
console.log(validateHexColor("#123abz")); // false - invalid hex color (z is not valid)
console.log(validateHexColor("#1234")); // false - invalid length
