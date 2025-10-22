(function runMailScript(/* GlideRecord */ current, /* TemplatePrinter */ template,
          /* Optional EmailOutbound */ email, /* Optional GlideRecord */ email_action,
          /* Optional GlideRecord */ event) {
  
   //Call Global Application - Script Include in Mail script
    var getReturnfromGlobalSI = new global.ScriptIncludeName().functionName();
    template.print(getReturnfromGlobalSI);
          
   //Call Scoped Application - Script Include in Mail script
    var getReturnfromScopedSI = new x_scope_name.ScriptIncludeName().functionName();
    template.print(getReturnfromScopedSI);
   
})(current, template, email, email_action, event);
