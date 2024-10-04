(function() {
    var c = this;

    c.activeIncidents = 0;
    c.activeChanges = 0;
    c.activeProblems = 0;
    c.activeCatalogTasks = 0;

    c.openIncidents = function() {
        var url = '/incident_list.do'; // URL to navigate to the active incidents list
        window.location.href = url; 
    };

    c.openChanges = function() {
        var url = '/change_request_list.do'; // URL to navigate to the active changes list
        window.location.href = url; 
    };

    c.openProblems = function() {
        var url = '/problem_list.do'; // URL to navigate to the active problems list
        window.location.href = url; 
    };

    c.openCatalogTasks = function() {
        var url = '/sc_task_list.do'; // URL to navigate to the active catalog tasks list
        window.location.href = url; 
    };
})();
