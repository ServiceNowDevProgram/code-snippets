var result = [];
    var gr = new GlideRecord('incident');
    gr.addQuery('active', true);
    var startOfMonth = new GlideDateTime();
    startOfMonth.setDisplayValue(gs.beginningOfThisMonth());
    gr.addQuery('sys_created_on', '<', startOfMonth);

    gr.query();

    while (gr.next()) {
        result.push({
            number: gr.getValue('number'),
            short_description: gr.getValue('short_description'),
            assigned_to: gr.getDisplayValue('assigned_to'),
            sys_created_on: gr.getDisplayValue('sys_created_on'),
            state: gr.getDisplayValue('state')
        });
    }

    var output = {
        total_count: result.length,
        generated_on: gs.nowDateTime(),
        outstanding_incidents: result
    };

    gs.print(JSON.stringify(output,null,2));
