(function executeQuery(v_table, v_query) {
    var months = 12; //This value should be set in a system property. 
    var startDate = gs.monthsAgo(months);

    addUsage('sc_req_item', 'cat_item.name'); //You might want to group by sys_id instead of name
    addUsage('sc_item_produced_record', 'producer.name'); //You might want to group by sys_id instead of name

    function addUsage(table, groupBy) {
        new GlideQuery(table)
            .where('sys_created_on', '>', startDate)
            .aggregate('count')
            .groupBy(groupBy)
            .select()
            .forEach(function(result) {
                v_table.addRow({
                    u_count: result.count,
                    u_name: result.group[groupBy],
                    u_type: table
                });

            });

    }
})(v_table, v_query);
