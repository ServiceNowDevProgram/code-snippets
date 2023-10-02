function onLoad() {
//Type appropriate comment here, and begin script below
// PROBLEM FACED WITH //if(window==null)
// **1.In a standard browser environment, window is a global object representing the browser window. Checking window == null typically evaluates to false because window exists.
// 2.In a Node.js environment, window is not defined, and checking window == null will usually evaluate to true because window is not defined, and null represents the absence of an object.
// 3.In certain contexts or JavaScript runtimes (e.g., in some server-side environments), window might be defined differently or not at all, leading to varying results when checking window == null.
// 4.he behavior you mentioned, where window == null evaluates to true when the isolate script flag is set to false, could be specific to certain JavaScript environments or configurations. The exact behavior may vary**

// SOLUTION OF //if(window==null)
// This code will run in non-browser environments (including isolated scripts in PDI)
if(typeof window !== 'undefined' && typeof document !== 'undefined'){ // For Service Portal
 // For Service Portal
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
