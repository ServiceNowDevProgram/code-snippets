var Logger = Class.create();
Logger.prototype = {
    initialize: function(source) {
       
            this.logging_enabled = gs.getProperty(source + " update Logging"); // Property to verify whether logging enabled for the source for example LogicMonitor
            this.payload_logging_enabled = gs.getProperty(source + " API Requests Logging"); // Property to verify whether Payload logging enabled for this source for example LogicMonitor
            this.source = source;
        }
    
    },
    infoLog: function(description) {
        if (this.logging_enabled == "true") {
            gs.log(description, this.source);
        }
    },
    warnLog: function(description) {
        if (this.logging_enabled == "true") {
            gs.logWarning(description, this.source);
        }
    },
    errorLog: function(description) {
        if (this.logging_enabled == "true") {
            gs.logError(description, this.source);
        }
    },
    logPayload: function(description) {
        if (this.payload_logging_enabled == "true") {
            gs.log(description, this.source);
        }
    },
    type: 'Logger'
};
