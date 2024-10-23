(function executeRule(current, previous /*null when async*/ ) {

   //  Assesments once submitted are stored in Assesment Instances Table with record value mapped.
    var assessmentinstance = new GlideRecord('asmt_assessment_instance');
    assessmentinstance.addQuery('task_id', current.sys_id); //
    assessmentinstance.setLimit(1);
    assessmentinstance.query();// Query the record
    if (!assessmentinstance.hasNext()) //If there are no assesments 
    {
        gs.addInfoMessage('Please perform risk assesment before requesting for approval');
        current.setAbortAction(true);
        action.setRedirectURL(current);
    }
})(current, previous);
