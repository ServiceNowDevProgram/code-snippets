(function execute(inputs, outputs) {
    // ... code ...

    //Get Source ids from exisitng Attestation;
    //Check if an assessable record exists for all attestations in the group if not, throw an error message.
    var sources = '',
        state = true;
        asmtmetricType = inputs.metricType;
        asmtAssignee =inputs.AttestationAssignee.sys_id;
        assessmentList =inputs.AttestationList.trim();
    var asmt = new GlideRecord("asmt_assessment_instance");
    asmt.addQuery("sys_id", "IN", assessmentList);
    asmt.query();
    while (asmt.next()) {
        if ((asmt.state == "complete" || asmt.state == "canceled")) {
            outputs.out = "can't proceed, Attestation states are in Complete or Canceled, Please review.";
            return;
        }
        //check if assessable record exist
        var assessableRecord = new GlideRecord("asmt_assessable_record");
        assessableRecord.addQuery("source_id", asmt.sn_grc_item);
        assessableRecord.query();
        if (assessableRecord.next()) {
            sources = sources + "," + asmt.sn_grc_item;
        } else {
            outputs.out = "can't proceed, Assesssable record doesn't for this inntance please " + asmt.number + " review";
            return;

        }
    }
    sources = sources.slice(1); //Comma separated source sys_ids

    //Create Grouped Attestation.
    var result = new global.AssessmentUtils().createAssessments(asmtmetricType, sources + '', asmtAssignee, '');

    //set grouped assessmemt as parent to all the instance
    var asmtFinal = new GlideRecord("asmt_assessment_instance");
    asmtFinal.addQuery("sys_id", "IN", "1d66c941c3e39a10c3dcd8477d0131da,ff6a5ad1c399d610c3dcd8477d0131d0");
    asmtFinal.query();
    while(asmtFinal.next()){
        asmtFinal.setValue("sn_grc_parent", result.split(',')[0]);
        asmtFinal.update();
    }
    asmtFinal.initialize();
    asmtFinal.get(result.split(',')[0]);
    asmtFinal.setValue("sn_grc_group_type", "grouped"); //    //set response type on Grouped attestation as "grouped"
    asmtFinal.update();

    outputs.out = result.split(',')[0]; //retun the grouped attestation instance id.

})(inputs, outputs);
