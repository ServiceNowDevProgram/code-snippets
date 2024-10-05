// Function to validate if the password and confirm password match
function validatePassword(password, confirmPassword) {
  // Check if the password and confirm password are the same
    if (password === confirmPassword) {
        return true; // Passwords match
    } else {
        return false; // Passwords do not match
    }
}

// Example usage
const password = 'yourPassword@123';
const confirmPassword = 'yourPassword@123';

// Check if the passwords match and log the result
if (validatePassword(password, confirmPassword)) {
    console.log('Passwords match');
} else {
    console.log('Passwords do not match');
}

