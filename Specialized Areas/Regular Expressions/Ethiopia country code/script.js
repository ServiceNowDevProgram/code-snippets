// check for ethiopian country code
const regex = /^(\+251|0)(9)([0-9]{8})$/;

function isFromEthiopia(phoneNumber) {
  return regex.test(phoneNumber);
}

// Example usage
const phoneNumber = "+251912345678"; // Replace with an Ethiopian phone number

// isFromEthiopia returns true if the number is from ethiopia
if (isFromEthiopia(phoneNumber)) {
  console.log(`Is an Ethiopian phone number`);
} else {
  console.log(`Is not Ethiopian phone number`);
}
