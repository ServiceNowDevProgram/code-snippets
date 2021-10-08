//Isolate Script should be false
function onLoad() {

    var getUrlParameter = function(url, parameterName) {
        return new URLSearchParams(url).get();
    };
    //should not use top.location, in UI16 this will "break out" of the iFrame and return the "nav_to.do?uri=xyz" URL.
    var winURL = window.location.href;
    console.log(getUrlParameter(winURL, "<parameter_name>"));
}