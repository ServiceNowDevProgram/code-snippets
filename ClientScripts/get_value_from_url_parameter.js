//Isolate Script should be false

function onLoad() {
var url = top.location.href;
var ParamValue  = new URLSearchParams(url).get("<parameter_name>");
}
