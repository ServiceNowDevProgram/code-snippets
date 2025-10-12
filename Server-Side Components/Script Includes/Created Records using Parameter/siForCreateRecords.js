var issueAssociationinRL = Class.create();
issueAssociationinRL.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

	createRisk: function(){
		var itemIds = this.getParameter('sysparm_item_ids');
		var issueId = this.getParameter('sysparm_issue_id');
		var result={};

		itemIds = itemIds.split(',');
        if (itemIds.length == 1 && itemIds[0] == ''){
             result.error = gs.getMessage('Missing Risk');
			}

		for(i=0; i<itemIds.length; i++){
			var mapping = new GlideRecord('sn_grc_m2m_issue_item');
			mapping.initialize();
			mapping.sn_grc_issue = issueId;
			mapping.sn_grc_item = itemIds[i];
			mapping.insert();
		}
		result.count = itemIds.length;
		return JSON.stringify(result);

	},

    type: 'issueAssociationinRL'
});
