function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }

    // Example: Dynamic behavior when Category changes
    var category = g_form.getValue('category');
    var impact = g_form.getValue('impact');
    var urgency = g_form.getValue('urgency');

    //  Hide or show certain fields dynamically
    if (category === 'hardware') {
        g_form.setVisible('u_serial_number', true);
        g_form.setMandatory('u_serial_number', true);
    } else {
        g_form.setVisible('u_serial_number', false);
        g_form.setMandatory('u_serial_number', false);
    }

    //  Auto-calculate Priority based on Impact & Urgency
    // (Client-only logic — no Script Include needed)
    var priorityMap = {
        '1_1': '1',
        '1_2': '2',
        '1_3': '3',
        '2_1': '2',
        '2_2': '3',
        '2_3': '4',
        '3_1': '3',
        '3_2': '4',
        '3_3': '5'
    };

    var key = impact + '_' + urgency;
    var newPriority = priorityMap[key] || '5';
    g_form.setValue('priority', newPriority);

    //  how a dynamic message when conditions are met
    if (category === 'hardware' && urgency === '1') {
        g_form.showFieldMsg('category', 'Critical hardware issue detected! Escalate immediately.', 'error');
    } else {
        g_form.hideFieldMsg('category');
    }

    //  Prevent invalid data combination (client-side validation)
    if (category === 'software' && impact === '1' && urgency === '1') {
        alert('High impact & urgency for software incidents require manager approval before submission.');
        g_form.setValue('state', ''); // Reset state to stop progression
    }
}
