function onLoad() {
    //Type appropriate comment here, and begin script below
    var arr = [];
    for (var i = 0; i < g_form.elements.length; i++) {
        arr.push(g_form.elements[i].fieldName);
    }
    alert("Hi Sai, please find the form elements: " + arr.join(","));
}
