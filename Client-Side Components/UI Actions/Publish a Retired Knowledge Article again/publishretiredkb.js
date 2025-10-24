var kbArticle = new GlideRecord('kb_knowledge');
kbArticle.setWorkflow(false);
kbArticle.addQuery('article_id', current.article_id);
kbArticle.addQuery('sys_id', "!=", current.sys_id); //articles that are not the current one
kbArticle.addQuery('workflow_state', 'retired');
kbArticle.query();
while (kbArticle.next()) {
    kbArticle.workflow_state = 'outdated';  //setting the articles as outdated
    kbArticle.update();
}
current.workflow_state = 'published';  //publishing retired kb article again
current.published = new GlideDate();
current.retired = "";  //clearing retired field value
current.update();
action.setRedirectURL(current);
