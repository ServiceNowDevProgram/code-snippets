// Script to update group memberships based on API data
(function executeRule(current, previous /*null when async*/) {
    var apiEndpoint = 'https://your-group-api.com/members';
    var request = new sn_ws.RESTMessageV2();
    request.setEndpoint(apiEndpoint);
    request.setHttpMethod('GET');

    var response = request.execute();
    var responseData = JSON.parse(response.getBody());
    
    // Update group memberships
    responseData.members.forEach(function(member) {
        var userGR = new GlideRecord('sys_user');
        userGR.addQuery('email', member.email);
        userGR.query();
        
        if (userGR.next()) {
            var groupMembership = new GlideRecord('sys_user_grmember');
            groupMembership.initialize();
            groupMembership.group = member.group_id;
            groupMembership.user = userGR.sys_id;
            groupMembership.insert();
        }
    });
})(current, previous);
