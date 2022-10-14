(function runMailScript(/* GlideRecord */ current, /* TemplatePrinter */ template,
          /* Optional EmailOutbound */ email, /* Optional GlideRecord */ email_action,
          /* Optional GlideRecord */ event) {
  
   //Call Scoped Application - Script Include in Mail script
    var portalSuffix = new sn_ex_emp_fd.FoundationNotificationUtil().getPortalSuffix();
  template.print(portalSuffix);
   
   //Call UI Message in Mail script
    var buttonText = gs.getMessage('View request');
  template.print(portalSuffix);
    
  //Call Global Application - Script Include in Mail script
    var requestNotificationJs = new global.RequestNotificationUtil();
    requestNotificationJs.createNotificationPrimayAction(template, requestUrl, buttonText);
 
   //Call System Property in Mail script
    var priceDisplay = gs.getProperty('glide.sc.price.display');
     
   
})(current, template, email, email_action, event);
