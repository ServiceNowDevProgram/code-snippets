// This example demonstrates how it is possible to see the generated SQL query without enabling the SQL debug feture in the navigator
try {
	gs.trace(true);
	var incGr = new GlideRecord("incident");
	incGr.setLimit(10);
	incGr.orderByDesc("sys_created_on");
	incGr.query();
  // TODO any other logic comes here...
}
finally {
	gs.trace(false);
}
