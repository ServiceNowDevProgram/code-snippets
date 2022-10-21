var journalFieldName = 'comments';
var journalText = current[journalFieldName]
	.getJournalEntry(1)
	.trim()
	.split('\n')
	.slice(1)
	.join('<br />\n');