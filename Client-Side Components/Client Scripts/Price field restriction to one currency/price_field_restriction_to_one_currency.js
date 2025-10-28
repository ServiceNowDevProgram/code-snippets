function onLoad(){
    // Remove all currency options
    g_form.clearOptions('<price_field>.currency_type');

    // Add only one currency option (e.g., USD)
    g_form.addOption('<price_field>.currency_type', 'USD', '$');

    // Set the currency field to the only available option
    g_form.setValue('<price_field>.currency_type', 'USD');
}