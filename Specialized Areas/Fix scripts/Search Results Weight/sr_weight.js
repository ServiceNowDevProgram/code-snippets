var qSet = "leave,maternity"; //Search values


var q = qSet.split(",");
var message = "";
q.sort();

for (var i=0;i<q.length;i++)
{
	
	message =  message + "\n~~" + q[i];
	
	var sc = new GlideRecord('sc_cat_item');
	sc.addQuery('123TEXTQUERY321', q[i]);
	sc.addQuery('active',true);
	sc.addQuery('sys_class_name', 'NOT IN', 'sc_cat_item_wizard,sc_cat_item_content');
	sc.query();
	message =  message + "\n~~~~ FORMS RESULTS " + q[i] + "("+ sc.getRowCount() +")";
	while (sc.next()) 
	{
		message = message + "\n~~~~~~~~ " +  sc.ir_query_score   + " " + sc.name;	
	}
	
	var kb = new GlideRecord('kb_knowledge');
	kb.addQuery('123TEXTQUERY321', q[i]);
	kb.addQuery('workflow_state', 'published');
	kb.addNotNullQuery('text');	// tier 0 ans
	kb.setLimit(20);
	//kb.addQuery(getAgencyName(), true);
	kb.query();
	message =  message + "\n~~~~ KNOWLEDGE RESULTS " + q[i] + "("+ kb.getRowCount() +")";
	while (kb.next()) 
	{
		message = message + "\n~~~~~~~~ " +  kb.ir_query_score   + " " + kb.number + " " + kb.short_description;	
	}	
}


gs.log(message,"Search Results");
