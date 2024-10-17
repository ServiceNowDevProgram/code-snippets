var ga = new GlideAggregate('incident');
ga.addAggregate('COUNT', 'sys_id');
ga.groupBy('caller_id');
ga.orderByAggregate('COUNT', 'sys_id');
ga.setLimit(5);
ga.query();

var result = [];
while (ga.next()) {
    var count = ga.getAggregate('COUNT', 'sys_id');
    var userId = ga.getValue('caller_id');
    var userName = ga.getDisplayValue('caller_id');
    
    result.push({
        userId: userId,
        userName: userName,
        incidentCount: parseInt(count)
    });
}

for (var i = 0; i < result.length; i++) {
    var user = result[i];
    gs.log('User: ' + user.userName + ', Incident Count: ' + user.incidentCount);
}
