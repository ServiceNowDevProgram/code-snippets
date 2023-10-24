var TestScriptInclude = Class.create();
TestScriptInclude.prototype = Object.extendsObject(AbstractAjaxProcessor, {

	getDocumentClass: function(){
		var sysId = this.getParameter("sysparm_sys_id");
		var gr = new GlideRecord("sysapproval_approver");
		if(gr.get(sysId)){
			return JSON.stringify({
				"table": gr.source_table.toString(),
				"document": gr.document_id.toString(),
				"title": gr.document_id.getDisplayValue()
			});
		}
	},

    type: 'TestScriptInclude'
});