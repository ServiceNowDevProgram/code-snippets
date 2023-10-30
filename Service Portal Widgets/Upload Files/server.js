(function() {
	data.response = '';
	if(input.record){
		var gr = new GlideRecord(input.table);
		gr.addQuery('number',input.record);
		gr.query();
		if(gr.next()){
			data.rec_sysid = gr.sys_id.toString();
			data.response = 'success';
		}
	}

})();