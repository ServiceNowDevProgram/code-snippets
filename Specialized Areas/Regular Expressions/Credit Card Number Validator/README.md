# Credit Card Validator Regular Expression

This JavaScript module provides a regular expression for validating credit card numbers from major card providers such as Visa, MasterCard, American Express, Discover, Diners Club, and JCB. It ensures that the card number follows the correct structure and length for each provider.

## Features:

- Supports major credit card providers: Visa, MasterCard, American Express, Discover, Diners Club, and JCB.
- Validates the structure, length, and format of the card numbers.
- Simple and efficient to use for front-end or back-end applications.

## Usage:

```javascript
const creditCardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|        // Visa
                          5[1-5][0-9]{14}|                   // MasterCard
                          3[47][0-9]{13}|                    // American Express
                          6(?:011|5[0-9]{2})[0-9]{12}|       // Discover
                          3(?:0[0-5]|[68][0-9])[0-9]{11}|    // Diners Club
                          (?:2131|1800|35\d{3})\d{11})$/;    // JCB

function validateCreditCard(cardNumber) {
  return creditCardRegex.test(cardNumber);
}

// Example usage:
console.log(validateCreditCard('4111111111111111')); // Visa, true
console.log(validateCreditCard('5555555555554444')); // MasterCard, true
console.log(validateCreditCard('378282246310005'));  // American Express, true
console.log(validateCreditCard('6011111111111117')); // Discover, true
console.log(validateCreditCard('30569309025904'));   // Diners Club, true
console.log(validateCreditCard('3530111333300000')); // JCB, true
console.log(validateCreditCard('1234567812345670')); // Invalid, false
```
