var CustomNotificationHandlerInterface = Class.create();
CustomNotificationHandlerInterface.prototype = {
    /**
     * Initialize the notification handler
     * @param {GlideRecord} record - The record triggering the notification
     * @param {Object} config - Configuration object
     */
    initialize: function(record, config) {
        this.record = record;
        this.config = config || {};
    },

    /**
     * Process the notification
     * @returns {Object} Result object with status and message
     */
    process: function() {
        throw new Error('process() must be implemented by extension');
    },

    /**
     * Validate if notification should be sent
     * @returns {Boolean} True if notification should be sent
     */
    shouldNotify: function() {
        throw new Error('shouldNotify() must be implemented by extension');
    },

	/**
     * handles if the implementation needs to run
     * @returns {Boolean} True if implementation will run
     */
    handles: function(notificationSystem) {
        return notificationSystem == "DEFAULT";
    },

    type: 'CustomNotificationHandlerInterface'
};
