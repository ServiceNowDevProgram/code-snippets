function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading) return;

    // Clear current watch list
    g_form.clearValue('watch_list');

    // Get values
    var openedBy = g_form.getValue('opened_by');
    var prevAssigned = oldValue;
    var newAssigned = newValue;

    // For new records, opened_by might not be set yet
    if (!openedBy) {
        openedBy = g_user.userID; // current logged-in user
    }

    // Build watch list
    var watchList = [];

    if (openedBy) watchList.push(openedBy);
    if (prevAssigned) watchList.push(prevAssigned);
    if (newAssigned) watchList.push(newAssigned);

    // Remove duplicates
    var uniqueList = [];
    for (var i = 0; i < watchList.length; i++) {
        if (uniqueList.indexOf(watchList[i]) === -1) {
            uniqueList.push(watchList[i]);
        }
    }

    // Update watch list
    if (uniqueList.length > 0) {
        g_form.setValue('watch_list', uniqueList.join(','));
    }

    // Display confirmation message
    g_form.addInfoMessage("✅ Assigned To change reflected in Watch list.");
}
