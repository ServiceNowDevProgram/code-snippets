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
     * Process email notification
     * @returns {Object} Result with status and details
     */
    process: function() {
        try {
            if (!this.shouldNotify()) {
                return {
                    success: false,
                    message: 'Notification criteria not met'
                };
            }

            var email = new GlideEmailOutbound();
            email.setSubject(this._buildSubject());
            email.setBody(this._buildBody());
            email.setRecipients(this.emailConfig.recipients || '');
            email.send();

            return {
                success: true,
                message: 'Email notification sent successfully'
            };
        } catch (e) {
            gs.error('EmailNotificationHandler error: ' + e.message);
            return {
                success: false,
                message: 'Error sending notification: ' + e.message
            };
        }
    },

    /**
     * Validate notification criteria
     * @returns {Boolean}
     */
    shouldNotify: function() {
        if (!this.record || !this.record.isValidRecord()) {
            return false;
        }

        // Check if priority is high enough
        var priority = this.record.getValue('priority');
        var minPriority = this.config.minPriority || 3;

        return parseInt(priority) <= parseInt(minPriority);
    },

    /**
     * Build email subject
     * @returns {String}
     * @private
     */
    _buildSubject: function() {
        var template = this.emailConfig.subjectTemplate || 'Notification: ${number}';
        return GlideStringUtil.substitute(template, {
            number: this.record.getDisplayValue('number'),
            short_description: this.record.getDisplayValue('short_description')
        });
    },

    /**
     * Build email body
     * @returns {String}
     * @private
     */
    _buildBody: function() {
        var body = 'Record Details:\n';
        body += 'Number: ' + this.record.getDisplayValue('number') + '\n';
        body += 'Short Description: ' + this.record.getDisplayValue('short_description') + '\n';
        body += 'Priority: ' + this.record.getDisplayValue('priority') + '\n';
        body += 'State: ' + this.record.getDisplayValue('state') + '\n';
        return body;
    },

    /**
     * handles if the implementation needs to run
     * @returns {Boolean} True if implementation will run
     */
    handles: function(notificationSystem) {
        return notificationSystem == "Email";
    },

    type: 'CustomNotificationHandlerInterface'
};