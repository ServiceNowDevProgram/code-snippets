function onLoad() {
    //Type appropriate comment here, and begin script below
    var catItem = g_form.getValue('cat_item'); //Sys Id of the Catalog Item

    var ga = new GlideAjax('CheckMRVSDetails'); // SI Name
    ga.addParam('sysparm_name', 'checkMRVS'); // Function Name
    ga.addParam('sysparm_itemID', catItem);
    ga.getXML(checkMRVS);

    function checkMRVS(response) {

        var answer = response.responseXML.documentElement.getAttribute("answer");
        if (answer == 'true') {
            g_form.setVariablesReadOnly(true);
        }

    }
}
