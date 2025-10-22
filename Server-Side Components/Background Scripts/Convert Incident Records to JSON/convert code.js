var incidents = [];
var gr = new GlideRecord('incident');
gr.addQuery('active', true);
gr.query();
while (gr.next()) {
    incidents.push({
        number: gr.number.toString(),
        short_description: gr.short_description.toString(),
        state: gr.state.toString(),
        assigned_to: gr.assigned_to.getDisplayValue('name'),
        created_on: gr.sys_created_on.getDisplayValue()
    });
}

var jsonOutput = JSON.stringify(incidents);
gs.info(jsonOutput);
