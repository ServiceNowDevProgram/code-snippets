(function executeRule(current, previous /*null when async*/ ) {

    // This inspects each of the recipient fields (To, CC, BCC) and strips out any
    // email addresses that were present on the most recently recieved email reply

    // stripRecipients() returns an object with two key/value pairs:
    // newList - List of "safe" addresses, checked against the prevRecipients
    // badAddress - True/false, true if any "bad" addresses were removed. - (not currently used)
    function stripRecipients(targetField, blackList) {

        // Establish an array of current recipients:
        var arrRecipients = [];
        arrRecipients = targetField.toLowerCase().split(',');

        // Establish an array of revised recipients:
        var revisedRecipients = new ArrayUtil();
        revisedRecipients = revisedRecipients.diff(arrRecipients, blackList);

        // Flag if we have "bad" recipients:
        var foundBad = false; // Not currently used

        // Return the results as an object:
        var objResults = {
            "newList": revisedRecipients,
            "badAddress": foundBad // Not currently used
        };

        return objResults;
    }

    // Check if current email is triggered from an email reply:
    var table = current.getValue('target_table');
    var ticket = new GlideRecord(table);
    ticket.get(current.getValue('instance'));

    var notes = ticket.comments.getJournalEntry(1).split('\n'); // gather most recent comment and split each new line into a new array
    if (notes[1].indexOf('reply from:') == 0) { // check first new line and if it starts with 'reply from:', do the following...

        // Get the previous recipients we want to exclude:
        var prevRecipients = [];
        var inboundEmail = new GlideRecord('sys_email');
        inboundEmail.addQuery('instance', current.getValue('instance'));
        inboundEmail.addQuery('type', 'received');
        inboundEmail.orderByDesc('sys_created_on');
        inboundEmail.setLimit(1);
        inboundEmail.query();
        if (inboundEmail.next()) {
            prevRecipients = inboundEmail.getValue('recipients').toLowerCase().split(',');
        }

        // Take a copy of the original recipients for use later:
        var curRecipients = 'TO:' + current.getValue('direct') +
            ', CC:' + current.getValue('copied') +
            ', BCC:' + current.getValue('blind_copied');

        // Check each recipient field, and strip out duplicate addresses:
        var toResults;
        var ccResults;
        var bccResults;
        var recipientResults;

        if (current.direct) {
            toResults = stripRecipients(current.getValue('direct'), prevRecipients);
            current.setValue('direct', toResults.newList.toString());
        }
        if (current.copied) {
            ccResults = stripRecipients(current.getValue('copied'), prevRecipients);
            current.setValue('copied', ccResults.newList.toString());
        }
        if (current.blind_copied) {
            bccResults = stripRecipients(current.getValue('blind_copied'), prevRecipients);
            current.setValue('blind_copied', bccResults.newList.toString());
        }
        if (current.recipients) {
            recipientResults = stripRecipients(current.getValue('recipients'), prevRecipients);
            current.setValue('recipients', recipientResults.newList.toString());
        }

        // If no recipients remain, don't send the email:
        if (!current.recipients && !current.blind_copied && !current.copied && !current.direct) {
	    current.setValue('state', 'ignored');
            current.setValue('type', 'send-ignored');
        }
    }

})(current, previous);
