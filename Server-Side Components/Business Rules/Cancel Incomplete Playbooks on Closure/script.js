(function executeRule(current, previous /*null when async*/) {

	// Find associated playbooks
	var playbookGR = new GlideRecord('sys_pd_context');
    playbookGR.addQuery('input_table', 'incident');
    playbookGR.addQuery('input_record', current.sys_id);
    playbookGR.addQuery('state', 'NOT IN', 'completed,canceled');
    playbookGR.query();

	// Cancel them to avoid hanging context
    while (playbookGR.next()) {
        sn_playbook.PlaybookExperience.cancelPlaybook(playbookGR, 'Canceled due to the incident closure or cancellation.');
    }

})(current, previous);
