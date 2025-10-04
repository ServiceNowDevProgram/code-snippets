function onLoad() {
    //Type appropriate comment here, and begin script below

    if (typeof spModal != "undefined") { // For Service Portal
        var url = top.location.href;
        var value = new URLSearchParams(url).get("sys_id"); //provide the parameter name
        console.log(value);
    } else { //For Native UI
        var glideURL = new GlideURL();
        glideURL.setFromCurrent();
        var id = glideURL.getParam("sysparm_id"); // provide the parameter name
        console.log(id);
    }
}
