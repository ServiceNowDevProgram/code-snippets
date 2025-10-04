function openinLIST() {
    var taskTable = g_form.getTableName();

    // Construct the hardcoded LIST URL
    var listURL = '/' + taskTable + '_list.do?sysparm_clear_stack=true';

    // Open in new window
    var w = getTopWindow();
    w.window.open(listURL, '_blank');
}
