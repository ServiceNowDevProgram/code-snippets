var count = 0;
var maxFields = 30; //change to match your threshold/allowance
var frmGr = new GlideRecord('sys_ui_form');
frmGr.query();
while (frmGr.next()){
	count = 0;
	var frmsecGr = new GlideRecord('sys_ui_form_section');
	frmsecGr.addQuery('sys_ui_form', frmGr.sys_id);
	frmsecGr.query();
	while (frmsecGr.next()){
		var secGr = new GlideRecord('sys_ui_section');
		secGr.addQuery('sys_id', frmsecGr.sys_ui_section);
		secGr.query();
		while (secGr.next()) {
			var eleGr = new GlideRecord('sys_ui_element');
 			eleGr.addQuery('sys_ui_section', secGr.sys_id);
			eleGr.addNullQuery('type');
 			eleGr.query();
 			if (eleGr.next()) {
	 			count += eleGr.getRowCount();
			}
		}
	}
	if (count > maxFields) {
		gs.info('FORM FIELD SCRIPT: Fields on form ' + frmGr.name + ' = ' + count);
	}
}
