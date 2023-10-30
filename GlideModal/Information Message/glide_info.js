var gm = new GlideModal("glide_info", true, 600); // glide_info is the OOB ui page.
gm.setTitle("Info box"); //title of your info box
gm.setPreference("title", "Welcome to ServicNow using GlideModal info box"); //Message shown in the info box
gm.setPreference("onPromptComplete", function() {alert("You clicked on 'Ok'")});
gm.render();
