This background script deletes all records from the incident table having state=7 and urgency=3
This background script also deletes all records from change_request table having priority=3 and impact=2.
It uses the bulkDelete() function to execute the deletion.
