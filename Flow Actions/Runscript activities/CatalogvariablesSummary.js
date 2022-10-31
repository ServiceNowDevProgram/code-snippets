//Set the RITM description 
var descriptionSummary = "";
var ritmid="000000921b09dd18aa8cdbd7b04bcb7b";//  RITM sys id
//insted of "ritmid "use current.sys_id in rnscript activity
var grSIOM = new GlideRecord('sc_item_option_mtom');
//grSIOM.addQuery("request_item", current.sys_id); ## reference sample code
grSIOM.addQuery("request_item", ritmid);
gs.log("This is sc_item_option_mtom number" + grSIOM);
grSIOM.query();
while (grSIOM.next())
   {
   var visible = grSIOM.sc_item_option.item_option_new.visible_summary;
   var question = GlideappQuestion.getQuestion(grSIOM.sc_item_option.item_option_new);
   question.setValue(grSIOM.sc_item_option.value);
   if (question.getLabel() != "" && question.getDisplayValue() != "" && question.getDisplayValue() != "false" &&question.getDisplayValue() != "-- None --"&& visible == true)
      {  descriptionSummary += question.getLabel() + " = " + question.getDisplayValue() + "\n\n";  }
}
// current.description = descriptionSummary;  uncomment the code in workflow activity while re using
gs.print(descriptionSummary);
