/*
This script should be placed in the UI action on the table kb_knowledge form view.
This UI action should be marked as client.
Use validateLinksInArticle() function in the Onclick field.
*/

function validateLinksInArticle() {
    var articleSysId = g_form.getUniqueValue();
    var gdw = new GlideDialogWindow('validate_links_dialog');
    gdw.setTitle('Validate Article Links');
    gdw.setPreference('sysparm_article_id', articleSysId);
    gdw.render();
}
