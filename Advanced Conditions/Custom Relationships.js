var ge = new GlideEncrypter();

var gr = new GlideRecord("table_name"); //table_name to be replaced
gr.addQuery("sys_id", "sys_id_value_of_record"); //sys_id_value_of_record to be replaced
gr.query();
if (gr.next()) {
   var bc=  ge.decrypt( gr.password );
gs.print(bc);
}
