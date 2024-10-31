function onLoad() {
    // the value of priority
    var priority = g_form.getValue('priority');

    if (priority == '1') { // for critical
        // Highlight the Priority field in red
        g_form.setFieldStyle('priority', 'background-color', 'red');
        g_form.setFieldStyle('priority', 'color', 'white'); // Optional: change text color for visibility
    } else {
        // Reset to default if not high priority
        g_form.setFieldStyle('priority', 'background-color', '');
        g_form.setFieldStyle('priority', 'color', '');
    }
}
