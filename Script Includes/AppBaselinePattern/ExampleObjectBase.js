var ExampleObjectBase = Class.create();
ExampleObjectBase.prototype = Object.extendsObject(ApplicationCore, {
    /**
     * Typically the constructor function will be required on the new Object base
     * if every object would be constructed in same way, move this to the core ? 
     * or move to the core, and let it be overridden - might be better
     */
    initialize: function (grRecord) {
        if (!this._init(grRecord)) return; // stop dead, but only to prevent further errors. object still created. validate caller.
        // some other dependent behaviour
    },

    /**
     * use JSDOC , VSCode4life TLA IDST
     * @returns <3
     */
    _anyFunctionYouWant: function() {
        if (!this.grRecord) return; // use a guard clause on every function to ensure class is correctly constructed
    },

    /**
     * pass off the main constructor function and abstract complexity to keep things tidy
     * just some ideas about how to handle the instantiation validation complication
     */
    _init: function (grRecord) {
        // set-up your prototype here
        if (!grRecord) return;
        if (typeof grRecord == 'object' && grRecord.isValidRecord()) {
            this.grRecord = grRecord;
        } else if (typeof grRecord == 'string' && grRecord.length == 32) {
            // + assuming we knew what table:
            var strTableName = '';
            var id = grRecord; // it is a 32 char string
            this.grRecord = this._getGr(strTableName, id);
        }       
        // some other dependent behaviour
        // here
        // turn on & validate object specific settings
        // here, e.g this._setLogLevel() 
        return this.grRecord; // prove success
    },

    type: 'ExampleObjectBase'
});