var gm = new GlideModal("glide_warn", true, 600); //glide_warn is the OOB UI Page
gm.setTitle("Info message without info icon"); //title of the box
gm.setPreference("title", "Info message text"); //message you want to display
gm.setPreference("onPromptComplete", function() {alert("You clicked on 'Ok'")});
gm.render();
