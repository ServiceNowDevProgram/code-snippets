(function executeRule(current, previous /*null when async*/) {

    // Call the Script Include
    var populator = new DynamicFieldPopulator();
    populator.populateFields(current, current.getTableName());

})(current, previous);
