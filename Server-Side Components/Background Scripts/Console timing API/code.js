/* As part of Yokohama release the problem of logging and calculating time taken by a piece of script has been addressesed by bringing standardized timing tools to the platform, enabling precise performance analysis with minimal effort and developers can isolate slow operations.

Use Case: Query overall incident record and bulk update with specific values. Need time taken for query and update.
*/

/*
​console.time(label)
   Starts a timer with a unique label. Use this at the beginning of a code block you want to measure.  
 
​console.timeLog(label, [data])
   Logs the current duration of the timer without stopping it. Optional data can be appended for context.  
 
​console.timeEnd(label)
   Stops the timer and logs the total execution time. 
*/

console.time("ProcessIncident");

var incidents = fetchData();
console.timeLog("ProcessIncident", "Data fetched");

transformData(incidents);
console.timeLog("ProcessIncident", "Data transformed");

console.timeEnd("ProcessIncident");

function fetchData() {
    var gr = new GlideRecord("incident");
    gr.addQuery("active", "true");
    gr.query();

    var results = [];
    while (gr.next()) {
        results.push(gr.getUniqueValue()); 
    }
    return results;
}

function transformData(incidentIds) {
    var count = 0;
    for (var i = 0; i < incidentIds.length && count < 10; i++) {
        var gr = new GlideRecord("incident");
        if (gr.get(incidentIds[i])) {
            gr.setValue("state", "7");
            gr.setValue("close_code", "known error");
            gr.setValue("close_notes", "Incident closed as part of bulk close");
            gr.setValue("work_notes", "Incident closed as part of bulk close");
            gr.update();
            count++;
        }
    }
}
