(function executeRule(current, g_form, g_user, g_scratchpad) {
    var fieldName = 'short_description'; // Change to your field name
    var maxChars = 500;

    // Create a span element for character count
    var charCounterId = 'char-counter-' + fieldName;
    if (!document.getElementById(charCounterId)) {
        var counterSpan = document.createElement('span');
        counterSpan.id = charCounterId;
        counterSpan.style.fontSize = '12px';
        counterSpan.style.color = '#555';
        var fieldElement = g_form.getControl(fieldName);
        fieldElement.parentNode.appendChild(counterSpan);
    }

    // Update character count on keyup
    var fieldElement = g_form.getControl(fieldName);
    fieldElement.addEventListener('keyup', function () {
        var currentLength = fieldElement.value.length;
        var counterSpan = document.getElementById(charCounterId);
        counterSpan.textContent = currentLength + ' / ' + maxChars + ' characters';

        // Show warning if limit exceeded
        if (currentLength > maxChars) {
            counterSpan.style.color = 'red';
            g_form.addErrorMessage('Character limit exceeded! Please shorten your text.');
            g_form.setSubmit(false); // Block submit
        } else {
            counterSpan.style.color = '#555';
            g_form.clearMessages();
            g_form.setSubmit(true);
        }
    });
})(current, g_form, g_user, g_scratchpad);
