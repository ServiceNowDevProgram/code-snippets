(function executeRule(current, previous /*null when async*/) {

var firstKbSysId = ""; // Store the sys_id of the first KB article
var secondKbSysId = ""; // Store the sys_id of the second KB article

// Query the kb_knowledge table for articles with the same number as the current record, ordered by version in descending order
var kbRecord = new GlideRecord("kb_knowledge");
kbRecord.addEncodedQuery("numberSTARTSWITH" + current.number); // Filter based on KB number
kbRecord.orderByDesc("version"); // Order by version in descending order
kbRecord.setLimit(2); // Limit to 2 records (first and second version)
kbRecord.query();

var count = 0;
while (kbRecord.next()) {
    count++;
    if (count == 1) {
        // Get the sys_id of the first KB article (latest version)
        firstKbSysId = kbRecord.getValue("sys_id");
    }
    if (count == 2) {
        // Get the version number and sys_id of the second KB article (previous version)
        secondVersionNumber = kbRecord.getValue("version");
        secondKbSysId = kbRecord.getValue("sys_id");
        break; // Stop the loop after fetching the second record
    }
}

// Get the instance URL from system properties
var instanceURL = gs.getProperty('glide.servlet.uri');

// Query the sys_ui_bookmark table to check if a bookmark exists with a URL containing the second KB article's sys_id
var bookmarkRecord = new GlideRecord("sys_ui_bookmark");
bookmarkRecord.addEncodedQuery("urlLIKE" + secondKbSysId); // Filter for URLs containing the second KB sys_id
bookmarkRecord.query();


if (bookmarkRecord.next()) {
    // If a bookmark is found, update the URL to point to the first KB article (latest version)
    var newUrl = instanceURL + "kb_knowledge.do?sys_id=" + firstKbSysId +
                 "&sysparm_record_target=kb_knowledge&sysparm_record_row=2" +
                 "&sysparm_record_rows=5&sysparm_record_list=numberSTARTSWITHKB99999999%5EORDERBYDESCversion";
    
    // Set the new URL in the bookmark record
    bookmarkRecord.setValue('url', newUrl);
    
    // Update the bookmark record
    bookmarkRecord.update(); 
}


})(current, previous);
