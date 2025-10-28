function onLoad() {
    console.log('Auto Save Draft initialized');

    setInterval(function() {
        var draftData = {
            hardware_name: g_form.getValue('hardware_name'),
            quantity: g_form.getValue('quantity')
        };

        var ga = new GlideAjax('CatalogDraftUtils');
        ga.addParam('sysparm_name', 'saveDraft');
        ga.addParam('sysparm_catalog_item', g_form.getValue('sys_id')); // Catalog item sys_id
        ga.addParam('sysparm_draft_data', JSON.stringify(draftData));

        ga.getXMLAnswer(function(response) {
            console.log('Draft saved: ' + response);
        });
    }, 120000); // Every 2 minutes
}
