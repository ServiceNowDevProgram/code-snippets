var log_utils = Class.create();
log_utils.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
    initialize: function(debug, noDebugMethods) {
        this.debug = false; // Flag to allow debug or not on this script include
        this.noDebugMethods = []; // Array of methods to not log from

        if (debug) {
            this.debug = debug;
        }

        if (noDebugMethods) {
            this.noDebugMethods = noDebugMethods.split(',');
        }

        // Global Variables For Use In Script

    },

 /**
  * Description: Takes in a method name and message and logs the message in gs.info if debug and method isn't in noDebugMethods
  * Parameters: [string] - methodName: name of method calling log.
                [string] - msg: message being called in log.
  * Returns: None.
  */
  
  log: function(methodName, msg) {
      if (this.debug && this.noDebugMethods.indexOf(methodName) === -1) {
          gs.debug('[Log Utils - ' + methodName + '] ' + msg);
      }
  },

