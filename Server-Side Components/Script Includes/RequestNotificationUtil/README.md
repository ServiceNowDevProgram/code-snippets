If a Request is rejected through Employee Center, the rejection notes get added to the RITM record rather than the Approval record. Therefore, the OOB reject notification does not contain the rejection comments. 
RequestNotificationUtil is used in reject_reason_new notification email script to pull RITM reject reason (if available)
