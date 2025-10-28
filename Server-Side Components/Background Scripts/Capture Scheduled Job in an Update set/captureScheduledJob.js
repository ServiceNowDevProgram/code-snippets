var gr = new GlideRecord('sysauto_script');
gr.get('<sys_id of your scheduled job>');
var gum = new GlideUpdateManager2();
gum.saveRecord(gr);
