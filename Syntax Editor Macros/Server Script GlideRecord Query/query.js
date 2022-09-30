var gr = new GlideRecord("$0");
gr.addQuery('field_name', 'field_value');
gr.query();

while (gr.next()) {
   // Do something with the record(s) returned
}