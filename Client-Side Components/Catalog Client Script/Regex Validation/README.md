# Regular Expression on Catalog Client script

*****************
8th october:
This script will validate valid Adhaar number.
Adhaar is a 12 digit unique identification number issues by Unique Identification Authority of India (UIDAI) for Indian Residents.
The script will validate Adhaar through regex and if it is not valid, variable is cleared with field message.
For Catalog variables Preferred OOB method is listed here : https://www.servicenow.com/docs/bundle/xanadu-servicenow-platform/page/product/service-catalog-management/task/define-regex-vrble.html . The same regex can be defined in "Variable Validation Regex" module.
For Normal fields, this entire scriopt can be used.

Regex details :
/^[2-9][0-9]{3}[0-9]{4}[0-9]{4}$/
// ^ → Start of the string
// [2-9] → The first digit must be between 2 and 9
// [0-9]{3} → Followed by exactly 3 digits (0–9)
// [0-9]{4} → Followed by exactly 4 digits (0–9)
// [0-9]{4} → Followed by exactly 4 digits (0–9)
// $ → End of the string

*****************
With the help of this code you can easily validate the input value from the user and if it's not a email format you can clear and throw a error message below the variable. Of course you can use Email type variable as well but you cannot have a formatted error message.

* [Click here for script](script.js)




