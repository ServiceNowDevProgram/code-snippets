After finding that reject reasons added from Employee Center for Requests do not get added to the Approval record but instead the RITM record, I made a change to the reject_reason email script to include the RITM reject reason (if found)
The changes calls the Script Include "RequestNotificationUtil" with an added function to call the RITM reject reason
