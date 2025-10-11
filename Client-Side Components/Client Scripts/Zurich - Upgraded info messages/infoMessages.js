function onLoad() {
    var state = g_form.getValue('state'); //Get value of 'state' field

    if (state != '6' && state != '7' && state != '8') {
        var priority = g_form.getValue('priority'); // Get value of 'priority' field
        switch (priority) {
            case '1':
                g_form.addErrorMessage('Critical Incident'); 
                break; 
            case '2':
                g_form.addHighMessage('High Priority Incident'); // addHighMessage() method will display message in orange color
                break;
            case '3':
                g_form.addModerateMessage('Medium Priority Incident'); // addModerateMessage() method will display message in purple color
                break;
            case '4':
                g_form.addLowMessage('Low Priority Incident'); // addLowMessage() method will display message in grey color
                break;
        }
    } else if (state == '6' || state == '7') {
        g_form.addSuccessMessage('Incident closed'); // addSuccessMessage() method will display message in green color
    }
}
