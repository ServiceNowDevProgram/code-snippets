/**
 @Param event - GlideRecord representing the event after transform
 @Param origEventSysId - Id of the event. The GlideRecord event parameter is a temporary object, and therefore does not contain the id of the original event.
*/
(function postTransformHandler(event, origEventSysId){
  gs.log('PostTransformHandler custom script is active'); 
	// Make any changes to the alert which will be created out of this Event
	// Note that the Event itself is immutable, and will not be changed in the database
	if(event.source == 'Your Source' && event.resource == 'Your Resource')  //this script to action only in certain source and resource values.
	{
  //Checking if there's already an processed event in the system with same source , resource , message key, again we can add more query paramteters here or modify this query as per the requirement.
  var checkAlert = new GlideRecord('em_event');
	checkAlert.addQuery('source',event.source);
	checkAlert.addQuery('resource',event.resource);
	checkAlert.addQuery('severity',event.severity);
	checkAlert.addQuery('message_key',event.message_key);
	checkAlert.addQuery('stateNOT INReady,Ignored,Error');	
	checkAlert.orderByDesc('time_of_event');
	checkAlert.query();
	if(checkAlert.next())   //Event found
 		{  
			 var limit = '4';  //set limit to 4 hours we can make changes to this as per the requirement. 
			 var newDate = event.time_of_event.toString();   
			 var oldDate = checkAlert.time_of_event.toString(); 
			 var gDate = new GlideDateTime(newDate); 
			 var sDate = new GlideDateTime(oldDate); 
			 var diffSeconds = gs.dateDiff(gDate.getDisplayValue(),sDate.getDisplayValue(),true); //calculating the different between current time of event and previous time of event.
			 var diff_sec = Math.abs(diffSeconds);  
			 var hours = diff_sec/3600;  //Converting the seconds to hours for comparison with the limit value.
       if(limit < hours)  //If hours is more than limit we apent the message key with time of event for new event before being processed as alert. This will create a new alert with the updated message key , instead of updating a exisiting one. 
				{
				var m_key = event.message_key+'+'+event.time_of_event;
				event.setValue('message_key',m_key);
				} 
		}
	}
	// To abort event processing and ignore the event, return false;
	// returning a value other than boolean will result in an error
	return true;  
 
})(event, origEventSysId);
