/*
Top 10 scheduled jobs by processing time
*/
topN('syslog_transaction', 'url', 10);
function topN(pTable, pColumn, pCount) {
    var ga = new GlideAggregate(pTable);
    ga.addAggregate('COUNT', pColumn);
    ga.orderByAggregate('COUNT', pColumn);
    //ga.addEncodedQuery('sys_created_onONYesterday@javascript:gs.beginningOfYesterday()@javascript:gs.endOfYesterday()^type=scheduler');
    ga.addEncodedQuery('type=scheduler^sys_created_onONLast 15 minutes@javascript:gs.beginningOfLast15Minutes()@javascript:gs.endOfLast15Minutes()');
    ga.query();
    var i = 0;
    var stdout = [];
    var responseTime = [];
    stdout.push('\nTop ' + pCount + ' ' + pColumn + ' values from ' + pTable + '\n');
    while (ga.next() && (i++ < pCount)) {
        stdout.push('\n\n********** Execution Details for the column ' + ga.getValue(pColumn) + ' **********\n');
        var result1 = getResponseTimeDetails(pTable, 'type=scheduler^sys_created_onONLast 15 minutes@javascript:gs.beginningOfLast15Minutes()@javascript:gs.endOfLast15Minutes()^url=' + ga.getValue(pColumn));
        stdout.push('Executed total number of times : ' + ga.getValue(pColumn) + ' ' + ga.getAggregate('COUNT', pColumn));
        stdout.push('\nTop 10 response times : ' + result1);
    }
    gs.print(stdout.join("\n"));
}
function getResponseTimeDetails(table, query) {
    var responseTime = [];
    var gr = new GlideAggregate(table);
    gr.addEncodedQuery(query);
    gr.orderByDesc('response_time');
    gr.setLimit(10);
    gr.query();
    while (gr._next()) {
        responseTime.push(gr.response_time.toString());
    }
    return responseTime.join(',');
}
