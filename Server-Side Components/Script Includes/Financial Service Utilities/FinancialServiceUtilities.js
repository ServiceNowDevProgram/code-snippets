var FinancialServiceUtilities = Class.create();
FinancialServiceUtilities.prototype = {
    initialize: function() {
    },

    /**
     * Calculates simple interest.
     *
     * @param {number} principal - The principal amount.
     * @param {number} rate - The annual interest rate (in percentage).
     * @param {number} time - The time period in years.
     * @returns {number} The calculated simple interest.
     */
    calculateInterest: function(principal, rate, time) {
        // Simple interest calculation
        return (principal * rate * time) / 100;
    },

    /**
     * Calculates compound interest.
     *
     * @param {number} principal - The principal amount.
     * @param {number} rate - The annual interest rate (in percentage).
     * @param {number} time - The time period in years.
     * @param {number} compoundingFrequency - The number of times interest is compounded per year.
     * @returns {number} The calculated compound interest.
     */
    calculateCompoundInterest: function(principal, rate, time, compoundingFrequency) {
        // Compound interest calculation
        var compoundInterest = principal * Math.pow(1 + (rate / compoundingFrequency), compoundingFrequency * time);
        return compoundInterest - principal;
    },

    /**
     * Formats a currency amount.
     *
     * @param {number} amount - The amount to be formatted.
     * @param {string} currencyCode - The currency code (e.g., "USD", "EUR").
     * @returns {string} The formatted currency amount.
     */
    formatCurrency: function(amount, currencyCode) {
        // Format the amount as currency
        return gs.formatNumber(amount, currencyCode);
    },

    /**
     * Calculates monthly loan payments.
     *
     * @param {number} principal - The principal loan amount.
     * @param {number} rate - The annual interest rate (in percentage).
     * @param {number} term - The loan term in years.
     * @returns {number} The calculated monthly loan payment.
     */
    calculateLoanPayments: function(principal, rate, term) {
        // Calculate monthly loan payments (assuming monthly compounding)
        var monthlyInterestRate = rate / 12 / 100;
        var numberOfPayments = term * 12;
        var monthlyPayment = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        return monthlyPayment;
    },

    type: 'FinancialServiceUtilities'
};
