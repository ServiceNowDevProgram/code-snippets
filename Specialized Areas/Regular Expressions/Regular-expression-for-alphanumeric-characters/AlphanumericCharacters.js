// Alphanumeric regex pattern
var alphanumericPattern = /^[a-zA-Z0-9]*$/;

// Function to validate if a string is alphanumeric
function isAlphanumeric(str) {
    return alphanumericPattern.test(str);
}

// Example usage
var examples = [
    "abc123",    // Valid
    "ABC",       // Valid
    "123",       // Valid
    "abc123!",   // Invalid (contains '!')
    "hello world", // Invalid (contains space)
    "123-456",   // Invalid (contains '-')
];

// Test the examples using a for loop
for (var i = 0; i < examples.length; i++) {
    var example = examples[i];
    if (isAlphanumeric(example)) {
        gs.print(example+" is a valid alphanumeric string.");
    } else {
        gs.print(example+ " is NOT a valid alphanumeric string.");
    }
}

/*
when you run this code, it will output:
*** Script: abc123 is a valid alphanumeric string.
*** Script: ABC is a valid alphanumeric string.
*** Script: 123 is a valid alphanumeric string.
*** Script: abc123! is NOT a valid alphanumeric string.
*** Script: hello world is NOT a valid alphanumeric string.
*** Script: 123-456 is NOT a valid alphanumeric string.
*/
