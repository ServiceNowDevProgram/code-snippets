var LatestBaselineList = Class.create();
LatestBaselineList.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    runReport: function() {

var answer=[];
        var prj = new GlideRecord('pm_project');
        prj.addEncodedQuery('stateIN-5,2');
        prj.query();

        while (prj.next()) {
            var base = prj.getValue('sys_id');
            var plannedBLines = new GlideRecord('planned_task_baseline');
            plannedBLines.addQuery('top_task', base);
            //plannedBLines.addEncodedQuery('task.key_LatestBaselineList=true^task.top_task.state=2');
            plannedBLines.orderByDesc('sys_created_on');
            //plannedBLines.setLimit(1);
			
            plannedBLines.query();
            if (plannedBLines.next()) {
                var baseLineId = plannedBLines.getValue('sys_id');
                var baseLineName = plannedBLines.baseline.name;
				answer.push(baseLineId);
				
            }
           
	}
		return answer;
        
    },

    type: 'LatestBaselineList'
});
