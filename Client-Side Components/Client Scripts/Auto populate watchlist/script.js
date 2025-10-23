function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading) return;

    // Get existing watch list first
    var existing = g_form.getValue('watch_list');
    var watchList = existing ? existing.split(',') : [];

    // Get key values
    var openedBy = g_form.getValue('opened_by');
    var prevAssigned = oldValue;
    var newAssigned = newValue;

    if (!openedBy) {
        openedBy = g_user.userID; // current logged-in user
    }

    // Add new users if not already present
    if (openedBy) watchList.push(openedBy);
    if (prevAssigned) watchList.push(prevAssigned);
    if (newAssigned) watchList.push(newAssigned);

    // Remove duplicates
    var uniqueList = [];
    for (var i = 0; i < watchList.length; i++) {
        var val = watchList[i];
        if (val && uniqueList.indexOf(val) === -1) {
            uniqueList.push(val);
        }
    }

    // Update watch list
    g_form.setValue('watch_list', uniqueList.join(','));

    // Display confirmation message
    g_form.addInfoMessage(" Your Assigned To change is reflected and added in Watch list");
}
