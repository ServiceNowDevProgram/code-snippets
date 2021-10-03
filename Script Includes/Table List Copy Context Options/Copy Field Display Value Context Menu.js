//See readme for full setup
/**
  * Script executed on the Client for this menu action 
  *
  * The following variables are available to the script:
  *    'g_list' the GlideList2 that the script is running against (only valid for List context menus)
  *    'g_fieldName' the name of the field that the context menu is running against (only valid for List context menus)
  *    'g_sysId' the sys_id of the row or form that the script is running against
  *    'rowSysId' is also set to the sys_id of the row to support legacy actions, but g_sysId is preferred
  */
 runContextAction();

 function runContextAction() {
     var ga = new GlideAjax('ListCopyOptions'); 
     ga.addParam('sysparm_name','getDisplayValue'); 
     ga.addParam('sysparm_sys_id', g_sysId); 
     ga.addParam('sysparm_table', g_list.getTableName());
     ga.addParam('sysparm_field', g_fieldName);
     ga.getXML(updateContext); 
     
     function updateContext(response){
         var answer = response.responseXML.documentElement.getAttribute("answer"); 
         copyToClipboard(answer); 
     }
 }