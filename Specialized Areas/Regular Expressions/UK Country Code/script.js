//Regex to match UK 10 digit country code phone number

//Format +44 7XXX XXXXXX

//Regex expression to match UK phone number format +44 7XXX XXXXXX
const regex = /^\+44\s7\d{3}\s\d{6}$/;

// Function to check if a phone number matches the UK format
function isUK(phoneNumber) {
  // Test the phone number against the regular expression
  return regex.test(phoneNumber);
}

// Example phone number to test
const phoneNumber = "+44 7102 656764"; // Replace with an UK phone number

// Check if the phone number matches the UK format and log the result
if (isUK(phoneNumber)) {
  console.log(`Is UK phone number`);
} else {
  console.log(`Is not UK phone number`);
}
