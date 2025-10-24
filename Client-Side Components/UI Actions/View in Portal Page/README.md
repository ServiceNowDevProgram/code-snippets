code-snippet used in UI Action SCript to view the current record in Service Portal Page using a redirect

Example:
//to view a KB article in the Service Portal:

function goToPortal(){
	var url = 'sp?id=kb_article_view&sys_kb_id=' + g_form.getUniqueValue();
	g_navigation.openPopup(url);
	//g_navigation.open(url);
	return false;
}
