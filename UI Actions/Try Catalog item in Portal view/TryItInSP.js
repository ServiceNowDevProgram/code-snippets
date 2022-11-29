
tryitinsp();
function tryitinsp() {
    var portal = "sp";  //the portal you want to use for testing	
	var page = g_form.getTableName();
    var gUrl = new GlideURL(portal); 
    gUrl.addParam("id", page); 
	gUrl.addParam("sys_id", g_form.getUniqueValue()); //add the sys_id of this Catalog Item to render

    //and then display the Catalog Item in a new tab/window
    g_navigation.open (gUrl.getURL(), "_blank");
}
