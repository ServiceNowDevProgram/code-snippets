(function executeRule(current, previous /*null when async*/) {

    // ==============================================================
    // Business Rule: Incident Auto-Tagging
    // Table: Incident
    // --------------------------------------------------------------
    // Purpose:
    // Automatically detect keywords (like "email", "vpn", "server")
    // from the Incident’s short description and description fields.
    //
    // Based on detected keywords:
    //  - A corresponding Label is created (if not already present)
    //  - A related Label Entry is created for that Incident
    //
    // 💡 Benefit:
    // Adding Labels and Label Entries helps automatically tag
    // incidents with the right keywords — improving searchability,
    // categorization, and visibility across the platform.
    // ==============================================================

    // Step 1: Collect tags from the description
    var tags = [];
    var desc = (current.short_description + " " + current.description).toLowerCase();

    if (desc.indexOf("email") > -1) tags.push("Email");
    if (desc.indexOf("vpn") > -1) tags.push("VPN");
    if (desc.indexOf("server") > -1) tags.push("Server");

    // Step 2: Process each detected tag
    for (var i = 0; i < tags.length; i++) {

        var tagName = tags[i]; // e.g., "Email"
        var labelSysId;

        // Step 2.1: Check if Label already exists
        var labelGR = new GlideRecord("label");
        labelGR.addQuery("name", tagName);
        labelGR.query();

        if (labelGR.next()) {
            // Label exists — reuse it
            labelSysId = labelGR.sys_id.toString();
        } else {
            // Create new Label
            var newLabel = new GlideRecord("label");
            newLabel.initialize();
            newLabel.name = tagName;
            newLabel.owner = gs.getUserID();       // Logged-in user sys_id
            newLabel.viewable_by = "everyone";     // Backend value of choice
            newLabel.active = true;
            labelSysId = newLabel.insert();
        }

        // Step 2.2: Create Label Entry if not already present
        var entryGR = new GlideRecord("label_entry");
        entryGR.addQuery("table_key", current.sys_id);
        entryGR.addQuery("label", labelSysId);
        entryGR.query();

        if (!entryGR.hasNext()) {

            var newEntry = new GlideRecord("label_entry");
            newEntry.initialize();
            newEntry.title = "Incident - " + current.number; // e.g., Incident - INC0010003
            newEntry.label = labelSysId;
            newEntry.url = "incident.do?sys_id=" + current.sys_id + "&sysparm_view=";
            newEntry.table = "incident";
            newEntry.id_type = "Incident";
            newEntry.table_key = current.sys_id;
            newEntry.read = "yes"; 
            newEntry.insert();
        }
    }

})(current, previous);
