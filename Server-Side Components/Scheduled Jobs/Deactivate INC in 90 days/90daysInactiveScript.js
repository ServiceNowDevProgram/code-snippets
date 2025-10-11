//Formatted the code for background script       
var grIncident = new GlideRecord('incident');
grIncident.addEncodedQuery("sys_created_onONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()^active=true");
grIncident.orderByDesc('number');
//grIncident.setLimit(20);
grIncident.query();
while (grIncident.next()) {

    var id=grIncident.getValue('sys_id');
    var tableName=grIncident.getValue('sys_class_name');

    // var id="e329de99731423002728660c4cf6a73c";
//var tableName="incident";  

              var gdt = new GlideDateTime(gs.nowDateTime());
             gdt.addDays(90);
          
              //gs.addErrorMessage(gdt);

              var grST = new GlideRecord("sys_trigger");

              grST.initialize();

              grST.name = "Inactivate "+tableName+" record";

              grST.next_action.setValue(gdt);

              grST.job_id.setDisplayValue('RunScriptJob');

              grST.script = doTimelySchedule(id);

              grST.document = 'syslog';

              grST.state = 0;

              grST.trigger_type = 0;

              grST.insert();
           }

              function doTimelySchedule(id) {

                                           var ret = ""

                             + "var gr = new GlideRecord('"+tableName+"');\n"

                             + "gr.addQuery('sys_id', '" +id+ "');\n"

                             + "gr.query();\n"

                             + "if (gr.next()) {\n"

                                           + "gr.active = false;\n"

                                           + "gr.update();\n"

                                           + "}";

                            return ret;      
                           gs.print( "return value : " + ret);//prints the inserted code in sysy trigger table
                           //open the schedule item with the name 
                                                            


                             }
                            
