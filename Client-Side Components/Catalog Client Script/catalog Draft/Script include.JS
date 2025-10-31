var CatalogDraftUtils = Class.create();
CatalogDraftUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    saveDraft: function() {
        var userId = gs.getUserID();
        var catalogItem = this.getParameter('sysparm_catalog_item');
        var draftData = this.getParameter('sysparm_draft_data');

        var gr = new GlideRecord('u_catalog_draft');
        gr.addQuery('user', userId);
        gr.addQuery('catalog_item', catalogItem);
        gr.query();
        if (gr.next()) {
            gr.variables_json = draftData;
            gr.last_saved = new GlideDateTime();
            gr.update();
        } else {
            gr.initialize();
            gr.user = userId;
            gr.catalog_item = catalogItem;
            gr.variables_json = draftData;
            gr.last_saved = new GlideDateTime();
            gr.insert();
        }
        return 'Draft saved successfully';
    },
    type: 'CatalogDraftUtils'
});
