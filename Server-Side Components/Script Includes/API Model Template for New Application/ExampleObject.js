var ExampleObject = Class.create();
ExampleObject.prototype = Object.extendsObject(ExampleObjectBase, {
	/** Baseline Object
     * All application calls should be made directly to this API
     *  
     * Please override any base functionality here 
     * ---
     * All vendor changes will be made to the *Base classes
     * This will ensure you can track changes to future upgrades
     * 
     * Copy existing methods to this file and make changes here
     * **/

    type: 'ExampleObject'
});