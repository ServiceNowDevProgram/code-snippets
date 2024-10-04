(function() {
    var c = this;

    c.activeIncidents = 0;
    c.activeChanges = 0;
    c.activeProblems = 0;
    c.activeCatalogTasks = 0;

    var userId = c.userId; 

    c.openIncidents = function() {
        var url = '/incident_list.do?sysparm_query=active=true^assigned_to=' + userId + '^state!=Resolved^state!=Closed'; 
        window.location.href = url; 
    };

    c.openChanges = function() {
        var url = '/change_request_list.do?sysparm_query=active=true^assigned_to=' + userId + '^state!=Closed'; 
        window.location.href = url; 
    };

    c.openProblems = function() {
        var url = '/problem_list.do?sysparm_query=active=true^assigned_to=' + userId + '^state!=Closed'; 
        window.location.href = url; 
    };

    c.openCatalogTasks = function() {
        var url = '/sc_task_list.do?sysparm_query=active=true^assigned_to=' + userId + '^state!=Closed'; 
        window.location.href = url; 
    };
})();
