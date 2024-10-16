var RecordProducerVariableUtils = Class.create();

// Method to create a new variable
// by providing target GlideRecord, variable order, and variable (question) sys_id
RecordProducerVariableUtils.createVariable = function(currentGr, order, questionId) {

    // Get table name and the sys_id of the record
    var recordId = currentGr.getUniqueValue();
    var tableName = currentGr.getTableName();

	// Create variable and associate it with the record so that it can be visible via Variable Editor
    var variableGr = new GlideRecord('question_answer');
    variableGr.initialize();
    variableGr.setValue('order', order);
    variableGr.setValue('question', questionId);
    variableGr.setValue('table_name', tableName);
    variableGr.setValue('table_sys_id', recordId);
    
	return variableGr.insert();
};
