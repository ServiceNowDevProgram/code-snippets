var CrossTableDependencyAnalyzer = Class.create();
CrossTableDependencyAnalyzer.prototype = {
    initialize: function() {},

    // Get related records for a CI or task
    getDependencies: function(record) {
        var dependencies = [];

        if (!record) return dependencies;

        var ciId = record.cmdb_ci; // for incidents or changes
        if (ciId) {
            // Find active incidents for this CI
            var inc = new GlideRecord('incident');
            inc.addQuery('cmdb_ci', ciId);
            inc.addActiveQuery();
            inc.query();
            while (inc.next()) {
                dependencies.push({
                    table: 'incident',
                    number: inc.number.toString(),
                    state: inc.state.toString()
                });
            }

            // Find active changes for this CI
            var chg = new GlideRecord('change_request');
            chg.addQuery('cmdb_ci', ciId);
            chg.addActiveQuery();
            chg.query();
            while (chg.next()) {
                dependencies.push({
                    table: 'change_request',
                    number: chg.number.toString(),
                    state: chg.state.toString()
                });
            }

            // Find problems linked to this CI
            var prb = new GlideRecord('problem');
            prb.addQuery('cmdb_ci', ciId);
            prb.addActiveQuery();
            prb.query();
            while (prb.next()) {
                dependencies.push({
                    table: 'problem',
                    number: prb.number.toString(),
                    state: prb.state.toString()
                });
            }
        }

        return dependencies;
    },

    type: 'CrossTableDependencyAnalyzer'
};
