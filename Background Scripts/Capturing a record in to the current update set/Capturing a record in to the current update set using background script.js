var gr = new GlideRecord('<table_name>');//in <table_name> provide the table name in which the record is present
gr.get('<sys_id of the record>');//in <sys_id of the record> provide the sys_id of the record which you need to capture in the update set
var gum = new GlideUpdateManager2(); //more details on GlideUpdateManager2 API is provided in the readme.md file
gum.saveRecord(gr);
