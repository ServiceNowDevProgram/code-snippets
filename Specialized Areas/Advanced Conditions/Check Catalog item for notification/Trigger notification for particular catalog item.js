var item = new GlideRecord("sc_req_item");
item.addQuery("request",current.sys_id);   //filter the request from the RITM table.
item.query();
if(item.next()){
  var ID = item.cat_item.toString();
  var itemId = "sys_id of the catalog item";
  if(itemId == ID){
    answer = true;
  }else{
    answer = false;
  }
}
