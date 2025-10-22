function onSubmit() {
    var cardNumber = g_form.getValue('credit_card'); // Change 'credit_card' to your field name
    var cardPattern = /^\d{16}$/; // Simple pattern for 16-digit cards

    if (!cardPattern.test(cardNumber) || !isValidCardNumber(cardNumber)) {
        g_form.showFieldMsg('credit_card', 'Please enter a valid 16-digit credit card number.', 'error');
        return false;
    }
    return true;
}

function isValidCardNumber(number) {
    var sum = 0;
    var alternate = false;
    for (var i = number.length - 1; i >= 0; i--) {
        var n = parseInt(number.charAt(i), 10);
        if (alternate) {
            n *= 2;
            if (n > 9) n -= 9;
        }
        sum += n;
        alternate = !alternate;
    }
    return sum % 10 === 0;
}
