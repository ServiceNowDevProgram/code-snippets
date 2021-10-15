//Please refer to the readme file which contains all the steps necessary for this to properly work
//The below code is for use within the inbound action and should be placed at the point within your script where you'd like to generate the event which will trigger the notification

gs.eventQueue('event_name', current, email.from, ''); //replace event_name with the name of your event -- this script will take the inbound email "from" address and pass that as parm 1 with this event
