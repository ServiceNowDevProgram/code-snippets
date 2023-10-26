//Check for Kenyan country code
function isFromKenya(phoneNumber) {
  const regex = /^(\+254|0)(7)(\d{8})$/;
  return regex.test(phoneNumber);
}

// Example usage
const phoneNumber = "+254712345678"; // Replace with your phone number
const isKenyanNumber = isFromKenya(phoneNumber);

console.log(isKenyanNumber);
