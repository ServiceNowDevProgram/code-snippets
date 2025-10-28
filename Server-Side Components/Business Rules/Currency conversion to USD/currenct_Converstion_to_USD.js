(function executeRule(current, previous /*null when async*/) {

    // Extract the first 3 characters of the budget currency code (e.g., "INR", "EUR")
    var currencyCode = current.budget_currency ? current.budget_currency.toString().substring(0, 3) : '';

    // Convert the annual budget value to a float
    var amount = parseFloat(current.annual_budget);

    // Validate input: If currency code is missing or amount is not a valid number, clear the USD field and exit
    if (!currencyCode || isNaN(amount)) {
        current.u_annual_budget_usd = '';
        return;
    }

    // If the currency is already USD, no conversion needed — store the original amount
    if (currencyCode === 'USD') {
        current.u_annual_budget_usd = amount;
        return;
    }

    // Check if the currency exists in the fx_currency table
    var currencyGR = new GlideRecord('fx_currency');
    currencyGR.addQuery('code', currencyCode);
    currencyGR.query();

    // If currency is not found, clear the USD field and exit
    if (!currencyGR.next()) {
        current.u_annual_budget_usd = '';
        return;
    }

    // Get the latest exchange rate for the selected currency from fx_rate table
    var fxGR = new GlideRecord('fx_rate');
    fxGR.addQuery('currency.code', currencyCode);
    fxGR.orderByDesc('sys_updated_on'); // Sort by most recent update
    fxGR.setLimit(1); // Limit to the latest record
    fxGR.query();

    // If no exchange rate found, clear the USD field and exit
    if (!fxGR.next()) {
        current.u_annual_budget_usd = '';
        return;
    }

    var rate = parseFloat(fxGR.getValue('rate')); // Exchange rate for selected currency

    // Get the latest exchange rate for USD from fx_rate table
    var fxGR1 = new GlideRecord('fx_rate');
    fxGR1.addQuery('currency.code', 'USD');
    fxGR1.orderByDesc('sys_updated_on'); // Sort by most recent update
    fxGR1.setLimit(1); // Limit to the latest record
    fxGR1.query();

    // If no USD exchange rate found, clear the USD field and exit
    if (!fxGR1.next()) {
        current.u_annual_budget_usd = '';
        return;
    }

    var usdRate = parseFloat(fxGR1.getValue('rate')); // USD base rate

    // Perform conversion only if both rates are valid and non-zero
    if (!isNaN(rate) && !isNaN(usdRate) && rate !== 0) {
        var convertedAmount = (amount / rate) * usdRate; // Convert to USD
        current.u_annual_budget_usd = convertedAmount; // Store the converted value
    } else {
        gs.info("Invalid exchange rate values");
        current.u_annual_budget_usd = '';
    }

})(current, previous);
``
