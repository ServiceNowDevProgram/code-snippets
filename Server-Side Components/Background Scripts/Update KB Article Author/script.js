var kbGr = new GlideRecord("kb_knowledge");
kbGr.addEncodedQuery("author=62826bf03710200044e0bfc8bcbe5df1"); //Update this filter as required
kbGr.query();
while(kbGr.next())
{
	kbGr.author = '6816f79cc0a8016401c5a33be04be441';  //Update with new Author details
	kbGr.update();
}
