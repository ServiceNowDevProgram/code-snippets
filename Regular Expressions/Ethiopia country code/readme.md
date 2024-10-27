# Check for Ethiopian phone number

## Problem statement

Find or detect ethiopian phone number

## Regex code explanation

```js
const regex = /^(\+251|0)(9)([0-9]{8})$/;
```

> ^: Matches the start of the string <br/>

> (\+251|0): This is a capturing group that matches either the country code "+251" or the digit "0". The | character acts as an OR operator, allowing either option to be matched.

> (9): This is another capturing group that matches the digit "9". 

> ([0-9]{8}): This is a capturing group that matches exactly 8 digits. It represents the remaining digits of the Ethiopian phone number after the country code and the digit "9". The [0-9] character class matches any digit, and {8} specifies that exactly 8 digits should be matched.

> $: Matches the end of the string.

## Code explanation

```js
function isFromEthiopia(phoneNumber) {
  return regex.test(phoneNumber);
}
```

> isFromEthiopia(phoneNumber) { ... } function: This line declares a function named isFromEthiopia that accepts a phoneNumber parameter. This function will be used to determine if a given phone number belongs to Ethiopia.

> return regex.test(phoneNumber);: This line uses the test() method of the RegExp object regex to check if the phoneNumber matches the defined regular expression pattern. The test() method returns true if there is a match and false otherwise.

> The return statement returns the result of the regex.test(phoneNumber) expression, which indicates whether the given phone number matches the Ethiopian phone number pattern.


## Demo Example

```js
// Example usage
const phoneNumber = "+251912345678"; // Replace with an Ethiopian phone number

// isFromEthiopia returns true if the number is from ethiopia
if (isFromEthiopia(phoneNumber)) {
  console.log(`Is an Ethiopian phone number`);
} else {
  console.log(`Is not Ethiopian phone number`);
}
```

## Valid Phone numbers

- +251912345678
- 0912345678
- +251911223344
- 0911223344
- 091234567

## invalid phone numbers

- +251012345678
- 09123456789
- +2519ABCDE12
- 091234567890
- 09123