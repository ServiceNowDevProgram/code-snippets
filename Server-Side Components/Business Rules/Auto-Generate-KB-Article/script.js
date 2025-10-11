(function executeRule(current, previous /*null when async*/) {
    try {
        // Check if Incident is resolved and has a resolution note
        if (current.state == 6 && current.close_notes) { // 6 = Resolved
            var kbGR = new GlideRecord("kb_knowledge");
            kbGR.initialize();
            kbGR.short_description = "Resolution for Incident " + current.number;
            kbGR.text = current.close_notes;
            kbGR.kb_category = "General"; // Default category, can be customized
            kbGR.workflow_state = "draft";
            kbGR.u_source_incident = current.sys_id; // Optional: custom field to track source
            kbGR.insert();
        }
    } catch (ex) {
        gs.error("An error occurred while creating a Knowledge Article from Incident.");
    }
})(current, previous);
