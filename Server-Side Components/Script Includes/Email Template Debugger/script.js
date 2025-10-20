var EmailTemplateDebugger = Class.create();
EmailTemplateDebugger.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    initialize: function() {
        this.resultCache = {};
        this.debugLog = [];
        this.startTime = 0;
        this.metrics = {};
    },

    debugTemplate: function(params) {
        try {
            this.startDebugSession();
            
            // Validate input parameters
            if (!this._validateParams(params)) {
                throw new Error('Invalid parameters provided');
            }

            // Get notification template
            var template = this._getNotificationTemplate(params.notificationId);
            this.logDebug('Template retrieved', template);

            // Process variables
            var processedTemplate = this._processVariables(template, params.variables);
            this.logDebug('Variables processed', processedTemplate);

            // Validate recipients
            this._validateRecipients(params.recipientList);
            this.logDebug('Recipients validated', params.recipientList);

            // Check conditions
            if (!this._evaluateConditions(template, params.testRecord)) {
                return this._formatResult('Notification conditions not met', 'warning');
            }

            // Process attachments
            var attachments = this._processAttachments(template, params.testRecord);
            this.logDebug('Attachments processed', attachments);

            // Generate preview
            var preview = this._generatePreview(processedTemplate);
            this.logDebug('Preview generated', preview);

            return this._formatResult('Success', 'success', {
                preview: preview,
                metrics: this.getMetrics(),
                debug: this.getDebugLog()
            });

        } catch (e) {
            return this._formatResult(e.message, 'error', {
                stack: e.stack,
                debug: this.getDebugLog()
            });
        }
    },

    _validateParams: function(params) {
        if (!params || !params.notificationId) {
            return false;
        }
        return true;
    },

    _getNotificationTemplate: function(notificationId) {
        var startTime = new Date().getTime();
        
        var notification = new GlideRecord('sysevent_email_template');
        if (!notification.get(notificationId)) {
            throw new Error('Template not found: ' + notificationId);
        }

        this._addMetric('templateRetrieval', new Date().getTime() - startTime);
        
        return {
            subject: notification.getValue('subject'),
            body: notification.getValue('message_html'),
            plainText: notification.getValue('message'),
            conditions: notification.getValue('condition')
        };
    },

    _processVariables: function(template, variables) {
        var startTime = new Date().getTime();
        
        var processed = {
            subject: template.subject,
            body: template.body,
            plainText: template.plainText
        };

        // Process each variable
        Object.keys(variables || {}).forEach(function(key) {
            var regex = new RegExp('\\$\\{' + key + '\\}', 'g');
            processed.subject = processed.subject.replace(regex, variables[key]);
            processed.body = processed.body.replace(regex, variables[key]);
            processed.plainText = processed.plainText.replace(regex, variables[key]);
        });

        this._addMetric('variableProcessing', new Date().getTime() - startTime);
        
        return processed;
    },

    _validateRecipients: function(recipients) {
        var startTime = new Date().getTime();
        
        if (!recipients || !recipients.length) {
            throw new Error('No recipients specified');
        }

        recipients.forEach(function(email) {
            if (!this._isValidEmail(email)) {
                throw new Error('Invalid email format: ' + email);
            }
        }, this);

        this._addMetric('recipientValidation', new Date().getTime() - startTime);
    },

    _isValidEmail: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    _evaluateConditions: function(template, testRecord) {
        var startTime = new Date().getTime();
        
        if (!template.conditions) {
            return true;
        }

        try {
            var condition = template.conditions;
            var gr = new GlideRecord(testRecord.table);
            gr.get(testRecord.sys_id);
            
            var evaluator = new GlideRecordConditionEvaluator();
            var result = evaluator.evaluateCondition(gr, condition);
            
            this._addMetric('conditionEvaluation', new Date().getTime() - startTime);
            
            return result;
        } catch (e) {
            this.logDebug('Condition evaluation error', e.message);
            return false;
        }
    },

    _processAttachments: function(template, testRecord) {
        var startTime = new Date().getTime();
        
        var attachments = [];
        var gr = new GlideRecord('sys_attachment');
        gr.addQuery('table_sys_id', testRecord.sys_id);
        gr.query();

        while (gr.next()) {
            attachments.push({
                name: gr.getValue('file_name'),
                size: gr.getValue('size_bytes'),
                type: gr.getValue('content_type')
            });
        }

        this._addMetric('attachmentProcessing', new Date().getTime() - startTime);
        
        return attachments;
    },

    _generatePreview: function(processedTemplate) {
        var startTime = new Date().getTime();
        
        var preview = {
            html: this._sanitizeHTML(processedTemplate.body),
            plain: processedTemplate.plainText,
            subject: processedTemplate.subject
        };

        this._addMetric('previewGeneration', new Date().getTime() - startTime);
        
        return preview;
    },

    _sanitizeHTML: function(html) {
        // Basic HTML sanitization
        return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                   .replace(/on\w+="[^"]*"/g, '');
    },

    startDebugSession: function() {
        this.startTime = new Date().getTime();
        this.debugLog = [];
        this.metrics = {};
    },

    logDebug: function(message, data) {
        this.debugLog.push({
            timestamp: new Date().getTime() - this.startTime,
            message: message,
            data: data
        });
    },

    _addMetric: function(name, duration) {
        this.metrics[name] = duration;
    },

    getMetrics: function() {
        var totalTime = new Date().getTime() - this.startTime;
        this.metrics.total = totalTime;
        return this.metrics;
    },

    getDebugLog: function() {
        return this.debugLog;
    },

    _formatResult: function(message, status, data) {
        return {
            message: message,
            status: status,
            timestamp: new Date().getTime(),
            data: data || {}
        };
    },

    type: 'EmailTemplateDebugger'
});