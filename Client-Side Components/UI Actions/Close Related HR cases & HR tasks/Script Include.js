var close_item = Class.create();
close_item.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
	getRelatedItems: function() {
        var caseId = this.getParameter('sysparm_case_id');
        var results = [];

        // Get child HR cases
        var childCases = new GlideRecord('sn_hr_core_case');
        childCases.addQuery('parent', caseId);
        childCases.query();
        while (childCases.next()) {
            results.push({ type: 'HR Case', number: childCases.getValue('number') });
        }

        // Get tasks
        var tasks = new GlideRecord('sn_hr_core_task');
        tasks.addQuery('hr_case', caseId);
        tasks.query();
        while (tasks.next()) {
            results.push({ type: 'HR Task', number: tasks.getValue('number') });
        }

        return JSON.stringify(results);
    },
	closeRelatedItems: function() {
        var caseId = this.getParameter('sysparm_case_id');

        // Close child cases
        var childCases = new GlideRecord('sn_hr_core_case');
        childCases.addQuery('parent', caseId);
        childCases.query();
        while (childCases.next()) {
            childCases.setValue('state', '3');
            childCases.update();
        }

        // Close tasks
        var tasks = new GlideRecord('sn_hr_core_task');
        tasks.addQuery('hr_case', caseId);
        tasks.query();
        while (tasks.next()) {
            tasks.setValue('state', '3');
            tasks.update();
        }

        return "done";
		
    },
    type: 'close_task'
});
