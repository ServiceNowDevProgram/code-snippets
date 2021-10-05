//Service Script for the widget
(function () {
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */

	var incidentList = [];
	var incidentGR = new GlideRecord('incident');
	incidentGR.addQuery('major_incident_state=accepted');
	incidentGR.addActiveQuery();
	incidentGR.orderByDesc('sys_created_on');
	incidentGR.setLimit(5);
	incidentGR.query();

	while (incidentGR.next()) {
		var inc = {};
		$sp.getRecordDisplayValues(inc, incidentGR, 'number,short_description');
		incidentList.push(inc);
	}
	data.incidents = incidentList;
})();
