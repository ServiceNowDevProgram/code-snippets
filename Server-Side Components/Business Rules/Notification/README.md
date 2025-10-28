Trigger: This business rule runs after a new incident is inserted into the Incident table.
Check: It checks if the record is new using current.isNewRecord().
User Lookup: It retrieves the assigned user’s record using GlideRecord.
Message Preparation: It constructs a message indicating a new incident has been assigned.
Event Queue: Finally, it uses gs.eventQueue to send the notification event.
