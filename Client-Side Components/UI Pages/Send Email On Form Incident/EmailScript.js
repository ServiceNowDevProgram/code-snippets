// Email is been used to set the cc and subjed where we got from the UI Page and this will be attached to the Notification to run dymanically


(function runMailScript( /* GlideRecord */ current, /* TemplatePrinter */ template,
    /* Optional EmailOutbound */
    email, /* Optional GlideRecord */ email_action,
    /* Optional GlideRecord */
    event) {


    // In this we get the data in the 4th parameter so that we use the parm2 to get the object of data and the used in the certain purpose
    
    var obj = JSON.parse(event.parm2);
    email.addAddress("cc", obj.cc);
    email.setSubject(obj.subject);

    template.print(" <h5 style='margin: 0px;'>Hi Team,</h5><br><p>Details are : </p>" + obj.body);

})(current, template, email, email_action, event);