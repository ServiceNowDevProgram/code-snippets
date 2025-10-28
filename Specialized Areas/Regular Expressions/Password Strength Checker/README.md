# Password Strength Checker

This code snippet checks the strength of a given password based on various criteria, including length, lowercase letters, uppercase letters, digits, and special characters.

**Note: This code is written in ES2021, which is supported in scoped applications where it is enabled (default for new scopes since Utah).**

## How to Use

1. Copy and paste the `passwordStrength.js` code into your project.

2. To check the strength of a password, call the `checkPasswordStrength` function with the password as the argument.

   ```javascript
   const password = "YourPassword123!";
   const result = checkPasswordStrength(password);
