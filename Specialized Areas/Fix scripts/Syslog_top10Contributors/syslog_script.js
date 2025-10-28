/* Create a GlideAggregate on the Syslog table to identify the Top 10 contributors by 'Source name' and 'Number of occurrences on 'Daily' or'any specific interval'.

This could be vital to maintain the instance performance by regualar optimizing the Syslog table by identifying the top contributors. Based on this syslog table 
Could it be reviewed by owners to make the correct decisions on whether logging is required for these tables?

*/

topN('syslog', 'source', 10);          //Create a function to identify top 'N' number of records by source. Eg. 10 

function topN(pTable, pColumn, pCount) {
    var ga = new GlideAggregate(pTable);    // query on table required
    ga.addAggregate('COUNT', pColumn);      // Count the number of records by source to record how many times it generated log
    ga.orderByAggregate('COUNT', pColumn);  
    ga.addEncodedQuery('sys_created_onONLast 15 minutes@javascript:gs.beginningOfLast15Minutes()@javascript:gs.endOfLast15Minutes()'); //query for last 15min data
    ga.query();
    var i = 0;
    var stdout = [];
    stdout.push('\nTop ' + pCount + ' ' + pColumn + ' values from ' + pTable + '\n');
    while (ga.next() && (i++ < pCount)) {
        stdout.push(ga.getValue(pColumn) + ' ' + ga.getAggregate('COUNT', pColumn));
    }
    gs.print(stdout.join("\n"));         // display data by 'Sourve' and Number of occurance count 
}
