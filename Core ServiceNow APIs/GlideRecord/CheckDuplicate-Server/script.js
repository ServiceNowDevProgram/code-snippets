var dupCount = 0;
var gr = new GlideRecord("cmdb_ci_server");
//gr.addQuery("name", "value");
gr.addEncodedQuery("sys_class_name=cmdb_ci_server");
gr.query();
while (gr.next()) {
   var dup = new GlideRecord("cmdb_ci_computer");
	dup.addQuery("name", gr.name);
	dup.addQuery("sys_class_name", "!=", "cmdb_ci_server");
	dup.query();
	if (dup.next()) {
		gs.log("\t" + gr.name + "\t" + dup.sys_class_name);
		dupCount++;
	}

}
gs.log("dup count=" + dupCount);
