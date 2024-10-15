//Update GlideRecord without modification to system fields
var grInc = new GlideRecord('incident');
if (grInc.get('62826bf03710200044e0bfc8bcbe5df9')) {
  grInc.active='false';
  grInc.autoSysFields(false); //Do not update sys_updated_by, sys_updated_on, sys_mod_count, sys_created_by, and sys_created_on
  grInc.setWorkflow(false); //Disables the running of business rules
  grInc.update();
}
