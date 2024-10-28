// new GlideModal(
//    UI page name,
//    Hide the 'close' button,
//    width in pixels
// );
var gm = new GlideModal('ui_page_name', false, 400);
// Setup the modal window
gm.setTitle('The title at the top of the window'); 
gm.setPreference('somePreference', 'task');
gm.setPreference('anotherPreference', 'value');
// Show the dialog
gm.render();
