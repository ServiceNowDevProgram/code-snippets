function functionName() { //specify the function name you listed within the UI Action "onClick" field
var tableName = "table_name"; //specify what table the new record should be created on
var dialog = new GlideModalForm('modal_form_title', tableName); //set your modal form title here
dialog.setSysID(-1); //sys_id -1 will open a brand new record
dialog.addParm('sysparm_view', 'view_name'); //optional: you can specify a specific view name here
dialog.addParm('sysparm_view_forced', 'true'); //optional: you can force the view so it overrides
dialog.addParm('sysparm_form_only', 'true'); //optional: you can specify to show the form only, removing related lists from the screen
var sDesc = g_form.getValue('short_description'); //example retrieving the short description on the current record
var query = "short_description=" + sDesc; //example setting the query JavaScript variable to the sDesc JavaScript variable that contains our current record's short description
dialog.addParm('sysparm_query', query); //sets the query to the JavaScript variable from the line above, this will populate the related field(s) on the new form with the values specified
dialog.render(); //displays the modal form to the user
}
