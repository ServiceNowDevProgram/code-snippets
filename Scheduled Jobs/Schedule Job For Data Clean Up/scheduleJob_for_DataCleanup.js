var gr = new GlideRecord('incident');
gr.addQuery('sys_created_on', '<=', gs.daysAgo(90));
gr.addQuery('state', 'Closed');
gr.deleteMultiple();
gs.info('Deleted old closed incidents older than 90 days.');
