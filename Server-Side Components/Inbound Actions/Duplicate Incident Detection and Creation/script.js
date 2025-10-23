(function runAction(current, event, email, logger, classifier) {
    var subject = email.subject.trim();

    //Look for duplicate incident
    var gr = new GlideRecord('incident');
    gr.addActiveQuery();
    gr.addQuery('short_description', 'CONTAINS', subject);
    gr.addQuery('state', 'NOT IN', '3,4'); //Ignore resolved or closed incidents
    gr.query();

    if(gr.next()){
        //Update existing incident with duplicate email
        gr.work_notes = 'Duplicate email received for this incident:\n' + email.body_text;
        gr.update();

        //Abort creating new incident
        action.setAbortAction(true);
        return;
    }

	//Create new incident if no duplicate incident found
    current.short_description = email.subject;
    current.description = email.body_text;
	current.update();
})(current, event, email, logger, classifier);
