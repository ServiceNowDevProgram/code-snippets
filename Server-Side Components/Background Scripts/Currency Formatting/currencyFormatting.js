var amount = '9123456.123456789';
var currencyCode = 'EUR';
var formatString = '%s%v %c';
var exchangeValue = new sn_currency.GlideCurrencyFormatter(formatString);
exchangeValue.setLocale("en", "EN"); // Language = en Country = EN

gs.info('Formatted currency: ' + exchangeValue.setMaxFractionDigits(1).format(amount, currencyCode));
// expected output: Formatted currency: €9,123,456.1 EUR

amount = '9123456.127456789';
currencyCode = 'HUF';
formatString = '%v %c';
exchangeValue = new sn_currency.GlideCurrencyFormatter(formatString);
exchangeValue.setLocale("hu", "HU"); // Language = hu Country = HU

gs.info('Formatted currency: ' + exchangeValue.setMaxFractionDigits(2).format(amount, currencyCode));
// expected output: Formatted currency: 9 123 456,13 HUF
