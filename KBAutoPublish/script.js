(function autoPublishKnowledge() {
    // Query for articles marked as ready for publishing
    var kb = new GlideRecord('kb_knowledge');
    kb.addEncodedQuery('workflow_state=reviewed^valid_to>javascript:gs.now()');
    kb.query();

    // Auto-publish articles
    while (kb.next()) {
        kb.workflow_state = 'published';
        kb.update();
    }
})();
