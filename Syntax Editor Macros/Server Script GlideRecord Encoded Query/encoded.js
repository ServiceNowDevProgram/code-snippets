var queryStr = 'active=true';
var gr = new GlideRecord("$0");
gr.addEncodedQuery(queryStr);
gr.query();

while (gr.next()) {
   // Do something with the record(s) returned
}