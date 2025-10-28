function onLoad() {

    /*
     * work out the parent form based on platform and return the given MRVS data
     * This could go in a global UI script but that wouldn't work for Portal, 
     * would love anyone to suggest an alternative for portal :)
     */
    function getMRVSDataFromParent(mrvsName) {
        var parent_g_form = g_service_catalog.parent; // default for backend/platform
        if (parent.angular) {
            // this is portal so get a different way
            var parentItem = parent.angular.element(parent.$('#sc_cat_item').find('sp-variable-layout')[0]).scope();
            parent_g_form = parentItem.getGlideForm();
        }
        var vmData = parent_g_form.getValue(mrvsName);
        // on portal we get back an empty string rather than an empty array so convert
        return vmData == '' ? [] : JSON.parse(vmData);
    }

    var vmJSONData = getMRVSDataFromParent('virtual_machine');
    console.log("JSON " + JSON.stringify(vmJSONData, '', 3));
}
