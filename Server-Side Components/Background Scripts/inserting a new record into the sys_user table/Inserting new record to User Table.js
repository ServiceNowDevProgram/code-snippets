var userData = {
    user_name: 'hackfest.user',          // Demo Data only we can change whatever as we need
    first_name: 'Hack',                  // Demo Data only we can change whatever as we need
    last_name: 'Fest',                   // Demo Data only we can change whatever as we need
    email: 'hackfest.user@servicenow.com'// Demo Data only we can change whatever as we need
};

// Check if mandatory fields are present
if (!userData.user_name || !userData.first_name || !userData.last_name || !userData.email) {
    gs.info('Missing required fields. User not created.');
} else {
    // Check if user already exists to avoid duplicates
    var grCheck = new GlideRecord('sys_user');
    grCheck.addQuery('user_name', userData.user_name);
    grCheck.query();

    if (grCheck.next()) {
        gs.info('User [' + userData.user_name + '] already exists.');
    } else {
        // Initialize new GlideRecord for sys_user
        var gr = new GlideRecord('sys_user');
        gr.initialize();

        // Dynamically set all fields from the object
        for (var field in userData) {
            if (gr.isValidField(field)) {
                gr[field] = userData[field];
            }
        }

        // Insert record
        var newUserSysId = gr.insert();
        if (newUserSysId) {
            gs.info('User [' + userData.user_name + '] created successfully. Sys ID: ' + newUserSysId);
        } else {
            gs.info('Failed to create user [' + userData.user_name + ']');
        }
    }
}
