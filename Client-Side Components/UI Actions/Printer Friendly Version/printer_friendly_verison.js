printView()

function printView() {

  var table = g_form.getTableName();
  var recordID = g_form.getUniqueValue();
  var view = {{Insert the view you want to print here}}; //You can pass in an empty string and it will still work
  var windowName = {{Insert the name you want your window to display}}; //You can pass in an empty string and it will still work
  var features = 'resizeable,scrollbar'; //You can pass in an empty string and it will still work
  var urlString = '/' + table + ".do?sys_id=" + recordID + "&sysparm_view=" + view + "&sysparm_media=print";
  var noStack = true; //Flag that indicates whether to append sysparm_stack=no to the URL

  g_navigation.openPopup(urlString, windowName, features, noStack);

}
