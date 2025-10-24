(function runMailScript(current, template, email, email_action, event) {

    current.comments.getJournalEntry(1).match(/\n.*/gm).join('').replace(/^\s*\n/gm, ""); //getting the comments without the username,date/time

})(current, template, email, email_action, event);
