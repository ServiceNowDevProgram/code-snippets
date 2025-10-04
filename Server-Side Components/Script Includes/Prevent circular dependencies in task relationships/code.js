var DependencyChecker = Class.create();
DependencyChecker.prototype = {
    initialize: function() {},

    hasCircularReference: function(taskId) {
        var visited = {};
        return this._check(taskId, visited);
    },

    _check: function(taskId, visited) {
        if (visited[taskId]) return true;
        visited[taskId] = true;

        var gr = new GlideRecord('task_dependency');
        gr.addQuery('dependent_task', taskId);
        gr.query();

        while (gr.next()) {
            if (this._check(gr.task.toString(), visited)) return true;
        }

        return false;
    },

    type: 'DependencyChecker'
};
