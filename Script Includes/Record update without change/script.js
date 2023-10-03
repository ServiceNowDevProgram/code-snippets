//Trigger update to all table records without changing values
function triggerUpdate(table) {
    var gr = new GlideRecord(table);
    gr.query();
    while (gr.next()) {
        gr.autoSysFields(false); //Don't update system fields
        gr.setForceUpdate(true); //force the update
        gr.update();
    }
}