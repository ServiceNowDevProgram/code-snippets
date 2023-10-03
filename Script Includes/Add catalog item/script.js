function addAppliesToCatalogItemOnCatalogClientScript() {
    var catalogClientScript = new sn_sc.CatalogClientScript();
    catalogClientScript.setAttributes({"name":"NAME_OF_THE_SCRIPT", "applies_to": "item", "ui_type": "desktop", "type": "onLoad"});
	catalogClientScript.addScript("function onLoad(){Enter the script}");
	catalogClientScript.appliesToCatalogItem(true);
    var catalogClientScriptId = catalogClientScript.create();
	return catalogClientScriptId;
}