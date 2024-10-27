// Create a GlideRecord object for the 'sys_email' table
var emailGR = new GlideRecord('sys_email');

// Query for the emails you want to ignore (adjust the query as needed)
emailGR.addQuery('state', 'ready'); // only those mails which are ready to send
emailGR.addEncodedQuery("sys_created_onONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()"); // Optional query to set timeline if not required we can comment this.
emailGR.query();

// Loop through the results and mark them as 'Ignored'
while (emailGR.next()) {
    emailGR.state = "ignored"; //setting state to "ignored"
    emailGR.type = 'send-ignored'; // Set the type to 'ignored'
    emailGR.update(); // Save the changes
}

gs.info('All relevant emails have been marked as ignored.');
