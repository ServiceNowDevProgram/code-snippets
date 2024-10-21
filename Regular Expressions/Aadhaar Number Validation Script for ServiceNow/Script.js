function isValidAadhaar(aadhaarNumber) {
    // Check if the Aadhaar number is exactly 12 digits and does not start with 0
    const aadhaarRegex = /^(?!0)\d{12}$/;

    if (!aadhaarRegex.test(aadhaarNumber)) {
        return false;
    }

    // Verhoeff algorithm to check the validity
    const verhoeffTable = [
        [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]],
        [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [2, 3, 4, 5, 6, 7, 8, 9, 0, 1]],
        
    ];

    function verhoeffChecksum(number) {
        let c = 0;
        const num = number.split('').reverse().map(Number);
        for (let i = 0; i < num.length; i++) {
            for (let j = 0; j < verhoeffTable.length; j++) {
                c = verhoeffTable[c][(i % 8)][num[i]];
            }
        }
        return c === 0;
    }

    return verhoeffChecksum(aadhaarNumber);
}

function onChangeAadhaarNumber(control, oldValue, newValue) {
    if (newValue && !isValidAadhaar(newValue)) {
        g_form.showFieldMsg(control, "Invalid Aadhaar number. Please enter a valid 12-digit number that does not start with 0.", "error");
        g_form.setValue(control, ""); // Optionally clear the field
    }
}


