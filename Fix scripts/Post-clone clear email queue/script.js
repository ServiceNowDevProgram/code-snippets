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
    clearEmailQueue();

    gs.print("Applied " + thisInstance + " Configurations");

}

function clearEmailQueue() {
    // Clear out the email queue
    var ignoreEmail = new GlideRecord('sys_email');
    ignoreEmail.addQuery('type', 'send-ready');
    ignoreEmail.query();
    while (ignoreEmail.next()) {
        ignoreEmail.type = 'send-ignored';
        gs.print('Email ' + ignoreEmail.subject + ' ignored');
        ignoreEmail.update();
    }
    gs.print("Email queue cleared!");
}