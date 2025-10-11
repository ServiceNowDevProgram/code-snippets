var list = "4b6c76e3dbcfaf0000ec7abe3b961912,9e67d6d1db736300d43c54e848961934"; //pass user sys_id here who needs access to reports
var arr = list.split(",");
for(i=0;i<arr[i].length;i++){
    var rep = new GlideRecord('sys_report');
    rep.addEncodedQuery('sys_created_by=abc@gmail.com');//replace with appropriate user mail who creaed the report
    rep.query();
    if(rep.next()){
        var usr = new GlideRecord('sys_report_users_groups');
        usr.initilize();
        usr.user_id = arr[i];
        usr.report_id = rep.sys_id;
        usr.insert();
    }
}
