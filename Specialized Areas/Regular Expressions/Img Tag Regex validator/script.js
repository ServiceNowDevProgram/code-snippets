/*
This code will search for img tag in kb articles.
Regex Patterns:
<img : looks for <img in text 
\w : looks for any word character (equivalent to [a-zA-Z0-9_])
\W looks for any non-word character (equivalent to [^a-zA-Z0-9_])
> : looks for character >
*/
var kbArt = new GlideRecord('kb_knowledge');
kbArt.addEncodedQuery('workflow_state=published'); // encoded get publiushed acticles.
kbArt.query();
while (kbArt.next()) {
    var imgRegex = /<img([\w\W]+?)>/; // Regex for checking img tag.
    var regex = new RegExp(imgRegex); // forming regex using SN.
    if (kbArt.getValue('text') && regex.test(kbArt.getValue('text'))) { // if article body is not empty and has image tag.
        gs.info("Image is found in KB Article: " + kbArt.getValue('number'));
    }
}
