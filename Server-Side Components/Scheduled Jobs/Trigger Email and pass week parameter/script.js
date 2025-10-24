//Trigger notification and pass the week number in the parameter

var grSSIPIR = new GlideRecord(<table_name>);
//trigger notification if it statisfy query condition 
grSSIPIR.addEncodedQuery(<query>);
grSSIPIR.query();
while (grSSIPIR.next()) {

    var startDate = new GlideDateTime(grSSIPIR.sys_created_on);
    var endDate = new GlideDateTime();

    var millisecondsBetween = endDate.getNumericValue() - startDate.getNumericValue();
    var weeks = millisecondsBetween / (1000 * 60 * 60 * 24 * 7);

    var weeks_roundoff =  Math.floor(weeks);

    gs.eventQueue("<event_name>", grSSIPIR,  weeks_roundoff, "");
}
