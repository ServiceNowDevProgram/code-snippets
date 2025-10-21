(function executeRule(current, previous) {

    // Only run when the incident moves to Resolved
    if (current.state == previous.state || current.state != 6) {
        return;
    }

    // Make sure we have resolution notes to use for the KB article
    if (!current.close_notes) {
        gs.info('Skipping KB creation: No resolution notes found for ' + current.number);
        return;
    }

    // Get a clean version of the short description for comparison
    var issueTitle = current.short_description ? current.short_description.toLowerCase().trim() : '';

    // Check if a similar KB article already exists
    var kbCheck = new GlideRecord('kb_knowledge');
    kbCheck.addQuery('short_description', 'CONTAINS', issueTitle);
    kbCheck.query();

    if (kbCheck.next()) {
        gs.info('KB already exists for issue: ' + current.number + '. Skipping new KB creation.');
        return;
    }

    // Create a new Knowledge Article
    var kb = new GlideRecord('kb_knowledge');
    kb.initialize();
    kb.short_description = current.short_description;
    kb.text = current.close_notes;
    kb.workflow_state = 'draft';
    kb.kb_category = ''; // You can set a default category if needed
    kb.u_source_incident = current.number; // Optional: track which incident created it
    kb.insert();

    gs.info('New KB article created from Incident: ' + current.number);

})(current, previous);
