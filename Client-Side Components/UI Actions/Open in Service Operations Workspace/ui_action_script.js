function openInServiceOperationWorkspace() {
    var taskSysID = g_form.getUniqueValue();
    var taskTable = g_form.getTableName();
    
    // Construct the hardcoded Service Operation Workspace URL
    var workspaceURL = '/now/sow/record/' + taskTable + '/' + taskSysID;
    
    // Open in new window
    var w = getTopWindow();
    w.window.open(workspaceURL, '_blank');
}
