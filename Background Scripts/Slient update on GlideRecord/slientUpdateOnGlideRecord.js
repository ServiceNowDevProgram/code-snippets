//Update GlideRecord without modification to system fields
var grInc = new GlideRecord('incident');
if (grInc.get('62826bf03710200044e0bfc8bcbe5df9')) {
grInc.active='false;
grInc.autoSysFields(false); 
grInc.update();
}
