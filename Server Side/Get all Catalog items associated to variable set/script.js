var catlist = '';
var ItemGR = new GlideRecord("io_set_item");
ItemGR.addEncodedQuery('variable_set={add variable set sysid}');  
ItemGR.query();
while (ItemGR.next()) {
catlist = catlist + ItemGR.sc_cat_item +',';
}

gs.info('List of Catalog Items associated to the Variable set  :  ' +catlist);
