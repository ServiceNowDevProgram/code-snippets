function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') {
        return;
    }

    // Get the value of the Delivery Method field
    var deliveryMethod = g_form.getValue('delivery_method');

    // Show or hide the Delivery Date field based on the Delivery Method value
    if (deliveryMethod === 'express') {
        g_form.setDisplay('delivery_date', true);
    } else {
        g_form.setDisplay('delivery_date', false);
    }
}
