/**
 * DataNormalizer Script Include
 * ----------------------------------------------------------------
 * Provides reusable utility functions to standardize and sanitize
 * common data fields such as names, emails, phone numbers, addresses,
 * and dates. Supports both server-side and client-side (GlideAjax)
 * for flexible integration across multiple modules.
 * ----------------------------------------------------------------
 */

var DataNormalizer = Class.create();
DataNormalizer.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    initialize: function() {
        this.debug = true; // Toggle debug logging
    },

    /**
     * Logs structured error messages to system logs.
     * @param {String} method - Method name where the error occurred.
     * @param {Object} error - JavaScript error object.
     * @param {Object} [context] - Optional additional context data.
     */
    logError: function(method, error, context) {
        gs.error('[DataNormalizer] Error in {0}: {1} | Context: {2}',
            method, error.message, JSON.stringify(context || {}));
    },

    /**
     * Logs informational messages when debug mode is enabled.
     * @param {String} message - The message to log.
     */
    logInfo: function(message) {
        if (this.debug)
            gs.info('[DataNormalizer] {0}', message);
    },

    /**
     * Normalizes personal names by removing special characters
     * and applying proper case formatting.
     * Example: "JOHN DOE" → "John Doe"
     *
     * @param {String} name - Input name value.
     * @returns {String} - Normalized name.
     */
    normalizeName: function(name) {
        try {
            if (!name) return '';
            name = name.trim().replace(/[^a-zA-Z\s]/g, '');
            var formatted = name.split(/\s+/)
                .map(function(w) {
                    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
                })
                .join(' ');
            this.logInfo('normalizeName: "' + name + '" → "' + formatted + '"');
            return formatted;
        } catch (e) {
            this.logError('normalizeName', e, { name: name });
            return name;
        }
    },

    /**
     * Normalizes email addresses by trimming whitespace,
     * converting to lowercase, and removing invalid characters.
     *
     * @param {String} email - Input email value.
     * @returns {String} - Normalized email.
     */
    normalizeEmail: function(email) {
        try {
            if (!email) return '';
            var clean = email.trim().toLowerCase().replace(/[,;]+/g, '');
            this.logInfo('normalizeEmail: "' + email + '" → "' + clean + '"');
            return clean;
        } catch (e) {
            this.logError('normalizeEmail', e, { email: email });
            return email;
        }
    },

    /**
     * Standardizes phone numbers by removing non-numeric characters
     * and adding country codes where applicable.
     *
     * @param {String} phone - Input phone number.
     * @param {String} [defaultCountryCode] - Optional default country code (e.g., "91").
     * @returns {String} - Normalized phone number.
     */
    normalizePhone: function(phone, defaultCountryCode) {
        try {
            if (!phone) return '';
            var digits = phone.replace(/\D/g, '');
            var result;

            if (digits.length == 10 && defaultCountryCode)
                result = '+' + defaultCountryCode + ' ' + digits;
            else if (digits.length > 10 && digits.startsWith('91'))
                result = '+' + digits.slice(0, 2) + ' ' + digits.slice(2);
            else
                result = '+' + digits;

            this.logInfo('normalizePhone: "' + phone + '" → "' + result + '"');
            return result;
        } catch (e) {
            this.logError('normalizePhone', e, { phone: phone });
            return phone;
        }
    },

    /**
     * Cleans and formats postal addresses by removing excess spaces
     * and applying title case to each word.
     *
     * @param {String} address - Input address text.
     * @returns {String} - Normalized address.
     */
    normalizeAddress: function(address) {
        try {
            if (!address) return '';
            address = address.trim().replace(/\s{2,}/g, ' ');
            var result = address.split(' ')
                .map(function(w) {
                    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
                })
                .join(' ');
            this.logInfo('normalizeAddress: "' + address + '" → "' + result + '"');
            return result;
        } catch (e) {
            this.logError('normalizeAddress', e, { address: address });
            return address;
        }
    },

    /**
     * Converts date strings into system-standard display format
     * using GlideDateTime APIs.
     *
     * @param {String} dateStr - Input date string.
     * @returns {String} - Normalized date in display format.
     */
    normalizeDate: function(dateStr) {
        try {
            if (!dateStr) return '';
            var gdt = new GlideDateTime(dateStr);
            var formatted = gdt.getDate().getDisplayValue();
            this.logInfo('normalizeDate: "' + dateStr + '" → "' + formatted + '"');
            return formatted;
        } catch (e) {
            this.logError('normalizeDate', e, { date: dateStr });
            return dateStr;
        }
    },

    /**
     * Generic text cleanup. Removes invalid placeholders such as
     * 'N/A', '--', or empty values.
     *
     * @param {String} value - Input text value.
     * @returns {String} - Cleaned text.
     */
    cleanValue: function(value) {
        try {
            if (!value) return '';
            var cleaned = value.trim();
            var invalid = ['n/a', 'none', 'na', '-', '--'];
            if (invalid.indexOf(cleaned.toLowerCase()) > -1) return '';
            this.logInfo('cleanValue: "' + value + '" → "' + cleaned + '"');
            return cleaned;
        } catch (e) {
            this.logError('cleanValue', e, { value: value });
            return value;
        }
    },

    /**
     * Dynamically detects field type and applies the corresponding
     * normalization method.
     *
     * @param {String} fieldName - The field name or label.
     * @param {String} value - The value to normalize.
     * @returns {String} - Normalized value.
     */
    smartNormalize: function(fieldName, value) {
        try {
            if (!value) return '';
            var field = fieldName.toLowerCase();
            var result;

            if (field.indexOf('email') >= 0)
                result = this.normalizeEmail(value);
            else if (field.indexOf('phone') >= 0 || field.indexOf('mobile') >= 0)
                result = this.normalizePhone(value, '91');
            else if (field.indexOf('name') >= 0)
                result = this.normalizeName(value);
            else if (field.indexOf('address') >= 0)
                result = this.normalizeAddress(value);
            else if (field.indexOf('date') >= 0)
                result = this.normalizeDate(value);
            else
                result = this.cleanValue(value);

            this.logInfo('smartNormalize: Field=' + fieldName + ', Result=' + result);
            return result;
        } catch (e) {
            this.logError('smartNormalize', e, { fieldName: fieldName, value: value });
            return value;
        }
    },

    /**
     * Client-callable method exposed via GlideAjax.
     * Accepts parameters from client scripts and returns
     * normalized values synchronously.
     *
     * @returns {String} - Normalized value for client-side use.
     */
    normalizeFromClient: function() {
        try {
            var field = this.getParameter('sysparm_fieldName');
            var value = this.getParameter('sysparm_value');
            var normalized = this.smartNormalize(field, value);
            return normalized;
        } catch (e) {
            this.logError('normalizeFromClient', e, { field: field, value: value });
            return value;
        }
    },

    type: 'DataNormalizer'
});
