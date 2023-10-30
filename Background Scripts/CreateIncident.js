
var gr = new GlideRecord('incident');
gr.initialize();
gr.short_description = 'New Incident';
gr.description = 'This is a new incident created by a background script.';
gr.insert();
gs.log('New incident created with sys_id: ' + gr.sys_id);
