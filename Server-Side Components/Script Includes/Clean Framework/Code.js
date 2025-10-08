Script Include Definition:

var super_utils = Class.create();
super_utils.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
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
        this.CASETYPE1 = '[casetype 1 table]';
        this.CASETYPE2 = '[casetype 2 table]';

    },

 /**
  * Description: Takes in a method name and message and logs the message in gs.info if debug and method isn't in noDebugMethods
  * Parameters: [string] - methodName: name of method calling log.
                [string] - msg: message being called in log.
  * Returns: None.
  */
  
  log: function(methodName, msg) {
      if (this.debug && this.noDebugMethods.indexOf(methodName) === -1) {
          gs.info('[Super_Utils - ' + methodName + '] ' + msg);
      }
  },

/**
 * Description: Takes in an input then gets all records where field is input and created by is "iloveearl"
 * Parameters: [string] - input: Value that we're querying on.
 * Returns: [array][object] - arr: Array of GlideRecord objects matching the conditions.
 */

superFunction: function(input){
  var arr = [];
  var gr = new GlideRecord(this.CASETYPE1);
  gr.addQuery('sys_created_by', 'iloveearl';
  gr.addQuery('field',input);
  gr.query();

  while(gr.next()){
    arr.push(gr);
       this.log("superfunction", "Created on: " + sys_created_on);
  }
return arr;
},

/**
 * Description: This is a very important method...
 * Parameters: None.
 * Returns: Logs a very important message.
 */

superFunction2: function(){
  for (var i = 1; i <= 100000; i++) {
    this.log("superFunction2", "ILOVEEARL);
    }
  }
},
    type: 'super_utils'
});

Calling Script Include Via Server Side Script:
var utils = new scope.super_utils('true', 'superFunction2');