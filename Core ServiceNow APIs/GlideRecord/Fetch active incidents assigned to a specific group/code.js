
var gr = new GlideRecord('incident');
    gr.addQuery('active', true);
    gr.addQuery('assignment_group.name', 'Network Support');
    gr.query();

    while (gr.next()) {
        gs.info('Incident Number: ' + gr.getValue('number'));
    }
