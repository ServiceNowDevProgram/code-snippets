//Called when the form loads
addLoadEvent(function () {
  //Load the groups when the form loads
  slush.clear();
  var ajax = new GlideAjax("example_ajax_call"); // Can use this to get values to fill the slushbucket
  ajax.addParam("sysparm_example", "example");
  ajax.getXML(loadResponse);
  return false;
});

//Called when we get a response from the 'addLoadEvent' function
function loadResponse(response) {
  //Process the return XML document and add groups to the left select
  var xml = response.responseXML;
  var e = xml.documentElement;
  var items = xml.getElementsByTagName("item");
  if (items.length == 0) return;
  //Loop through item elements and add each item to left slushbucket
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    slush.addLeftChoice(
      item.getAttribute("example"),
      item.getAttribute("example_2") +
        ": " +
        item.getAttribute("example_3") +
        ": " +
        item.getAttribute("example_4")
    ); //This is what will be displayed in the left side of the slushbucket
  }
}
