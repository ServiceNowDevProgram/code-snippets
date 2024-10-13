# Alphanumeric String Validator

This project provides a simple JavaScript function to validate whether a given string is alphanumeric (i.e., contains only letters and numbers).

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Validation Logic](#validation-logic)
- [Examples](#examples)
- [How to Run](#how-to-run)
- [Contributing](#contributing)
- [License](#license)

## Features

- Validates strings to ensure they contain only letters (a-z, A-Z) and numbers (0-9).
- Returns a boolean indicating the validity of the string.

## Usage

You can use the `isAlphanumeric` function to check if a string is alphanumeric.

### Function Signature

```javascript
function isAlphanumeric(str)
```

### Parameters

- `str` (string): The string to be validated.

### Returns

- `boolean`: `true` if the string is alphanumeric, `false` otherwise.

## Validation Logic

The validation is performed using a regular expression:

```javascript
var alphanumericPattern = /^[a-zA-Z0-9]*$/;
```

This pattern checks that the string contains only letters and numbers.

## Examples

Here are some example strings and their validation results:

```javascript
var examples = [
    "abc123",    // Valid
    "ABC",       // Valid
    "123",       // Valid
    "abc123!",   // Invalid (contains '!')
    "hello world", // Invalid (contains space)
    "123-456",   // Invalid (contains '-')
];
```

### Test Output

When running the provided examples, the output will be:

```
abc123 is a valid alphanumeric string.
ABC is a valid alphanumeric string.
123 is a valid alphanumeric string.
abc123! is NOT a valid alphanumeric string.
hello world is NOT a valid alphanumeric string.
123-456 is NOT a valid alphanumeric string.
```

## How to Run

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/alphanumeric-validator.git
   ```

2. Open your JavaScript environment (e.g., browser console, Node.js).

3. Copy and paste the code into the console or run it in your Node.js application.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please create a pull request or open an issue.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Feel free to modify this README to fit your project's style or requirements!
