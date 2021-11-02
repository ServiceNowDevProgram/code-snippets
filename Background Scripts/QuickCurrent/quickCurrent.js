var table = "sc_req_item"; //Requested item
var sid = "[Insert record sys_id]";
var current = new GlideRecord(table);
current.get(sid);
var vars = current.variables; //Short-hand access to variables to check values before/after running the script
//ex: vars.requested_for, vars.color, vars.desired_delivery_date
gs.info(current.number + "\n" + current.short_description); //display record number and short description

//##### Enter script using 'current' below this line #####
