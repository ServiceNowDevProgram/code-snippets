var gr = new GlideRecord("$0");
gr.addQuery('field_name', 'field_value');
gr.query();
while (gr.next()) {
	gr.setValue('field_name', 'field_value'); //set field values
    gr.update();
}