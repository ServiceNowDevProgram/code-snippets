var incidentGR = new GlideRecord('incident');
incidentGR.addEncodedQuery("resolved_atONYesterday@javascript:gs.beginningOfYesterday()@javascript:gs.endOfYesterday()"); //Update query as per your requirement for incident records
incidentGR.query();
while(incidentGR.next()){
var checkIfSent = checkIfSurveyAlreadySentforThisWeek(incidentGR.caller_id);
	if(checkIfSent == false)
		(new sn_assessment_core.AssessmentCreation()).conditionTrigger(incidentGR, 'sys_id'); //sys_id of the trigger condition record for the survey table name "asmt_condition".
}

function checkIfSurveyAlreadySentforThisWeek(callerId){
	
var surveyInstanceRec = new GlideRecord('asmt_assessment_instance');
	surveyInstanceRec.addQuery('user',callerId);
	surveyInstanceRec.addEncodedQuery('metric_type='Survey SYS ID'^task_id.sys_class_name=incident^state!=canceled'); //Update query as per your requirement and add sys_id for the survey record.
surveyInstanceRec.query();
	if(surveyInstanceRec.next()){
		return true;
	}
	else
		return false;
}

