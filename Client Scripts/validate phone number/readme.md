Purpose: Ensures that users enter their phone numbers in a specific format. Phone number must be in format(123) 456-7890.
The regex:-  
1) ^\(\d{3}\) \d{3}-\d{4}$ validates phone numbers in the format:
2) An area code enclosed in parentheses (e.g., (123)),
3) Followed by a space,
4) Then three digits,
5) A hyphen,
6) And finally four digits.

Functionality: This script is triggered when the phone field changes. It uses a regular expression to validate the format. If the format is incorrect, it displays an error message and clears the field.
