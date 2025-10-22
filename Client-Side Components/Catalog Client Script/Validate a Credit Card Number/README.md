**Description of the Credit Card Number Validation Script**
Purpose
The script validates a credit card number entered by the user in a ServiceNow form. 
It checks if the number is a valid 16-digit credit card number using a combination of a regular expression and the Luhn algorithm for basic validation.

**Validation Criteria**
Format:
The credit card number must consist of exactly 16 digits.
**Luhn Algorithm:**
The script implements the Luhn algorithm to determine if the credit card number is potentially valid. 
This algorithm helps catch common errors in credit card numbers, such as transposed digits.
