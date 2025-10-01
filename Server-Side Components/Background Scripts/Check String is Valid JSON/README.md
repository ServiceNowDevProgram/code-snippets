# Function to check if string is a valid JSON

## Problem statement
When working with serialized data, you might come across some malformed or invalid JSON strings from time to time. While JavaScript doesn't have a built-in validation method for JSON, it has a handy JSON.parse() method that can be used to check if a string is a valid JSON format.

## Description
The `isValidJSON` function checks if a given string is a valid JSON format. It tries to parse the string and returns `true` if the parsing is successful and `false` if an error occurs during the parsing process. 

## Usage
This function is useful for validating JSON strings before attempting to use them in your application. 

## Examples

### Example 1
```javascript
const str = '{ "firstName": "John", "lastName": "Doe" }';
```
This will output: `String is valid JSON`

### Example 2
```javascript
const invalidStr = '{ firstName: John, lastName: Doe }';
```
This will output: `String is not valid JSON`
