var SmartFormValidationUtils = Class.create();
SmartFormValidationUtils.prototype = {
    initialize: function() {},

    isValidEmail: function(email) {
        if (!email) return false;
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    isNumeric: function(val) {
        if (val === null || val === undefined) return false;
        return /^-?\d+(\.\d+)?$/.test(String(val));
    },

    isFutureDate: function(dateStr) {
        if (!dateStr) return false;
        try {
            var date = new GlideDateTime(dateStr);
            var now = new GlideDateTime();
            return date.getNumericValue() > now.getNumericValue();
        } catch (e) {
            return false;
        }
    },

    passwordStrengthScore: function(password) {
        if (!password) return 0;
        var score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[@$!%*#?&]/.test(password)) score++;
        return score; // 0-5
    },

    normalizePhoneNumber: function(phone) {
        if (!phone) return '';
        return phone.replace(/[^0-9+]/g, '');
    },

    // Simple IP address validator
    isValidIP: function(ip) {
        if (!ip) return false;
        var parts = ip.split('.');
        if (parts.length !== 4) return false;
        for (var i = 0; i < 4; i++) {
            var p = parseInt(parts[i], 10);
            if (isNaN(p) || p < 0 || p > 255) return false;
        }
        return true;
    },

    type: 'SmartFormValidationUtils'
};