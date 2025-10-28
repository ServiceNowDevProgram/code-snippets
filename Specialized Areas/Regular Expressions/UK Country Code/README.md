# UK Phone Number Validator

## Problem statement
Regular Expressions, which allows checking for UK 10 digit phone numbers. UK format starts with the country code +44 followed by a space, 7 indicates a mobile number, and XXX XXXXXX are placeholders for the remaining digits. 
The format supported is +44 7XXX XXXXXX. The validation is performed using a regular expression to ensure the phone number adheres to this format.

## Regex code explanation

```js
const regex = /^\+44\s7\d{3}\s\d{6}$/;
```

> ^: Matches the start of the string. <br/>

> \+44 matches the literal characters +44.

> \s matches a space.

> 7 matches the digit 7 (indicating a mobile number).

> \d{3} matches exactly three digits.

> \s matches another space.

> \d{6} matches exactly six digits.

> $ asserts the position at the end of the string.


## Valid Phone numbers Example

- +44 7102 656764
- +44 7252 968235
- +44 7392 628731
- +44 7580 159076

## Invalid Phone numbers Example

- +44 758089 159076
- +44 7580 29076
- +44 7580 5629076
- +447580562907
- +44 7580 5AR907

