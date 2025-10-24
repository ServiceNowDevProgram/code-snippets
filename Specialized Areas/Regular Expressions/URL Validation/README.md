# Validate URL using Regular Expression
Validating URLs using regular expressions in JavaScript involves crafting patterns to match URL formats, ensuring they adhere to standards like scheme, domain, and optional path or query parameters. This regex pattern verifies the structure and components of a URL string for validity.

## Description
The `isValidURL` function checks if a given string is a valid URL format using a regular expression. It ensures that the input string matches the pattern of typical web URLs, covering variations with "http", "https", and "www".

## Usage
This function is useful for validating URLs before processing or storing them in your application.

## Regex code explanation

```js
const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
```

> /: Start of the regex.

> https?: Matches "http" or "https" (the s? makes the s optional).

> :\/\/: Matches "://".

> (?:www\.|(?!www)): A non-capturing group that matches either "www." or ensures "www" is not present.

> [a-zA-Z0-9]: Matches any alphanumeric character.

> [a-zA-Z0-9-]+: Matches one or more alphanumeric characters or hyphens.

> [a-zA-Z0-9]: Matches any alphanumeric character.

> \.: Matches a period.

> [^\s]{2,}: Matches two or more characters that are not whitespace.

> |: OR operator to match different patterns.

> www\.: Matches "www.".

> [a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]: Matches a pattern similar to the above.

> \.: Matches a period.

> [^\s]{2,}: Matches two or more characters that are not whitespace.

> |: OR operator to match different patterns.

> https?: Matches "http" or "https" (the s? makes the s optional).

> :\/\/: Matches "://".

> (?:www\.|(?!www)): A non-capturing group that matches either "www." or ensures "www" is not present.

> [a-zA-Z0-9]+: Matches one or more alphanumeric characters.

> \.: Matches a period.

> [^\s]{2,}: Matches two or more characters that are not whitespace.

> |: OR operator to match different patterns.

> www\.: Matches "www.".

> [a-zA-Z0-9]+\.[^\s]{2,}: Matches a pattern similar to the above.

> /: End of the regex.

> gi: Global match (match all occurrences) and case-insensitive match.

So, this regex essentially matches different patterns of URLs, covering variations with "http", "https", "www", and domain names.

## Examples

### Example 1
```javascript
const url = "www.servicenow.com";
```
This will output: `Valid URL`.

### Example 2
```javascript
const invalidUrl = "servicenow@com";
```
This will output: `Invalid URL`.
