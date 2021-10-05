var incidentGR = new GlideRecord('incident');
//Update query as per your requirement for incident records
incidentGR.addEncodedQuery("resolved_atONYesterday@javascript:gs.beginningOfYesterday()@javascript:gs.endOfYesterday()");
incidentGR.query();
while (incidentGR.next()) {
	var checkIfSent = checkIfSurveyAlreadySentforThisWeek(incidentGR.caller_id);
	if (checkIfSent == false) {
		//sys_id of the trigger condition record for the survey table name "asmt_condition".
		(new sn_assessment_core.AssessmentCreation()).conditionTrigger(incidentGR, 'sys_id');
	}
}

function checkIfSurveyAlreadySentforThisWeek(callerId) {
	var surveyInstanceRec = new GlideRecord('asmt_assessment_instance');
	surveyInstanceRec.addQuery('user', callerId);
	//Update query as per your requirement and add sys_id for the survey record.
	surveyInstanceRec.addEncodedQuery('metric_type=<Survey SYS ID>^task_id.sys_class_name=incident^state!=canceled');
	surveyInstanceRec.query();
	if (surveyInstanceRec.next()) {
		return true;
	}
	return false;
}

