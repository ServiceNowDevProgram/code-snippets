//Check for US country code
function isFromUS(phoneNumber) {
  const regex = /^(\+1|1)(\d{10})$/;
  return regex.test(phoneNumber);
}

// Example usage
const phoneNumber = "+254712345678"; // Replace with your phone number
const isUSNumber = isFromUS(phoneNumber);

console.log(isUSNumber);
