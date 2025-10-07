  function onLoad() {
  // Switch Case code snippet using in ServiceNow

var category = g_form.getValue("category"); // It will capture the value of category field.

switch(category){
case "hardware": // if the value would be 'hardware' in category field.
g_form.addInfoMessage("Yes category is hardware") // This function will add a infomessage.
break; //This keyword is used to stop the execution inside a switch block.

case "software": // if the value would be 'software' in category field.
g_form.addInfoMessage("Yes category is software") // This function will add a infomessage.
break;

case "network": // if the value would be 'Network' in category field.
g_form.addInfoMessage("Yes category is Network") // This function will add a infomessage.
break;

case "database": // if the value would be 'Database' in category field.
g_form.addInfoMessage("Yes category is Database") // This function will add a infomessage.
break;
default: // This will execute only if the category field have the value apart from mentioned cases.
g_form.addInfoMessage("Oh! no category is something else") // This function will add a infomessage.
}
}
