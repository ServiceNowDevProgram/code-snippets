var LoggingUtils = Class.create();
LoggingUtils.prototype = {
    initialize: function() {
    },

    /**
     * @param {string} message The message to log.
     * @param {string} [type='info'] The type of log. Options: 'info', 'warn', 'error'.
     * @returns {void}
     *
     * This utility function logs a message only if the current instance is non-production.
     * Use it in other server-side scripts like this:
     * var logUtil = new LoggingUtils();
     * logUtil.log('This message will only show in dev and test environments.');
     */
    log: function(message, type) {
        // Get the current instance name from a system property
        var instanceName = gs.getProperty('instance_name');
        
        // You must define your production instance name.
        // For example, if your production instance is 'mycompanyprod'.
        var productionInstanceName = 'mycompanyprod';

        // Check if the current instance name is NOT the production instance name
        if (instanceName && instanceName != productionInstanceName) {
            type = type || 'info';

            // Determine the correct logging function based on the specified type
            switch (type) {
                case 'warn':
                    gs.warn(message);
                    break;
                case 'error':
                    gs.error(message);
                    break;
                default:
                    gs.log(message);
                    break;
            }
        }
    },

    type: 'LoggingUtils'
};
