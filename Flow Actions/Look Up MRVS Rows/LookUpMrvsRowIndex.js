(function execute(inputs, outputs) {
  // Look up the 'Multi Row Question Answers' records associated with a specific sys_id and return the unique 'Row indexes' 
  var array = [];

  var grMrvs = new GlideRecord('sc_multi_row_question_answer');
  // Update line below with correct input variable
  grMrvs.addQuery('parent_id',inputs.ParentID);
  grMrvs.query();

  while (grMrvs.next()) {
    array.push(grMrvs.row_index.toString());
  }

  var arrayUtil = new ArrayUtil();
  // Update line below with correct output variable
  outputs.row_index_array = arrayUtil.unique(array);

})(inputs, outputs);
