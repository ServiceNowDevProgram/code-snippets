(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // implement resource here

    var numInserted;
    var reqBody = request.body.data;
    var a = JSON.stringify(reqBody);
    var parser = new JSONParser();
    var parsed = parser.parse(a);
    var str = '';
    var str1 = '';
    var j;
    var qstring = reqBody.query_string;
    if (qstring != '') {
        var cmdb = new GlideRecord('cmdb_ci');
        cmdb.addEncodedQuery(qstring);
        cmdb.query();
        var item_access = [];
        while (cmdb.next()) {

            item_access.push(cmdb.getValue("sys_id"));

        }


    }

    var task = new GlideRecord('task');
    task.addQuery('number', reqBody.task);
    task.query();
    gs.info("TAsk reow co " + task.getRowCount());
    if (task.getRowCount() < 1) {

        response.setError("Please provide valid TASK number");
        return;

    }
    if (task.next()) {


        var task_id = task.sys_id;



    }

    if (item_access.length > 0) {


        var cd = new GlideRecord('cmdb_ci');
        cd.addEncodedQuery(qstring);
        cd.query();
        gs.info("NOF of recdd " + qstring);
        while (cd.next()) {
            var grDS5 = new GlideRecord("task_ci");
            grDS5.initialize();
            grDS5.setValue("ci_item", cd.sys_id);
            grDS5.setValue("task", task_id);
            grDS5.insert();
        }



    }



    //gs.info("NOF of re " + item_access.length);
    //gs.info("Enoded Query " + 'name=' + reqBody.cis[j].name + 'ORserial_number=' + reqBody.cis[j].serial + 'ORsys_id=' + reqBody.cis[j].sys_id + 'ORip_address=' + reqBody.cis[j].ip + 'ORfqdn=' + reqBody.cis[j].FQDN);
    for (j = 0; j < reqBody.cis.length; j++) {

        if (item_access.length == null) {

            if (reqBody.cis[j].name != null) {
                var c = new GlideRecord('cmdb_ci');
                c.addEncodedQuery('name=' + reqBody.cis[j].name);
                c.addQuery('u_cmdb_ci_status', '40c951a34f1cfa00dc4927201310c73b');
                c.query();
                gs.info("NOF of recc " + c.getRowCount());
                while (c.next()) {
                    var grDS = new GlideRecord("task_ci");
                    grDS.initialize();
                    grDS.setValue("ci_item", c.sys_id);
                    grDS.setValue("task", task_id);
                    grDS.insert();
                }
            }

            if (reqBody.cis[j].serial != null) {
                var c1 = new GlideRecord('cmdb_ci');
                c1.addEncodedQuery('serial_number=' + reqBody.cis[j].serial);
                c1.addQuery('u_cmdb_ci_status', '40c951a34f1cfa00dc4927201310c73b');
                c1.query();
                gs.info("NOF of recc " + c1.getRowCount());
                while (c1.next()) {
                    var grDS1 = new GlideRecord("task_ci");
                    grDS1.initialize();
                    grDS1.setValue("ci_item", c1.sys_id);
                    grDS1.setValue("task", task_id);
                    grDS1.insert();
                }
            }

            if (reqBody.cis[j].sys_id != null) {
                var c2 = new GlideRecord('cmdb_ci');
                c2.addEncodedQuery('sys_id=' + reqBody.cis[j].sys_id);
                c2.addQuery('u_cmdb_ci_status', '40c951a34f1cfa00dc4927201310c73b');
                c2.query();
                gs.info("NOF of recc " + c2.getRowCount());
                while (c2.next()) {
                    var grDS2 = new GlideRecord("task_ci");
                    grDS2.initialize();
                    grDS2.setValue("ci_item", c2.sys_id);
                    grDS2.setValue("task", task_id);
                    grDS2.insert();
                }
            }

            if (reqBody.cis[j].ip != null) {
                var c3 = new GlideRecord('cmdb_ci');
                c3.addEncodedQuery('ip_address=' + reqBody.cis[j].ip);
                c3.addQuery('u_cmdb_ci_status', '40c951a34f1cfa00dc4927201310c73b');
                c3.query();
                gs.info("NOF of recc " + c3.getRowCount());
                while (c3.next()) {
                    var grDS3 = new GlideRecord("task_ci");
                    grDS3.initialize();
                    grDS3.setValue("ci_item", c3.sys_id);
                    grDS3.setValue("task", task_id);
                    grDS3.insert();
                }
            }

            if (reqBody.cis[j].FQDN != null) {
                var c4 = new GlideRecord('cmdb_ci');
                c4.addEncodedQuery('fqdn=' + reqBody.cis[j].FQDN);
                c4.addQuery('u_cmdb_ci_status', '40c951a34f1cfa00dc4927201310c73b');
                c4.query();
                gs.info("NOF of recc " + c4.getRowCount());
                while (c4.next()) {
                    var grDS4 = new GlideRecord("task_ci");
                    grDS4.initialize();
                    grDS4.setValue("ci_item", c4.sys_id);
                    grDS4.setValue("task", task_id);
                    grDS4.insert();
                }
            }



        }



    }

    response.setBody({
        "code": "CIs created sucessfully",

    });
    response.setContentType("application/json");
    response.setStatus(200);




})(request, response);
