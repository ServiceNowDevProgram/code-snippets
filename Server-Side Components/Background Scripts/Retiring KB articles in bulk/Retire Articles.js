var article = new GlideRecord("kb_knowledge");
article.addQuery("workflow_state","published");
article.addQuery("kb_knowledge_base","a7e8a78bff0221009b20ffffffffff17")  // Sys ID of the IT Knowledge base. You can provide the sys Id of any knowledge base.
article.query();
while(article.next()){
  article.workflow_state = "retired";
  article.update();
}
