function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;
  
    var passportNumber = g_form.getValue('passport_number');
    var dateOfIssue = g_form.getValue('date_of_issue');
    var age = parseInt(g_form.getValue('age'), 10);
    var dateOfExpiry = g_form.getValue('date_of_expiry');
  
    // Passport Number Validation
    var passportPattern = /^[A-Z][1-9][0-9][A-Z0-9]{5}$/;
    if (passportNumber && !passportPattern.test(passportNumber)) {
        g_form.showFieldMsg('passport_number', "The entered number is invalid passport number format. It must be 8 characters long, start with an uppercase letter, followed by a number between 1-9, then 0-9, and the rest alphanumeric.", "error");
        g_form.clearValue('passport_number');
    } else {
        g_form.hideFieldMsg('passport_number');
    }
  
    // Date of Expiry Calculation based on date of issue
    if (dateOfIssue && age) {
        var issueDate = new GlideDate();
        issueDate.setValue(dateOfIssue);
        var expiryDate = new GlideDate();
        expiryDate.setValue(issueDate);
      
        if (age >= 18) {
            expiryDate.addYears(5); // Adult - add 5 years
        } else {
            expiryDate.addYears(10); // Under 18 - add 10 years
        }
      
        g_form.setValue('date_of_expiry', expiryDate.getByFormat('yyyy-MM-dd')); // Set expiry date in correct format
        g_form.hideFieldMsg('date_of_expiry');
    } else if (!dateOfIssue) {
        g_form.showFieldMsg('date_of_issue', "Please enter the Date of Issue first.", "info");
    } else if (!age) {
        g_form.showFieldMsg('age', "Please enter your age first.", "info");
    }
}
