# Type Elements Of An Array

This background script may be useful if you come 
across a situation where it would be necessary to convert 
elements to a specific type such as string or number.

# Use Case: 
example: several string numbers to a number type like: ['1', '2', '3'] => [1, 2, 3] 
thus being able to avoid errors in situations involving calculations

# How Map Function Works Example:
const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = array1.map((x) => x * 2);

console.log(map1);
// Expected output: Array [2, 8, 18, 32]
