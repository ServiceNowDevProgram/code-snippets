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
    stdout.push('\nTop ' + pCount + ' ' + pColumn + ' values from ' + pTable + '\n'); // creates a readable header line that will be show in the script output Rg. Top 10 url values from syslog_transaction 
    while (ga.next() && (i++ < pCount)) {
        stdout.push('\n\n********** Execution Details for the column ' + ga.getValue(pColumn) + ' **********\n');
        var result1 = getResponseTimeDetails(pTable, 'type=scheduler^sys_created_onONLast 15 minutes@javascript:gs.beginningOfLast15Minutes()@javascript:gs.endOfLast15Minutes()^url=' + ga.getValue(pColumn)); // get output for job executed last 15min
        stdout.push('Executed total number of times : ' + ga.getValue(pColumn) + ' ' + ga.getAggregate('COUNT', pColumn)); // this will give result like last 15 min how many time a particular job has been executed EG. 'JOB: Check Glide Service Status' executed 'n' times
        stdout.push('\nTop 10 response times : ' + result1); // this willl return the response time 
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

/*
****************OUTPUT**************
*** Script: 
Top 10 url values from syslog_transaction



********** Execution Details for the column JOB: Check Glide Service Status **********

Executed total number of times : JOB: Check Glide Service Status 1

Top 10 response times : 45300


********** Execution Details for the column JOB: Regenerate CRL and Flush CRL Cache **********

Executed total number of times : JOB: Regenerate CRL and Flush CRL Cache 1

Top 10 response times : 1462


********** Execution Details for the column JOB: SC - Calculate Compliance **********

Executed total number of times : JOB: SC - Calculate Compliance 1

Top 10 response times : 5401


********** Execution Details for the column JOB: [ITSM Analytics] Daily Data Collection **********

Executed total number of times : JOB: [ITSM Analytics] Daily Data Collection 1

Top 10 response times : 16341

[0:00:00.048] Total Time
*/
