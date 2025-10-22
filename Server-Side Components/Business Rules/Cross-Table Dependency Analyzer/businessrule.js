(function executeRule(current, previous /*null when async*/) {

    var analyzer = new CrossTableDependencyAnalyzer();
    var deps = analyzer.getDependencies(current);

    if (deps.length > 0) {
        var messages = deps.map(function(d){ return d.table + ': ' + d.number + ' (' + d.state + ')'; });
        current.comments = 'Potential impact on related records:\n' + messages.join('\n');
    }

})(current, previous);
