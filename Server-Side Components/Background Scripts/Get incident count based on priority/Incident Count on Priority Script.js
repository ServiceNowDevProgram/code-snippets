    var gr = new GlideRecord('incident');
    gr.query();

    var priorities = {};

    while (gr.next()) {
        var priority = gr.getDisplayValue('priority') || 'No Priority Set';
        if (!priorities[priority]) {
            priorities[priority] = 0;
        }
        priorities[priority]++;
    }

    for (var p in priorities) {
        gs.info('Priority: ' + p + ' | Count: ' + priorities[p]);
    }
