var gr = new GlideRecord('incident');
gr.addEncodedQuery('state!=7^state!=8'); // Removed redundant checks for NULL states
gr.query();
while (gr.next()) {
    var createdDate = gr.sys_created_on; // 2019-01-11 17:18:53
    var extractedDate = createdDate.getGlideObject(); // Use GlideDateTime to work with dates
    var todayDate = new GlideDateTime(); // Current date and time
    var ticketAge = todayDate.getNumericValue() - extractedDate.getNumericValue(); // Get age in milliseconds
    
    // Convert age from milliseconds to days
    var ticketAgeDays = Math.floor(ticketAge / (1000 * 60 * 60 * 24)); 
    gs.print('The age of the ticket ' + gr.number + ' is: ' + ticketAgeDays + ' days');
}

