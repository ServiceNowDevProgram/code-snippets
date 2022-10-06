So the script "setting future week dates" is used to set a date field on a record to a future value and use that to trigger reminders to end users
or external customers. 

In the use case for the script a field called Next Notification Date is ona case record and is set to 3-day increments, and checks if the resulting value
falls on a weekend, and if it does sets the date to the following Monday.

If the date falls on a Sat 2 days are added, and if it falls on a Sunday 1 day is added.

Using this process a flow can be run each day to scan all the case records that have a notification date for the current day and a notification be sent
to the case contact.
