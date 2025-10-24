//This is a After-Busiens Rule with insert and update(checked) created on Incident Table
//condition as Major Incident is True
(function executeRule(current, previous /*null when async*/ ) {

    
    var gr = new GlideRecord('problem');
    gr.initialize();
    gr.first_reported_by_task = current.getUniqueValue();
    gr.business_service = current.business_service.getValue();
    gr.short_description = current.short_description;
    gr.description = current.description;
	gr.urgency = current.urgency;
	gr.impact= current.impact;
    gr.insert();
	gs.addInfoMessage('problem number'+gr.number.getDisplayValue());
})(current, previous);
