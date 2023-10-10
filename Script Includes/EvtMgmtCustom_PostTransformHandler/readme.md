## EvtMgmtCustom_PostTransformHandler Script Include

I came across a requirement where we wanted to a create a new alert/incident when the same event is encountered after a certain amount of time, even if the existing alert/incident are still open. OOTB if this is the case and same event comes into the system, it will go ahead and append it to the existing alert. 

So, I made the EvtMgmtCustom_PostTransformHandler as active and scripted the code as per my requirement, here I query for an existing event based on certain parameters(check script) and if a event is found, I calculate the difference between current time of event and previous time of event. If difference is more than desired limit, I apent the message key with time of event for new event before being processed as alert. This will create a new alert with the updated message key and create a new incident.

Note: This script is present in the system to make any changes to the alert which will be created out of this Event. The Event itself is immutable, and will not be changed in the database

