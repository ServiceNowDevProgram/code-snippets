(function execute(inputs, outputs) {
  var table = inputs.table;
  var recordId = inputs.record_id;
  var choiceFieldName = inputs.choice_field_name;

  try {
    var gr = new GlideRecord(table);
    gr.addQuery("sys_id", recordId);
    gr.query();

    if (gr.next()) {
      outputs.choice_value = gr.getValue(choiceFieldName);
      outputs.choice_label = gr.getDisplayValue(choiceFieldName);
    } else {
      // Handle the case where the record with the specified ID is not found.
      gs.error("Record not found with sys_id: " + recordId);
    }
  } catch (ex) {
    // Handle any exceptions that may occur during the script execution.
    gs.error("An error occurred: " + ex);
  }
})(inputs, outputs);
