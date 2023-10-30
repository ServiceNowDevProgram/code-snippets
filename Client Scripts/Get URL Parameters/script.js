function onLoad() {
//Type appropriate comment here, and begin script below

if(window == null){ // For Service Portal
var url = top.location.href;
var value = new URLSearchParams(url).get('sysparm_id'); //provide the parameter name
console.log(value);
}
else{ //For Native UI
var glideURL = new GlideURL();
glideURL.setFromCurrent();
var id = glideURL.getParam("sysparm_id"); // provide the parameter name
console.log(id);
}
}
