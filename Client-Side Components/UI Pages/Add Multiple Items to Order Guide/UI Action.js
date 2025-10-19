
/*
onClick function name : addToOrderGuide
The UI action will prompt UI page to select order guide and variable set. 
*/
function addToOrderGuide() {
    var items = g_list.getChecked();
    var dialog = new GlideDialogWindow("add_to_og"); // UI page name
    dialog.setTitle("Select Order Guide and Variable Set"); // Prompt title.
    dialog.setPreference("items", items);
    dialog.render();
}
