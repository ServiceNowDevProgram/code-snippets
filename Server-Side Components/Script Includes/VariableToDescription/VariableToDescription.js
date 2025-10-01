var VariablesToDescription = Class.create();
VariablesToDescription.prototype = Object.extendsObject(AbstractAjaxProcessor, {

	//For GlideAjax
    getDescriptionClient: function() {
        var ritm = this.getParameter('sysparm_ritm');
		var descStr = this.getDescription(ritm);
		return descStr;
    },
	
	//For ServerSide Access
	getDescription: function(ritm) {
        var descStr = '';
        var ritmGr = new GlideRecord("sc_req_item");
        if (ritmGr.get(ritm)) { //sys_id of RITM record
            descStr = ritmGr.getDisplayValue() + ': ' + ritmGr.cat_item.getDisplayValue() + '\n';
            descStr += this.getVariablesAsText(ritm);
        }
        return descStr;
    },

    getVariablesAsText: function(ritm) {
        var descStr = '';
        var ritmGr = new GlideRecord("sc_req_item");
        if (ritmGr.get(ritm)) { //sys_id of RITM record
            var varDataGr = new GlideRecord('sc_item_option_mtom');
            varDataGr.addQuery('request_item', ritmGr.getUniqueValue());
            varDataGr.orderBy('sc_item_option.order');
            varDataGr.query();

            var question_text = '';
            var answer_text = '';
            while (ritmGr._next()) {
                question_text = varDataGr.sc_item_option.item_option_new.getDisplayValue();
                answer_text = ritmGr.variables[varDataGr.sc_item_option.item_option_new.name].getDisplayValue();
                if (!gs.nil(answer_text)) {
                    descStr += question_text + ': ' + answer_text + '\n';
                } else {
                    descStr += question_text + ': \n';
                }
            }
        }
        return descStr;
    },

    type: 'VariablesToDescription'
});