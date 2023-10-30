# Script Include: CSVParser

A script includes that parses concatenated CSV string and returns and array of the JSON objects for each row of the CSV data.

## Example usage

```
var csv = "John, Doe, 33\nJane, Doe, 32\nJack, Doe, 11\nJosh, Doe, 13"  // Your CSV data
var delimiter = ","
var headers = ["first_name", "last_name", "age"] // Your CSV data headers
var result = parser.parse(csv, headers, delimiter);
```