(function(outputs, steps, params, stepResult, assertEqual) {
// add test script here
  var gr = new GlideAggregate('incident');
  gr.addAggregate('COUNT');
  gr._query();
  if (gr.next()) {
    stepResult.setOutputMessage("Successfully Calculated the Count");
	return gr.getAggregate('COUNT'); // pass the step
  } else { 
    stepResult.setOutputMessage("Failed to Count");
    return false; // fail the step
  }

})(outputs, steps, params, stepResult, assertEqual);
