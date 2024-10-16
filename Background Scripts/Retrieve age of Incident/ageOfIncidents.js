var grIncidentAge = new GlideRecord('incident');
grIncidentAge.query();
while (grIncidentAge.next()) {
    var incCreated = new GlideDateTime(grIncidentAge.sys_created_on);
    var nowDT = new GlideDateTime();
    var ageInMilliseconds = nowDT.getNumericValue() - incCreated.getNumericValue(); //The numeric values of the current and created dates are obtained, and the difference is calculated to find the age of the incident in milliseconds.
    var ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24)); //The age in milliseconds is converted to days by dividing by the number of milliseconds in a day (1,000 milliseconds/second * 60 seconds/minute * 60 minutes/hour * 24 hours/day). The result is rounded down using Math.floor().
    gs.info('Incident ' + grIncidentAge.number + ' is ' + ageInDays + ' days old.');
}
