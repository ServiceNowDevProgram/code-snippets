(function() {

    var demoData = "Quick test for hashtag and mention extraction in ServiceNow. " +
                   "Let's make sure it catches #Hack4Good #ServiceNow #regex and mentions like @ivan and @servicenow.";

    var tagRegex = /[#@][A-Za-z0-9_]+/g;
    var matches = demoData.match(tagRegex);

    if (matches && matches.length > 0) {
        gs.info('Found ' + matches.length + ' tags: ' + matches.join(', '));
    } else {
        gs.info('No hashtags or mentions found.');
    }

})();
