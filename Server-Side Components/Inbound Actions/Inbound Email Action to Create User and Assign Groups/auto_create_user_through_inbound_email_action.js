(function runInboundAction(email, action) {

    var body = email.body_text;

    // Function to extract field values using regex
    function fetchFieldValue(label) {
        var regex = new RegExp(label + "\\s*:\\s*(.*)", "i");
        var match = body.match(regex);
        return match ? match[1].trim() : "";
    }

    // Extract values from email
    var name = fetchFieldValue("Name");
    var emailAddr = fetchFieldValue("Email");
    var userID = fetchFieldValue("UserID");
    var department = fetchFieldValue("Department");
    var groupsStr = fetchFieldValue("Groups");
    var groups = groupsStr ? groupsStr.split(",") : [];

    if (!emailAddr) {
        gs.log("Inbound Email User Creation: Email missing. Aborting.");
        return;
    }

    // Check if user already exists
    var existingUser = new GlideRecord("sys_user");
    existingUser.addQuery("email", emailAddr);
    existingUser.query();

    var userSysId;

    if (existingUser.next()) {
        gs.log("User already exists: " + emailAddr);
        userSysId = existingUser.sys_id.toString();
    } else {
        // Create new user
        var newUser = new GlideRecord("sys_user");
        newUser.initialize();
        newUser.name = name;
        newUser.email = emailAddr;
        newUser.user_name = userID;
        newUser.department = department;
        userSysId = newUser.insert();
        gs.log("New user created: " + name + " (" + emailAddr + ")");
    }

    // Add user to groups
    groups.forEach(function(groupName) {
        groupName = groupName.trim();
        if (groupName) {
            var group = new GlideRecord("sys_user_group");
            group.addQuery("name", groupName);
            group.query();
            if (group.next()) {
                var mem = new GlideRecord("sys_user_grmember");
                mem.initialize();
                mem.user = userSysId;
                mem.group = group.sys_id;
                mem.insert();
                gs.log("User added to group: " + groupName);
            } else {
                gs.log("Group not found: " + groupName);
            }
        }
    });

})(email, action);


