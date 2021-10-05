(function executeRule(current, previous /*null when async*/) {
	
	var gr = new GlideRecord("<table_name>");
	gr.addQuery("<unique_field>", current.<unique_field_name>);
	gr.query();
	if (gr.next()) {
		gs.addErrorMessage("Entry for this <field_name> already exists");
		current.setAbortAction(true);
	}
	
	
})(current, previous);
