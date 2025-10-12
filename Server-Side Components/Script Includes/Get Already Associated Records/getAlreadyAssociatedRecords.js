//Check if there is already record existing for a particular Issue to Item.

var getAlreadyAssociatedRecords = Class.create();
getAlreadyAssociatedRecords.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

	getSysIdsItem: function(issueId) {

		    var alreadyAssociatedContent = [];
        var gr = new GlideRecord('sn_grc_m2m_issue_item');
        gr.addQuery('sn_grc_issue', issueId);
        gr.query();

        while (gr.next()) {
            if (!gr.sn_grc_item.nil())
                alreadyAssociatedContent.push(gr.getValue('sn_grc_item').toString());
        }
        return alreadyAssociatedContent.join(',');

	},

    type: 'getAlreadyAssociatedRecords'
});
