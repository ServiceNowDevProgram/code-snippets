function checkPasswordStrength(password) {
    // Define regular expressions for different password strength criteria
    const lengthRegex = /.{8,}/; // At least 8 characters
    const lowercaseRegex = /[a-z]/; // At least one lowercase letter
    const uppercaseRegex = /[A-Z]/; // At least one uppercase letter
    const digitRegex = /[0-9]/; // At least one digit
    const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/; // At least one special character

    // Check each strength criteria
    const isLengthValid = lengthRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasUppercase = uppercaseRegex.test(password);
    const hasDigit = digitRegex.test(password);
    const hasSpecialCharacter = specialCharacterRegex.test(password);

    // Calculate the overall strength score
    let strength = 0;
    if (isLengthValid) strength += 20;
    if (hasLowercase) strength += 20;
    if (hasUppercase) strength += 20;
    if (hasDigit) strength += 20;
    if (hasSpecialCharacter) strength += 20;

    // Determine the password strength level
    let strengthLevel;
    if (strength < 60) {
        strengthLevel = "Weak";
    } else if (strength < 80) {
        strengthLevel = "Moderate";
    } else {
        strengthLevel = "Strong";
    }

    return {
        strengthLevel,
        strengthScore: strength,
    };
}

// Example usage
const password = "MyP@ssw0rd";
const result = checkPasswordStrength(password);
console.log(`Password Strength: ${result.strengthLevel}`);
console.log(`Strength Score: ${result.strengthScore}`);
