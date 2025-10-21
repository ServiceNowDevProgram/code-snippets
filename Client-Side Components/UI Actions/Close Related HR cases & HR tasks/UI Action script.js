// Demo- OnClick function to execute
function demo() {
    var ga = new GlideAjax('sn_hr_core.close_items');
    ga.addParam('sysparm_name', 'getRelatedItems');
    ga.addParam('sysparm_case_id', g_form.getUniqueValue());
    ga.getXMLAnswer(function(response) {
      // If there exist related items
        var items = JSON.parse(response);
        if (items.length > 0) {
            var msg = "This case has related items:\n";
            items.forEach(function(item) {
                msg += "- " + item.type + ": " + item.number + "\n";
            });
            msg += "\nDo you want to close them as well?";
            if (confirm(msg)) {
        // close current HR case
				g_form.setValue('state', '3');
				g_form.save();
            }
        } else {
          // If no related item is associated
            if (confirm("No related items found. Close this case?")) {
                g_form.setValue('state', '3');
                g_form.save();
            }
        }
    });
}
