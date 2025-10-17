function onLoad() {
  var user = g_user.userID;
  var itemID = g_form.getUniqueValue();

  var ga = new GlideAjax('GetRecentRequestValues');
  ga.addParam('sysparm_name', 'getValues');
  ga.addParam('sysparm_user', user);
  ga.addParam('sysparm_item', itemID);
  ga.getXMLAnswer(function(response) {
    var data = JSON.parse(response);
    if (data && data.found) {
      var confirmFill = confirm("We found a similar request. Do you want to autofill fields?");
      if (confirmFill) {
        for (var field in data.values) {
          if (g_form.getControl(field)) {
            g_form.setValue(field, data.values[field]);
            console.log("Set " + field + " to " + data.values[field]);
          } else {
            console.log("Field not found: " + field);
          }
        }
      }
    } else {
      console.log("No previous request found.");
    }
  });
}
