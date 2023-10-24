var RegexUtils = Class.create();
RegexUtils.prototype = {
    initialize: function() {},

    /**
     * 
     * @param {String} text that tokens to be replaced in 
     * @param {String} Token to be replaced
     * @param {String} replaceTo 
     * @returns Returns new text with updated token
     * 
     * NB: This is case in-sensitive
     */
    replaceAllIgnoreCase: function(text, replaceFrom, replaceTo) {
        var regEx = new RegExp(replaceFrom, "ig");
        return text.replace(regEx, replaceTo);
    },

    /**
     * 
     * @param {String} text that tokens to be replaced in 
     * @param {String} Token to be replaced
     * @param {String} replaceTo 
     * @returns Returns new text with updated token
     * 
     * NB: This is case sensitive
     */
    replaceAllMatchCase: function(text, replaceFrom, replaceTo) {
        var regEx = new RegExp(replaceFrom, "g");
        return text.replace(regEx, replaceTo);
    },

    /**
     * 
     * @param {String} field to find the value for 
     * @param {String} text that contains a list of fields and values 
     * @returns returns field values
     * 
     * Example text:
     * 
     * Name: rahman mahmoodi
     * Position: Tech
     * Company: ValueFlow
     * 
     * findFieldValue("Position", text)
     */
    findFieldValue: function(field, text) {
        return this._findFeildValue(field, text, ":");
    },

    /**
     * 
     * @param {String} field to find the value for 
     * @param {String} text that contains a list of fields and values 
     * @param {String} delimiter to be used to split the string based
     * @returns returns field values
     * 
     * Example text:
     * 
     * Name: rahman mahmoodi
     * Position: Tech
     * Company: ValueFlow
     * 
     * findFieldValue("Position", text, ":")
     */
    findFieldValue: function(field, text, delimiter) {
        return this._findFeildValue(field, text, delimiter);
    },

    _findFeildValue: function(field, text, delimiter) {
        if (!field || !text || !delimiter) return "";

        var result = '';
        var regExp = new RegExp(field + delimiter + '(.*)', 'g');
        var match = text.match(regExp);
        if (match && match.length > 0) {
            var fieldList = match[0].split(delimiter);
            if (fieldList.length > 1) {
                result = fieldList[1].replace(/[\[\]]/g, '');
                result = result.trim();
            }
        }

        return result;
    },

    /**
     * 
     * @param {String} email to validate 
     * @returns returns true if valid email
     */
    isValidEmail: function(email) {
        if (!email) return false;
        var pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(email.toLowerCase());
    },

    /**
     * 
     * @param {number} number to validate 
     * @returns returns true if the number is a positive integer
     */
    isInteger: function(number) {
        if (!number) return false;
        var regex = /^\d+$/;
        return regex.test(number);
    },

    /**
     * 
     * @param {number} number to validate 
     * @returns returns true if the number is a decimal digit
     * 
     * NB: This will match all the numbers in the form of 
     * 
     * 	3.14529, -255.34, 128, 1.9e10, 123,340.00
     */
    isDecimal: function(number) {
        if (!number) return false;
        var regex = /^-?\d+(,\d+)*(\.\d+(e\d+)?)?$/;
        return regex.test(number);
    },

    /**
     * 
     * @param {String} password to validate 
     * @returns returns true if the password contains One or More Upper, one or more Lower, and one or more Special character,
     * one or more numbers, and minimum of 8 characters
     * 
     * Example: Pa$$word1!
     */
    isStrongPassword: function(password) {
        if (!password) return false;
        // positive look ahead to check for each condition
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    },

    /**
     * 
     * @param {Regex} regex : regex to execute. Regex should include groups
     * @param {string} text : text to execute the regex on 
     * @returns returns an array of all groups identified via regex
     * Example: var reg = new RegexUtils();
     * var groups = reg.executeGroups(/(\d{4})(\d{3})(\d{3})/gm, "0423394881");
	 *
	 * Or find all numbers in a string
	 * var reg = new RegexUtils();
	 * var result = reg.executeGroups(/\b\d+\b/g, 'A string with 3 numbers in it... 42 and 88.');
     */
    executeGroups: function(regex, text) {
        if (!regex || !text) return null;

        var groups = [];

        while ((m = regex.exec(text)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach(function(match, groupIndex) {
                if (match) {
                    groups.push(match);
                }
            });
        }

        return groups;
    },

    type: 'RegexUtils'
};