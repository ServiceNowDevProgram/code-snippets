/************************************************************************************************************ 
 
          .         .
         ,8.       ,8.           ,o888888o.        ,o888888o.     8 888888888o  `8.`888b                 ,8'
        ,888.     ,888.         8888     `88.   . 8888     `88.   8 8888    `88. `8.`888b               ,8'
       .`8888.   .`8888.     ,8 8888       `8. ,8 8888       `8b  8 8888     `88  `8.`888b             ,8'
      ,8.`8888. ,8.`8888.    88 8888           88 8888        `8b 8 8888     ,88   `8.`888b     .b    ,8'
     ,8'8.`8888,8^8.`8888.   88 8888           88 8888         88 8 8888.   ,88'    `8.`888b    88b  ,8'
    ,8' `8.`8888' `8.`8888.  88 8888           88 8888         88 8 888888888P'      `8.`888b .`888b,8'
   ,8'   `8.`88'   `8.`8888. 88 8888   8888888 88 8888        ,8P 8 8888              `8.`888b8.`8888'
  ,8'     `8.`'     `8.`8888.`8 8888       .8' `8 8888       ,8P  8 8888               `8.`888`8.`88'
 ,8'       `8        `8.`8888.  8888     ,88'   ` 8888     ,88'   8 8888                `8.`8' `8,`'
,8'         `         `8.`8888.  `8888888P'        `8888888P'     8 8888                 `8.`   `8'

Script name: Post-clone script
Description: To be used as a fix script or background script, meant to help with small adjustments needed per-environment after a clone.
Notes: Make sure you fill in all of the instance names up top, with anything in your instance name before the [.service-now.com]
Author: MGOPW
https://mgopw.dev

************************************************************************************************************/

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
        devConfig();
        break;
    case extraInstance:
        extraConfig();
        break;
    case testInstance:
        testConfig();
        break;
    case learnInstance:
        learnConfig();
        break;
    case prodInstance:
        gs.print("**** You're running this script in production, are you asking for trouble?");
        break;
    default:
        gs.print("**** I don't understand what this instance is for: " + thisInstance);
}

function devConfig() {
    setEmailProperties();
    setHeaderName();
    clearEmailQueue();

    gs.print("Applied Dev Configurations");

}

function extraConfig() {
    setEmailProperties();
    setHeaderName();
    clearEmailQueue();

    gs.print("Applied Explore Configurations");

}


function testConfig() {
    setEmailProperties();
    setHeaderName();
    clearEmailQueue();
    deleteIdentitiesTable();
    gs.print("Applied Test Configurations");

}


function learnConfig() {
    setEmailProperties();
    setHeaderName();
    clearEmailQueue();

    gs.print("Applied Learn Configurations");

}

///// ACTION FUNCTIONS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setEmailProperties() {
    //disable email notifications
    gs.setProperty("glide.email.read.active", true);
    gs.setProperty("glide.email.smtp.active", false);

    //Sets outbound email to test inbox
    gs.setProperty("glide.email.test.user", emailRedirect);

    var afterEmailProperty = gs.getProperty("glide.email.test.user");
    gs.print("The test email account has been set to " + afterEmailProperty + ".");
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