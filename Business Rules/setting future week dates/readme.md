So the script "setting future week dates" is used to set a date field on a record to a future value and use that to trigger reminders to end users
or external customers. 

The script addresses the use case where the first reminder is expected to be sent 14 days from case create and the rest of the reminders every 3 days, and should be sent only on weekdays.

If the future computed date falls on a Sat 2 days are added, and if it falls on a Sunday 1 day is added.

Using this process a flow can be run each day to scan all the case records that have a notification date for the current day and a notification be sent
to the case contact.
