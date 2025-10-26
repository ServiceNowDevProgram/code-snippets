var DeveloperDebugUtility = Class.create();
DeveloperDebugUtility.prototype = {
    initialize: function() {},

    // Checks if debug logging is enabled via system property
    
    _enable_debug: function() {
        // System Property: enable_debug_for_scripts (true/false)
        return gs.getProperty('enable_debug_for_scripts') == 'true';
    },

     // Controlled debug logger
     // {String} message - The message to log
    _debug: function(message) {
        if (this._enable_debug()) {
            gs.info('[DEBUG LOG] ' + message);
        }
    },

     // Example function where controlled debugging can be used
    addFunction: function(data) {
        try {
            // Example logic: simulate some operation
            this._debug('Executing addFunction with data: ' + JSON.stringify(data));

            // core logic here
           
            this._debug('addFunction executed successfully.');
        } catch (e) {
            this._debug('Error executing addFunction:\n' + e);
        }
    },

    type: 'DeveloperDebugUtility'
};
