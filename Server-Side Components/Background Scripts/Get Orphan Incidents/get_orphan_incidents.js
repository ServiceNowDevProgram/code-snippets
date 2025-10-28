var gr = new GlideRecord('incident');
gr.addNullQuery('assigned_to');
gr.addNullQuery('assignment_group');
gr.addQuery('state', '!=', 7); // not closed
gr.query();
gs.info("Orphaned incidents count:"+gr.getRowCount());
while (gr.next()) {
    gs.info('Orphaned incident: ' + gr.number + ' - ' + gr.short_description);
}
