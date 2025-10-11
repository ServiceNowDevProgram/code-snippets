var old_reference = "Service desk"; // Old group name
var new_reference = "Help desk"; // New group name

var regexPattern = new RegExp('(?is)'+ old_reference, 'gi'); // Building Regex to generate case-insensitive pattern

var kb_article = new GlideRecord('kb_knowledge');
kb_article.addEncodedQuery('workflow_state=published');
kb_article.query();
while(kb_article.next()){
	kb_article.text = kb_article.text.replace(regexPattern,new_reference); // Replacing the old group reference with the new group
	kb_article.setWorkflow(false);
	kb_article.update();
	gs.info('Updated Article: ' + kb_article.number);
}
