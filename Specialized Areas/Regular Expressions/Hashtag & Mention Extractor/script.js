(function() {

    var demoData = "Quick test for hashtag and mention extraction in ServiceNow. " +
                   "Let's make sure it catches #Hack4Good #ServiceNow #regex and mentions like @ivan and @servicenow.";

    // ---------------------------------------------
    // Useful regex patterns (for future extension):
    // - Hashtags:        /#[A-Za-z0-9_]+/g
    // - Mentions:        /@[A-Za-z0-9_]+/g
    // - Emails:          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    // - Ticket refs:     /INC\d{7}/g (e.g., INC0012345)
    // ---------------------------------------------

    // Separate regex patterns for clarity
    var hashtagRegex = /#[A-Za-z0-9_]+/g;
    var mentionRegex = /@[A-Za-z0-9_]+/g;
    
    // Match both types
    var hashtags = demoData.match(hashtagRegex);
    var mentions = demoData.match(mentionRegex);

    if (hashtags.length > 0) {
        gs.info('Found ' + hashtags.length + ' hashtags: ' + hashtags.join(', '));
    } else {
        gs.info('No hashtags found.');
    }

    if (mentions.length > 0) {
        gs.info('Found ' + mentions.length + ' mentions: ' + mentions.join(', '));
    } else {
        gs.info('No mentions found.');
    }

})();
