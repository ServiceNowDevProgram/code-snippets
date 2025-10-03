# Indian GSTIN Validator

This project provides a guide and resources for validating an Indian GST Identification Number (GSTIN) using a Regular Expression. A GSTIN is a 15-character alphanumeric code assigned to taxpayers in India.

## Table of Contents

- [Features](#features)
- [GSTIN Format and Structure](#gstin-format-and-Structure)
- [Validation Logic (Regular Expression)](#validation-logic)
- [Examples](#examples)
- [Contributing](#contributing)

## Features

- Defines the regular expression pattern for a structurally valid GSTIN.
- Explains the 15-character structure of the GSTIN.

## GSTIN Format and Structure

A valid GSTIN must be 15 characters long and adhere to the following structure:
<table border="1">
    <thead>
        <tr>
            <th>Characters</th>
            <th>Length</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1-2</td>
            <td>2</td>
            <td><strong>State Code</strong> (Numeric, e.g., '27' for Maharashtra)</td>
        </tr>
        <tr>
            <td>3-12</td>
            <td>10</td>
            <td><strong>PAN Number</strong> of the taxpayer (first 5 alphabets, next 4 numbers, last 1 alphabet)</td>
        </tr>
        <tr>
            <td>13</td>
            <td>1</td>
            <td><strong>Entity Code</strong> (Registration count within the state, a number from 1-9 or an alphabet A-Z)</td>
        </tr>
        <tr>
            <td>14</td>
            <td>1</td>
            <td><strong>Default Character</strong> ('Z' by default)</td>
        </tr>
        <tr>
            <td>15</td>
            <td>1</td>
            <td><strong>Check Code/Digit</strong> (An alphabet or number for checksum)</td>
        </tr>
    </tbody>
</table>

### Validation Logic (Regular Expression)

The most commonly used Regular Expression (Regex) pattern for GSTIN structural validation is:


```javascript
/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
```

### Breakdown of the Regex:

- `^` : Matches the start of the string.
- `[0-9]{2}` : Matches the first two digits for the State Code.
- `[A-Z]{5}` : Matches the next five uppercase alphabets (part of the PAN).
- `[0-9]{4}` : Matches the next four digits (part of the PAN).
- `[A-Z]{1}` : Matches the next single uppercase alphabet (part of the PAN).
- `[1-9A-Z]{1}` : Matches the 13th character (Entity Code) which is a number from 1-9 or an alphabet.
- `Z` : Matches the 14th character exactly as 'Z'.
- `[0-9A-Z]{1}` : Matches the 15th character (Check Code) which is a single number or uppercase alphabet.
- `$` : Matches the end of the string.

### Returns

- `boolean`: `true` if the string is matches with the given regular expression, `false` otherwise.

### Examples

<table border="1">
    <thead>
        <tr>
            <th>GSTIN</th>
            <th>Status (Structural Regex)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>33AAACH1645P2ZH</code></td>
            <td>Valid</td>
        </tr>
        <tr>
            <td><code>36AAICG1508J1ZN</code></td>
            <td>Valid (example structure)</td>
        </tr>
        <tr>
            <td><code>06BZAF67</code></td>
            <td>Invalid (wrong length)</td>
        </tr>
        <tr>
            <td><code>AZBZAHM6385P6Z2</code></td>
            <td>Invalid (State Code not numeric)</td>
        </tr>
    </tbody>
</table>


### Test Output

When running the provided examples, the output will be:

```
33AAACH1645P2ZH isValidGSTNo true
36AAICG1508J1ZN isValidGSTNo true
06BZAF67 isValidGSTNo false
AZBZAHM6385P6Z2 isValidGSTNo false
```

## Contributing

Contributions are welcome! If you have suggestions or improvements, please create a pull request or open an issue.

---

Feel free to modify this README to fit your project's style or requirements!
