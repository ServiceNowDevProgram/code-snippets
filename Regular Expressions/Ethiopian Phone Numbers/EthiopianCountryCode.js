//Check for ethiopian country code
function isFromEthiopia(phoneNumber) {
  const regex = /^(\+251|0)(9)([0-9]{8})$/;
  return regex.test(phoneNumber);
}

// Example usage
const phoneNumber = "+251912345678"; // Replace with your phone number
const isEthiopianNumber = isFromEthiopia(phoneNumber);

console.log(isEthiopianNumber);
