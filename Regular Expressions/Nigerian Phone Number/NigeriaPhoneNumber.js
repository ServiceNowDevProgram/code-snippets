//Check for Nigerian country code
function isFromNigerian(phoneNumber) {
  const regex = /^(\+234|0)([789]\d{9})$/;
  return regex.test(phoneNumber);
}

// Example Nigerian
const phoneNumber = "+2348123456789"; // Replace with your phone number
const isNigerianNumber = isFromNigerian(phoneNumber);

console.log(isNigerianNumber);
