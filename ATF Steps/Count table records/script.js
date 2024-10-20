(function(outputs, steps, params, stepResult, assertEqual) {
// add test script here
  var gr = new GlideAggregate('incident');
  gr.addAggregate('COUNT');
  gr._query();
  if (gr.next()) {			
    return gr.getAggregate('COUNT'); // pass the step
    stepResult.setOutputMessage("Successfully Calculated the Count");
  } else { 
    stepResult.setOutputMessage("Failed to Count");
    return false; // fail the step
  }

})(outputs, steps, params, stepResult, assertEqual);
