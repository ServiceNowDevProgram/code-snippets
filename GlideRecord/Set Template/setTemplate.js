var rec = useTemplate('incident','4d094f142f6bf01020a42ea62799b6cd'); // pass 2 parameters - 1) Name of table on which templateis to be applied 2) sys id of the template
gs.info(rec);              // returns the sys id of newly created record with applied template values

function useTemplate(tblName,template_sysid){ 
    var tmp = new GlideRecord(tblName);      
    tmp.initialize();
    var gtemp= new GlideTemplate.get(template_sysid).apply(tmp);       // apply template to new record
    return tmp.insert();  
}
