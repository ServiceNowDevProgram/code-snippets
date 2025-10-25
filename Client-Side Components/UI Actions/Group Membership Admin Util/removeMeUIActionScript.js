try {
    var groupSysId = current.sys_id;
    var userSysId = gs.getUserID();

    // Validate input
    if (!groupSysId || !userSysId) {
        throw new Error("Group Sys ID and User Sys ID are required.");
    }

    // Query the sys_user_grmember table to find the record
    var gr = new GlideRecord("sys_user_grmember");
    gr.addQuery("group", groupSysId);
    gr.addQuery("user", userSysId);
    gr.query();

    if (gr.next()) {
        // Delete the record
        var deleted = gr.deleteRecord();
        if (deleted) {
            gs.addInfoMessage("User successfully removed from the group.");
        } else {
            throw new Error("Failed to remove user from the group.");
        }
    } else {
        throw new Error("No matching record found for the user in the group.");
    }
} catch (error) {
    gs.addErrorMessage("Error removing user from group: " + error.message);
}