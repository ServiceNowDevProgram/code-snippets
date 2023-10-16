var gr = new GlideRecord('incident');
gr.addEncodedQuery('state=6^resolved_atONLast week@javascript:gs.beginningOfLastWeek()@javascript:gs.endOfLastWeek()'); //query to check the records that has been resolved last week
gr.query();
while(gr.next()){
	gr.state = '7'; // setting the state to closed
	gr.work_notes = 'Closed all the resolved incident through Scheduled Job Script'; //adding work notes
	gr.update();
}
