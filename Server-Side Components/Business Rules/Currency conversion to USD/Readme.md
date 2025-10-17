This script automates the conversion of an annual budget value from a selected currency to USD using exchange rates stored in the fx_rate table. It performs the following steps:

Extracts the currency code from the budget_currency field.
Validates the input amount and currency.
Checks if the currency is already USD; if so, it directly stores the amount.
Queries the fx_currency table to confirm the currency exists.
Retrieves the most recent exchange rate for both the selected currency and USD.
Calculates the converted amount using the formula:
USD Amount = (Original Amount / Source Rate) × USD Rate
Stores the result in the u_annual_budget_usd field.
Includes error handling for missing or invalid data.
