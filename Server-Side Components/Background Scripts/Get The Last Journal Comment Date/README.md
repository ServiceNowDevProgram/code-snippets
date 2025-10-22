# Timestamp Extraction from Comment

This code snippet demonstrates how to extract a timestamp from a comment text and create a 'GlideDateTime' object from it.
It may be useful if you don't want to drill down to the 'sys_journal_field' table.

## How it Works

1. It retrieves the last comment from the journal using `record.comments.getJournalEntry(1)`.
2. It then uses regular expressions to search for a timestamp in the format `DD-MM-YYYY hh:mm:ss`.
3. If a timestamp is found, it creates a new `GlideDateTime` object from the matched timestamp.

```javascript
/* If your date has a different format you can replace the regex pattern with a new one */
var timestampMatch = commentText.match(/YOUR_REGEX_PATTERN/);
