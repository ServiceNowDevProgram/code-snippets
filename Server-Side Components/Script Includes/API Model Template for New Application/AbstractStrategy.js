var AbstractStrategy = Class.create();
AbstractStrategy.prototype = Object.extendsObject(AbstractStrategyBase, {
    /** Baseline Application 
    * Please override any base functionality here 
    * ---
    * All vendor changes will be made to the *Base classes
    * This will ensure you can track changes to future upgrades
    * 
    * Copy existing methods to this file and make changes here
    * **/
    type: 'AbstractStrategy'
});