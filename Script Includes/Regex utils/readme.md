# RegexUtils

A script include with some of the common Regex related functions

## Usage

Mail script
```javascript
var concatenatedString = `
Name: rahman mahmoodi
Position: Tech
Company: ValueFlow
`; // If using ES6
var helper = new RegexUtils();
var name = helper.findFieldValue("Name", concatenatedString, ":");
```