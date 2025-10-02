(function executeStep(inputs, outputs, stepResult, timeout) {

	var recordSysId = inputs.u_sys_id;

    var finance = new GlideRecord("incident");
    finance.addQuery("sys_id", recordSysId);
    finance.query();
    if (finance.next()) {
        outputs.u_number = finance.getDisplayValue("number");
		outputs.u_short_description= finance.getDisplayValue("short_description");
        stepResult.setOutputMessage('Found the record');
        stepResult.setSuccess();
    } else {
        stepResult.setOutputMessage('Record not found');
        stepResult.setFailed();
    }

}(inputs, outputs, stepResult, timeout));
