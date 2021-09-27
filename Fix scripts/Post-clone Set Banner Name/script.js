//define the email redirect here, just in case any emails get through...
var emailRedirect = "";
//define the instance names here
var devInstance = "";
var testInstance = "";
var learnInstance = "";
var prodInstance = "";
var extraInstance = ""

//get this instance's name
var thisInstance = gs.getProperty("instance_name");

switch (thisInstance) {
    case devInstance:
        setConfig();
        break;
    case extraInstance:
        setConfig();
        break;
    case testInstance:
        setConfig();
        break;
    case learnInstance:
        setConfig();
        break;
    case prodInstance:
        gs.print("**** You're running this script in production, are you asking for trouble?");
        break;
    default:
        gs.print("**** I don't understand what this instance is for: " + thisInstance);
}

function setConfig() {
    setHeaderName();

    gs.print("Applied " + thisInstance + " Configurations");

}

function setHeaderName() {
    //set header name

    //get the current date
    var glideDate = GlideDate();
    gs.info(glideDate.getByFormat("dd-MM-yyyy"));
    var instance = gs.getProperty("instance_name");
    //set the "glide.product.description" property based on the instance suffix and current date to display in the banner frame
    gs.setProperty("glide.product.description", "ServiceNow Environment (Cloned on " + glideDate.getDisplayValue().replace(" ", " @ ") + ")");

    var finalHeader = gs.getProperty("glide.product.description");
    gs.print("Header set to " + finalHeader + ".");
}