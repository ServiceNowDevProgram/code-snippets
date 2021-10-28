function onLoad() {
      var param1 = getParameterValue('sysparm_*paramname*'); //uses below function to pull the param from URL. Make sure to replace *paramname* with proper param name

}

function getParameterValue(name) {
      var url = document.URL.parseQuery();
      if (url[name]) {
              return decodeURI(url[name]);
      } else {
              return;
      }
}