// Function to check if a string is a valid JSON
function isValidJSON(str) {
    try {
        // Try to parse the string as JSON
        JSON.parse(str);
    } catch (e) {
        // If an error occurs, the string is not valid JSON
        return false;
    }
    // If no error occurs, the string is valid JSON
    return true;                    
}

// Example JSON string
const str = '{ "firstName":"John" , "lastName": "Doe"}'; 

// Check if the string is valid JSON and log the result
if (isValidJSON(str)) {
  console.log('String is valid JSON');
} else {
  console.log('String is not valid JSON');
}
