
// Type: onLoad | Table: incident
function onLoad() {
  var hr = new Date().getHours();
  var msg = (hr < 12) ? "Good Morning!" : (hr < 18) ? "Good Afternoon!" : "Good Evening!";
  g_form.addInfoMessage(msg + " Please provide the details of your issue.");
}
