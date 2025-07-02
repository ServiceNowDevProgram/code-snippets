(function runMailScript(/* GlideRecord */ current, /* TemplatePrinter */ template,
          /* Optional EmailOutbound */ email, /* Optional GlideRecord */ email_action,
          /* Optional GlideRecord */ event) {
   
   //Call UI Message in Mail script
  
    var getUIMessage = gs.getMessage('World works with ServiceNow');
    template.print(getUIMessage);
  
 
   //Call System Property in Mail script
  
    var getSysProperty = gs.getProperty('sys_property_name');
    template.print(getSysProperty);
  
  })(current, template, email, email_action, event);
