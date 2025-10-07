/*
    Carlos Camacho 
    Fix Script name: Fix choices on MainTable
    -------------------------------------------------
    Description:
        Populate the field u_new_field with correct values based on the field 
        core_choice (type = Reference)
    -------------------------------------------------
    Debug or Execute:
    - camachoDebug: 
                    true: the script will not update any record. Shows sys_ids from 
                    existing choices; 
                    false: Do not show debug information and do update the main table 
                    new field that refers the App choices table.  
    Variables to replace: 
    - x_aaaa_carlos_maintable: table that contains the field ref to Choice and the 
      new field ref to internal choices table;
    - core_choice: field name (main table) that is a reference (Reference) to the 
      Choice table.
    - tbchoices: table to store the App choices.
    - u_new_field: field name (main table) that is a reference (Reference) to the 
      App choices table. 
*/
var camachoDebug = true; 
var grMainTable = new GlideRecord("x_aaaa_carlos_maintable");
grMainTable.setWorkflow(false);
grMainTable.query();
var listArr = [];
while (grMainTable.next()) {
    if (camachoDebug)
       gs.info(grMainTable.number);
    var old_choice = grMainTable.core_choice ? grMainTable.core_choice : "";
    if (old_choice) {
        var grOldChoice = new GlideRecord("sys_choice");
        grOldChoice.addQuery('sys_id', old_choice);
        grOldChoice.setLimit(1);
        grOldChoice.query();
        if (grOldChoice.next()) {
            var oldValue = grOldChoice.getValue('value');
        }
        if (camachoDebug)
           gs.info('OldValue: ' + oldValue);
        var grNewChoice = new GlideRecord("tbchoices");
        grNewChoice.addQuery('value', oldValue);
        grNewChoice.query();
        if (grNewChoice.next()) {
           var newValue = grNewChoice.getValue('sys_id');
        }
        if (camachoDebug) {
            gs.info('NewValues: ' + newValue );
        } else {
            grMainTable.setValue('u_new_field', newValue);
            grMainTable.update();
        }
    }
}