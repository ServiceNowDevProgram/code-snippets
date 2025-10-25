var ExecutionTimeTracker = Class.create();
ExecutionTimeTracker.prototype = {
    initialize: function() {
        this.startTime = new Date().getTime();
    },

    stop: function(label) {
        var endTime = new Date().getTime();
        var duration = endTime - this.startTime;
        gs.info((label || 'Execution') + ' completed in ' + duration + ' ms');
        return duration;
    },

    type: 'ExecutionTimeTracker'
};
