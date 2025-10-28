var gm = new GlideModal("glide_confirm", false, 600); // glide_confirm is the OOB prebuilt UI page.
gm.setTitle("Conform box title"); // The title for your confirm message box
gm.setPreference("title", "confirm box body"); // this will be the body for your confirm message
gm.setPreference("warning", "false"); // put it true if you want to display a warning sign on your confirm box
gm.setPreference("onPromptSave", function() {alert("You clicked on 'Save'")});
gm.setPreference("onPromptDiscard", function() {alert("You clicked on 'Don't save'")});
gm.setPreference("onPromptCancel", function() {alert("You clicked on 'Cancel'")});
gm.render();
