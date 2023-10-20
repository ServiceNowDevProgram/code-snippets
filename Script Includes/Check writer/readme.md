# RegexUtils

I am sure ServiceNow users need a check right? This Script Include gets a number and converts to an English style check.

e.g. 123456789 is printed as:

one hundred and twenty-three million, four hundred and fifty-six thousand, seven hundred and eighty-nine

## Usage

```javascript
var checkWriter = new global.CheckWriter();

gs.log(checkWriter.write(123456789)); // prints: one hundred and twenty-three million, four hundred and fifty-six thousand, seven hundred and eighty-nine

```