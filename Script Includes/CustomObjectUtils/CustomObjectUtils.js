var CustomObjectUtils = Class.create();
CustomObjectUtils.prototype = {
	initialize: function(useES12 = false) {
		if (useES12) {
			this.safeAccess = this.safeAccessModern;
		}
	},

	// ====================
	// ES5 Functions
	// ====================

    /**SNDOC
    @name safeAccess
    @description Safely accesses nested object properties.
    @param {Object} obj - The object to access.
    @param {string} path - The dot-separated path to the property.
    @returns {*} The accessed value or false if not found.
 
    @example
    var myObj = { a: { b: { c: 42 } } };
    safeAccess(myObj, 'a.b.c');
    // Returns: 42
    */
    safeAccess: function(obj, path) {
        var parts = path.split('.');
        for (var i = 0; i < parts.length; i++) {
            if (obj && obj.hasOwnProperty(parts[i])) {
                obj = obj[parts[i]];
            } else {
                return false;
            }
        }
        return obj;
    },
	

	// ====================
	// ECMAScript 2021 (ES12)
	// ====================

   /**SNDOC
    @name safeAccessModern
    @description Safely accesses nested object properties.
    @param {Object} obj - The object to access.
    @param {string} path - The dot-separated path to the property.
    @returns {*} The accessed value or false if not found.
 
    @example
    const myObj = { a: { b: { c: 42 } } };
    safeAccess(myObj, 'a.b.c');
    // Returns: 42
    */
    safeAccessModern: function(obj, path) {
        const value = path.split('.').reduce((o, key) => o?.[key], obj);
        return value ?? false;
    },

	
	type: 'CustomObjectUtils'
};