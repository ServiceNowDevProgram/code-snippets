api.controller = function(spUtil, $scope) {
    /* widget controller */
    var c = this;
   // record watcher to show changes on progress bar dynamically
    spUtil.recordWatch($scope, "sn_hr_core_task", "active=true", function(name) {
        c.data.state = name.data.record.state; 
        c.server.update();

    });
};
