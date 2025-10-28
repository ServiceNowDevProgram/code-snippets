/*
This script will mark the struck slack conversation as canceled.
Use Case: Sometimes due to n/w  or connecton issue, users are not able to end the conversations using restart or end command from slack.
*/
var struckConv = new GlideRecord('sys_cs_conversation'); // conversation table glide record
struckConv.addEncodedQuery('stateINopen,faulted,chatInProgress^device_type=slack'); // Query can be enhanced based on user (consumer) or date range.
struckConv.query();
while(struckConv.next()){
	struckConv.setValue('state','canceled'); // set the state to cancel for struck conversation.
	struckConv.setWorkflow(false);
	struckConv.update();
}
