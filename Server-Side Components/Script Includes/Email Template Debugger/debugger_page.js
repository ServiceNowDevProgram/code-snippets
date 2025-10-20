// Client-side debugger interface
var g_emailDebugger = Class.create({
    initialize: function() {
        this.debuggerUI = this._createDebuggerUI();
        this.currentTemplate = null;
        this._attachEventHandlers();
    },

    _createDebuggerUI: function() {
        var container = new Element('div', {
            'class': 'email-debugger-container'
        });

        // Create header
        var header = new Element('div', {
            'class': 'debugger-header'
        });
        header.insert(new Element('h2').update('Email Template Debugger'));
        container.insert(header);

        // Create main content area
        var content = new Element('div', {
            'class': 'debugger-content'
        });

        // Template selector
        content.insert(this._createTemplateSelector());

        // Test data section
        content.insert(this._createTestDataSection());

        // Preview section
        content.insert(this._createPreviewSection());

        // Debug log section
        content.insert(this._createDebugSection());

        container.insert(content);

        // Add styles
        this._addStyles();

        return container;
    },

    _createTemplateSelector: function() {
        var section = new Element('div', {
            'class': 'debugger-section'
        });

        section.insert(new Element('h3').update('Select Template'));

        var selector = new Element('select', {
            'class': 'template-selector'
        });
        this._loadTemplates(selector);

        section.insert(selector);
        return section;
    },

    _createTestDataSection: function() {
        var section = new Element('div', {
            'class': 'debugger-section'
        });

        section.insert(new Element('h3').update('Test Data'));

        // Record selector
        var recordInput = new Element('input', {
            'type': 'text',
            'placeholder': 'Record sys_id',
            'class': 'test-record-input'
        });
        section.insert(recordInput);

        // Variables editor
        var variablesEditor = new Element('textarea', {
            'class': 'variables-editor',
            'placeholder': 'Enter test variables in JSON format'
        });
        section.insert(variablesEditor);

        // Test button
        var testButton = new Element('button', {
            'class': 'test-button'
        }).update('Test Template');
        section.insert(testButton);

        return section;
    },

    _createPreviewSection: function() {
        var section = new Element('div', {
            'class': 'debugger-section preview-section'
        });

        section.insert(new Element('h3').update('Preview'));

        // View toggles
        var toggles = new Element('div', {
            'class': 'view-toggles'
        });
        toggles.insert(new Element('button', {
            'class': 'toggle-html active'
        }).update('HTML'));
        toggles.insert(new Element('button', {
            'class': 'toggle-plain'
        }).update('Plain Text'));
        section.insert(toggles);

        // Preview iframe
        var preview = new Element('iframe', {
            'class': 'preview-frame'
        });
        section.insert(preview);

        return section;
    },

    _createDebugSection: function() {
        var section = new Element('div', {
            'class': 'debugger-section debug-section'
        });

        section.insert(new Element('h3').update('Debug Log'));

        var log = new Element('div', {
            'class': 'debug-log'
        });
        section.insert(log);

        return section;
    },

    _loadTemplates: function(selector) {
        // Load available email templates
        var ga = new GlideAjax('EmailTemplateDebugger');
        ga.addParam('sysparm_name', 'getTemplateList');
        ga.getXMLAnswer(function(answer) {
            var templates = JSON.parse(answer);
            templates.forEach(function(template) {
                selector.insert(new Element('option', {
                    'value': template.sys_id
                }).update(template.name));
            });
        });
    },

    _attachEventHandlers: function() {
        var self = this;

        // Template selection
        this.debuggerUI.down('.template-selector').observe('change', function(e) {
            self._loadTemplate(e.target.value);
        });

        // Test button
        this.debuggerUI.down('.test-button').observe('click', function() {
            self._runTest();
        });

        // View toggles
        this.debuggerUI.down('.view-toggles').observe('click', function(e) {
            if (e.target.hasClassName('toggle-html')) {
                self._showHtmlView();
            } else if (e.target.hasClassName('toggle-plain')) {
                self._showPlainView();
            }
        });
    },

    _loadTemplate: function(templateId) {
        var ga = new GlideAjax('EmailTemplateDebugger');
        ga.addParam('sysparm_name', 'debugTemplate');
        ga.addParam('sysparm_template_id', templateId);
        ga.getXMLAnswer(this._updatePreview.bind(this));
    },

    _runTest: function() {
        var testData = {
            record: this.debuggerUI.down('.test-record-input').value,
            variables: this._parseVariables()
        };

        var ga = new GlideAjax('EmailTemplateDebugger');
        ga.addParam('sysparm_name', 'debugTemplate');
        ga.addParam('sysparm_test_data', JSON.stringify(testData));
        ga.getXMLAnswer(this._updatePreview.bind(this));
    },

    _parseVariables: function() {
        try {
            return JSON.parse(this.debuggerUI.down('.variables-editor').value);
        } catch (e) {
            this._logError('Invalid variables JSON: ' + e.message);
            return {};
        }
    },

    _updatePreview: function(response) {
        var result = JSON.parse(response);
        
        if (result.status === 'success') {
            this._updatePreviewContent(result.data.preview);
            this._updateDebugLog(result.data.debug);
            this._updateMetrics(result.data.metrics);
        } else {
            this._logError(result.message);
        }
    },

    _updatePreviewContent: function(preview) {
        var frame = this.debuggerUI.down('.preview-frame');
        var doc = frame.contentDocument || frame.contentWindow.document;
        doc.open();
        doc.write(preview.html);
        doc.close();
    },

    _updateDebugLog: function(log) {
        var logContainer = this.debuggerUI.down('.debug-log');
        logContainer.update('');

        log.forEach(function(entry) {
            var logEntry = new Element('div', {
                'class': 'log-entry'
            });
            logEntry.insert(new Element('span', {
                'class': 'timestamp'
            }).update('[' + entry.timestamp + 'ms] '));
            logEntry.insert(new Element('span', {
                'class': 'message'
            }).update(entry.message));
            
            if (entry.data) {
                logEntry.insert(new Element('pre', {
                    'class': 'data'
                }).update(JSON.stringify(entry.data, null, 2)));
            }

            logContainer.insert(logEntry);
        });
    },

    _updateMetrics: function(metrics) {
        var metricsHtml = '<div class="metrics-summary">';
        Object.keys(metrics).forEach(function(key) {
            metricsHtml += '<div class="metric">' +
                '<span class="metric-name">' + key + ':</span> ' +
                '<span class="metric-value">' + metrics[key] + 'ms</span>' +
                '</div>';
        });
        metricsHtml += '</div>';

        this.debuggerUI.down('.debug-section').insert({
            top: new Element('div').update(metricsHtml)
        });
    },

    _logError: function(message) {
        var logContainer = this.debuggerUI.down('.debug-log');
        logContainer.insert({
            top: new Element('div', {
                'class': 'error-entry'
            }).update(message)
        });
    },

    _addStyles: function() {
        var styles = `
            .email-debugger-container {
                padding: 20px;
                background: #f5f5f5;
                border-radius: 4px;
                font-family: 'Helvetica Neue', Arial, sans-serif;
            }

            .debugger-section {
                margin-bottom: 20px;
                padding: 15px;
                background: white;
                border-radius: 4px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }

            .preview-frame {
                width: 100%;
                height: 500px;
                border: 1px solid #ddd;
                border-radius: 4px;
            }

            .debug-log {
                max-height: 300px;
                overflow-y: auto;
                font-family: monospace;
                background: #2b2b2b;
                color: #e6e6e6;
                padding: 10px;
                border-radius: 4px;
            }

            .log-entry {
                margin-bottom: 5px;
                line-height: 1.4;
            }

            .error-entry {
                color: #ff6b6b;
                font-weight: bold;
            }

            .view-toggles button {
                margin-right: 10px;
                padding: 5px 15px;
                border: 1px solid #ddd;
                border-radius: 4px;
                background: white;
                cursor: pointer;
            }

            .view-toggles button.active {
                background: #007bff;
                color: white;
                border-color: #0056b3;
            }

            .metrics-summary {
                margin-bottom: 15px;
                padding: 10px;
                background: #e9ecef;
                border-radius: 4px;
            }

            .metric {
                display: inline-block;
                margin-right: 20px;
            }

            .metric-name {
                font-weight: bold;
            }
        `;

        var styleSheet = new Element('style').update(styles);
        $$('head')[0].insert(styleSheet);
    }
});