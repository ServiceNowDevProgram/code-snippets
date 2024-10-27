var IncidentSI = Class.create();
IncidentSI.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    type: "IncidentSI",
    generic: new GenericNOW(), 
/**
     * Retrieve the number of active (non closed) incident tasks
     * @param {sys_id} id - The id of an incident
     * @returns {integer} - The number of open incident tasks
     */
    getActiveIncTasksCount: function(id) {
        // Return the count of all open incident tasks associated with the incident
        var result = this.generic.count({
            table: "incident_task",
            query: "active=true^incident=" + id
        });
        if (result.error) {
            gs.error("getActiveIncTasksCount => Error message: " + result.error);
        }
        return result.count;
    },
    
    
    /** Example calling script
var siinc = new GenericNOW();
var result = siinc.count({
            table: "incident_task",
            query: "active=true^incident=b07db7f9878f345034e864a80cbb35e6"
        });
gs.log(result.count.toString());
*/
