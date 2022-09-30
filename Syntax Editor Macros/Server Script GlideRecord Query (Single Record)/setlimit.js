var gr = new GlideRecord('$0');
gr.addQuery('field_name', 'field_value');
gr.setLimit(1);
gr.query();

if(gr._next()) {
	//Your code goes here
}