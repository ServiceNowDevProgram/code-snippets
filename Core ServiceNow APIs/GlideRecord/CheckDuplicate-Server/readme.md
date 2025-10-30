Scan all Servers (cmdb_ci_server). For each one, check if there is another CI in cmdb_ci_computer with the same name but not a server (sys_class_name != cmdb_ci_server).

If found, log the server name and the duplicate CI’s class; keep a running duplicate count; finally log the total.

*******Descriton****
1. var gr = new GlideRecord("cmdb_ci_server");
2. Creates a record set for Server CIs.


gr.addEncodedQuery("sys_class_name=cmdb_ci_server");
3. Redundant: you’re already targeting the cmdb_ci_server table which is a class table. This filter doesn’t harm, but it’s unnecessary.


while (gr.next()) { ... }
4. Loops through each server CI.


5.Inside loop:

Query cmdb_ci_computer for records with the same name but where sys_class_name != cmdb_ci_server.
6. If found, log the duplicate and increment dupCount.



7. Finally logs total dupCount.
