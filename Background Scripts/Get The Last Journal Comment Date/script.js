/* Get required record by sys_id */
var record = new GlideRecord('<table>');
record.get('<SYSID>');

/* Get the latest comment, replace comments with your journal field if required */
var commentText = record.comments.getJournalEntry(1);

/* Catch the timestamp out of it with regex */
var timestampMatch = commentText.match(/(\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}) -/);

/* If catched, created new DateTime out of it */
if (timestampMatch) {
    var parsedTimestamp = new GlideDateTime(timestampMatch[1]);
    gs.info("Timestamp: " + parsedTimestamp);
} else {
    gs.error("No timestamp found: " + commentText);
}
