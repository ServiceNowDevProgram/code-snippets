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
    setEmailProperties();

    gs.print("Applied " + thisInstance + " Configurations");

}

function setEmailProperties() {
    //disable email notifications
    gs.setProperty("glide.email.read.active", true);
    gs.setProperty("glide.email.smtp.active", false);

    //Sets outbound email to test inbox
    gs.setProperty("glide.email.test.user", emailRedirect);

    var afterEmailProperty = gs.getProperty("glide.email.test.user");
    gs.print("The test email account has been set to " + afterEmailProperty + ".");
}