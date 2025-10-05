(function execute(inputs, outputs) {
    // ... code ...

    //Get Source ids from existing Attestation;
    //Check if an assessable record exists for all attestations in the group if not, throw an error message.
    var sources = '';
    var asmtmetricType = inputs.metricType; //Assessment metric type sys_id
    var asmtAssignee =inputs.AttestationAssignee.sys_id.toString(); //Assessment assignee.
    var assessmentList =inputs.AttestationList.trim(); //comma separated individual assessment.
    
    var asmt = new GlideRecord("asmt_assessment_instance"); //Assessment instance table
    asmt.addQuery("sys_id", "IN", assessmentList);
    asmt.query();
    while (asmt.next()) { //Need this while loop to check 1)check state and Assessable record.
        if ((asmt.state == "complete" || asmt.state == "canceled")) {
            outputs.out = "can't proceed, Attestation states are in Complete or Canceled, Please review.";
            return;
        }
        //for each assessment check if assessable record exist
        var assessableRecord = new GlideRecord("asmt_assessable_record"); //assessment assessable table
        assessableRecord.addQuery("source_id", asmt.sn_grc_item);
        assessableRecord.query();
        if (assessableRecord.next()) {
            sources = sources + "," + asmt.sn_grc_item;
        } else {
            outputs.out = "can't proceed, Assesssable record doesn't for this inntance please " + asmt.number + " review";
            return;
        }
    }
    sources = sources.slice(1); //Comma separated source sys_ids where assessment exist

    //Create Grouped Attestation using below api
    var result = new global.AssessmentUtils().createAssessments(asmtmetricType, sources + '', asmtAssignee, '');

    //set grouped assessmemt as parent to all the instance
    var asmtFinal = new GlideRecord("asmt_assessment_instance");
    asmtFinal.addQuery("sys_id", "IN", assessmentList);
    asmtFinal.query();
    while(asmtFinal.next()){
        asmtFinal.setValue("sn_grc_parent", result.split(',')[0]);
        asmtFinal.update(); //set parent on to the each assessment
    }

    outputs.out = result.split(',')[0]; //return the grouped attestation instance id.

})(inputs, outputs);
