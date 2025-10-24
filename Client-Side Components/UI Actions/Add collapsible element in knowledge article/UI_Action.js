/*
This script should be placed in the UI action on the table kb_knowledge form view.
This UI action should be marked as client.
Use addCollapsible() function in the Onclick field.
*/

function addCollapsible() {
    var gm = new GlideModal("add_collapsible");
    gm.setTitle('Add collapsible');
    gm.setWidth(1000);
    gm.render();
}