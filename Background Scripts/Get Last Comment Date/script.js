/* Get required record by sys_id*/
var record = new GlideRecord('incident');
record.get('b1c4b18c8739f1108009ac1a0cbb35dc');

/* Get the latest comment */
var commentText = record.comments.getJournalEntry(1);

/* Catch the timestamp out of it */
var timestampMatch = commentText.match(/(\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}).*? -/);

/* If catched, created new DateTime out of it */
if (timestampMatch) {
    var parsedTimestamp = new GlideDateTime(timestampMatch[1]);
    gs.info("Parsed Timestamp: " + parsedTimestamp);
} else {
    gs.error("Timestamp not found in comment: " + commentText);
}
