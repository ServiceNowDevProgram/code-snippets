This OnChange Catalog Client Script is for validating passport number, date of issue, and date of expiry. 

It follows the specified rules(As per indian passport):- 
- The passport number should be 8 characters long, with the first character as an uppercase letter, the second and third characters as numbers (1-9 for the first digit, 0-9 for the second digit).
- The date of expiry should be calculated based on the date of issue:
- 1. If the user is an adult (18 years or older), the expiry date should be exactly 5 years from the date of issue.
  2. If the user is under 18, the expiry date should be exactly 10 years from the date of issue.
        
Passport Number Validation:
The passportPattern uses a regular expression:
^[A-Z] – The first character must be an uppercase letter.
[1-9][0-9] – The second and third characters are numbers; the first is between 1-9, and the second between 0-9.
[A-Z0-9]{5}$ – The last five characters are alphanumeric.
If the passport number does not match this pattern, the script displays an error message and clears the field.

Date of Expiry Calculation:
- After the date of issue and age are provided, the script calculates the expiry date by adding 5 years for adults (18 or older) or 10 years for minors (under 18).
- The calculated expiry date is automatically set in the date_of_expiry field in the yyyy-MM-dd format.
- Prompts are displayed if necessary fields like date_of_issue or age are missing before attempting the expiry date calculation.

This Client Script will ensure that the entered passport information and expiry date meet the requirements, providing a seamless and guided experience for the user.
