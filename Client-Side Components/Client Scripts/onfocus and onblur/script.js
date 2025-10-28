g_form.getElement("Field Name").onfocus = focus;
g_form.getElement("Field Name").onblur = blur;
}

//function definition 

function focus() {
  g_form.showFieldMsg("Field Name", "Message you want to display");
}

function blur() {
  g_form.hideFieldMsg("Field Name");
}
