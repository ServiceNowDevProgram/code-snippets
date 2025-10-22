/*
Query the table SYS_LOG_TRANSACTION to identify the TOP 10 Schedule Job by Number of times it executed in one day and How much processing time it took to complete the execution

>>>>> Go to https://<your instance URL>/syslog_transaction_list.do?sysparm_query=urlLIKE<your scheduled job name> and check the "Transaction processing time"

This will help to identify top contibutors that consume instance resource and can potentially cause slowness

You can execute this as Background scipt or Fix script
*/
topN('syslog_transaction', 'url', 10);

function topN(pTable, pColumn, pCount) {
    var ga = new GlideAggregate(pTable);
    ga.addAggregate('COUNT', pColumn);
    ga.orderByAggregate('COUNT', pColumn);
    //ga.addEncodedQuery('sys_created_onONYesterday@javascript:gs.beginningOfYesterday()@javascript:gs.endOfYesterday()^type=scheduler'); // Schedle job executed yesterday to identify Top 10 by execution time
    ga.addEncodedQuery('type=scheduler^sys_created_onONLast 15 minutes@javascript:gs.beginningOfLast15Minutes()@javascript:gs.endOfLast15Minutes()'); // Schedle job executed in last 15 min to identify Top 10 by execution time
    ga.query();
    var i = 0;
    var stdout = [];
    var responseTime = [];
    stdout.push('\nTop ' + pCount + ' ' + pColumn + ' values from ' + pTable + '\n'); //Get all Top 10 ScheduleJon details
    while (ga.next() && (i++ < pCount)) {
        stdout.push('\n\n***Execution Details for the column ' + ga.getValue(pColumn) + '***\n');
        var result1 = getResponseTimeDetails(pTable, 'type=scheduler^sys_created_onONLast 15 minutes@javascript:gs.beginningOfLast15Minutes()@javascript:gs.endOfLast15Minutes()^url=' + ga.getValue(pColumn)); // Schedle job executed in last 15 min to identify Top 10 by execution time
        stdout.push('Executed total number of times : ' + ga.getValue(pColumn) + ' ' + ga.getAggregate('COUNT', pColumn));
        stdout.push('\nTop 10 response times : ' + result1);
    }
    gs.print(stdout.join("\n"));
}

// Fetch response Time of the schedule job Execution
function getResponseTimeDetails(table, query) {
    var responseTime = [];
    var gr = new GlideAggregate(table);
    gr.addEncodedQuery(query);
    gr.orderByDesc('response_time');
    gr.setLimit(10); // Set limit to 10
    gr.query();

    while (gr._next()) {
        responseTime.push(gr.response_time.toString());
    }
    return responseTime.join(',');
}

/*
******************OUTPUT************
*** Script: 
Top 10 url values from syslog_transaction
*** Execution Details for the column JOB: Flow Engine Event Handler ***
Executed total number of times : JOB: Flow Engine Event Handler[ 290 ]
Top 10 response times : 58018,57294,56949,39272,38874,38174,38085,37490,37138,36447,25947
********** Execution Details for the column JOB: BackgroundProgressJob **********
Executed total number of times : JOB: BackgroundProgressJob[ 221 ] 
Top 10 response times : 8671,7646,7050,7040,7035,7008,6993,6987,6880,6861,6803
********** Execution Details for the column JOB: ASYNC: AgentNowResponse**********
Executed total number of times : JOB: ASYNC: AgentNowResponse [ 576 ]
Top 10 response times : 17680,13488,12094,11999,11579,11281,10672,10620,9688,9552,9373
********** Execution Details for the column JOB: events process**********
Executed total number of times : JOB: events process [ 075 ]
Top 10 response times : 26986,14921,14102,13640,13603,3870,3808,3665,3360,3277,3001
********** Execution Details for the column JOB: Service Mapping**********
Executed total number of times : JOB: Service Mapping Recomputation[ 167 ]
Top 10 response times : 24035,11209,9297,8431,7857,7142,6555,6541,6218,6124,5855
********** Execution Details for the column JOB: Event Management **********
Executed total number of times : JOB: Event Management[ 64 ]
Top 10 response times : 939,744,729,644,629,598,585,534,533,518,452
*/
