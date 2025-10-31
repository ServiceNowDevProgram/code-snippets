//Add KB Article Link Dynamic Email Script to Notification
// This script assumes it is used in a notification triggered by the kb_knowledge table. 
//use this line to get KB Number ${mail_script:get_kbarticle_link}
//NOTE THE NAME OF THIS SCRIPT IS "get_kbarticle_link"IN EMAIL SCRIPTS TABLE _ "sys_script_email"


(function executeEmailScript(current, template) {
    // Construct the URL to the KB article

    var instanceURL = gs.getProperty('glide.servlet.uri'); // Get the instance URL
    var kbLink = instanceURL + "kb_view.do?sysparm_article=" + current.number; // Adjust based on your URL structure

    // Output the link in HTML format
    template.print('<a href="' + kbLink + '" target="_blank">' + current.number + '</a>');
})(current, template);
