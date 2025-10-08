/*
When : onStart
Active : True
*/

(function runTransformScript(source, map, log, target /*undefined onStart*/ ) {
  
    var table = import_set.table_name;
    var run = new GlideAggregate(table);
    run.addQuery("sys_import_set", import_set.sys_id);
    run.addAggregate('COUNT');
    run.query();
    while (run.next()) {
        var count = parseInt(run.getAggregate('COUNT'));
        if (count < 1) { // Check the row count of the latest import job. If it's 0, then abort the transformation and raise a ticket (Optional)
            ignore = true;
            gs.error("File is empty. Hence aborting the transformation");
        }
    }

})(source, map, log, target);
