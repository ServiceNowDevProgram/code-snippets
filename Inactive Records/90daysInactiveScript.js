 var id=current.sys_id;
var tableName=current.sys_class_name;          
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

                                          

                                          

                             }

                            
