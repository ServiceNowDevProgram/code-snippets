(function execute(inputs, outputs) {
var start_date = new GlideDateTime(inputs.start_date); //created date
  var end_date = new GlideDateTime(inputs.end_date);  //updated
  outputs.ticket_age = GlideDateTime.subtract(start_date,end_date).getDisplayValue();
})(inputs, outputs);
