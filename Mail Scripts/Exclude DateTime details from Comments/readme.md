//Retrieves the most recent comment (journal entry) from the comments field of the current record.
//We can call this notification email script in notifications to get the comments only excluding the name, date/time details.

current.comments.getJournalEntry(1)
//Extracting the Comment's Content (Removing Username/Date/Time):

.match(/\n.*/gm)
//Matches all text after the first newline (\n). In ServiceNow, journal entries typically start with a username, date, and time stamp followed by the comment text. This regex targets everything after the first line, effectively bypassing the username and timestamp.


.join('')
//Joins the matched lines back into a single string. The empty string ('') is used to remove any newlines in the matched parts.


.replace(/^\s*\n/gm, "")
//This removes any leading empty lines (^\s*\n) or unnecessary whitespace that may remain after removing the username/timestamp, ensuring the comment starts cleanly with actual content.


Result: The final output is the content of the most recent comment without the username, date, or time. This is useful for including clean, user-entered content in an email notification, without system-generated metadata like when the comment was added or who added it.
