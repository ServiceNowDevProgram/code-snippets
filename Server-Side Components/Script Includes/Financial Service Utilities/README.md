**Financial Service Utilities Script Include**


This Script Include provides a collection of utility functions commonly used in financial services applications. 
It includes functions for calculating interest, formatting currency, and calculating loan payments.

**Functions:**
**calculateInterest(principal, rate, time)**: Calculates simple interest.
principal: The principal amount.
rate: The annual interest rate (in percentage).
time: The time period in years.
Returns the calculated simple interest.

**calculateCompoundInterest(principal, rate, time, compoundingFrequency)**: Calculates compound interest.
principal: The principal amount.
rate: The annual interest rate (in percentage).
time: The time period in years.
compoundingFrequency: The number of times interest is compounded per year.
Returns the calculated compound interest.

**formatCurrency(amount, currencyCode):** Formats a currency amount.
amount: The amount to be formatted.
currencyCode: The currency code (e.g., "USD", "EUR").
Returns the formatted currency amount.

**calculateLoanPayments(principal, rate, term):** Calculates monthly loan payments.
principal: The principal loan amount.
rate: The annual interest rate (in percentage).
term: The loan term in years.
Returns the calculated monthly loan payment.
