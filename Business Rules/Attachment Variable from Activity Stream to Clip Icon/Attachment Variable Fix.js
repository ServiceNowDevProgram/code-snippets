//Run this Business Rule async Insert on the sc_req_item table if using the attachment type variable in a Catalog Item
(function executeRule(current, previous /*null when async*/) {
    var gr = new GlideRecord("sys_attachment");
	  gr.addQuery("table_name", "ZZ_YY" + current.getTableName());
	  gr.addQuery("table_sys_id", current.sys_id);
	  gr.query();
	  while (gr.next()) {
		    gr.table_name = current.getTableName();
		    gr.update();
      	
	  }
})(current, previous);
