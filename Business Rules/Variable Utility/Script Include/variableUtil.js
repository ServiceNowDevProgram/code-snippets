// Script Include: variableUtil
// Provides utility methods for variable validation and logging in ServiceNow scripts.
var variableUtil = Class.create();
variableUtil.prototype = {
    // Initialize the variableUtil class. Place for any setup logic needed for the utility.
    initialize: function() {},

    // Validates a variable's existence to reduce the risk of runtime errors.
    validateVariable: function(value) {
        return value !== null && value !== undefined;
    },

    // Logs variable states for debugging and categorizes the log based on its level.
    logVariable: function(entry, value, level) {
        level = level || 'info';
        var displayValue = value === null ? "NULL" : value === "" ? "EMPTY" : value;
        var logMessage = '[VariableUtil] ' + entry + ' has value: ' + displayValue + ' (Type: ' + typeof value + ')';
        switch (level) {
            case 'warn':
                gs.warn(logMessage);
                break;
            case 'error':
                logMessage = "[VariableUtil] Error Thrown:\n" + logMessage;
                gs.error(logMessage);
                throw new Error(logMessage);
            default:
                gs.info(logMessage);
        }
    },

    // Validates a variable's type to ensure type safety.
    validateType: function(value, expectedType) {
        return typeof value === expectedType;
    },

    // Validates an array variable and its length to ensure data integrity.
    validateArray: function(value, minLength) {
        minLength = minLength || 0;
        return Array.isArray(value) && value.length >= minLength;
    },

    // Conditionally transforms a variable, allowing for optional data manipulation.
    transformIfValid: function(value, transformFn) {
        return this.validateVariable(value) ? transformFn(value) : null;
    },

    // Validates and sets a variable with a fallback, ensuring a safe value is always set.
    validateAndSet: function(value) {
        return this.validateVariable(value) ? value : 'Variable does not exist or has no value';
    },

    type: 'variableUtil'
};