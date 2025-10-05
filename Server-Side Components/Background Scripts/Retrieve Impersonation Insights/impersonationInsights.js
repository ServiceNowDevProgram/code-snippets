var impersonatorUserID = 'zane.sulikowski'; //Replace it with the user ID of user for whom  we need to check impersonation details

var isUserPresent = new GlideRecord('sys_user');
if (isUserPresent.get('user_name', impersonatorUserID)) {

    var queryEvents = new GlideRecord('sysevent');
    queryEvents.addEncodedQuery("name=impersonation.start^ORname=impersonation.end^parm1=" + impersonatorUserID + "^sys_created_onONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()");
    queryEvents.orderBy('sys_created_on');
    queryEvents.query();

    //This object will hold all events grouped by impersonated user which is in parm2
    var userEvents = {};

    while (queryEvents.next()) {
        var impersonatedId = queryEvents.getValue('parm2');
        if (!userEvents[impersonatedId])
            userEvents[impersonatedId] = [];
        userEvents[impersonatedId].push({
            name: queryEvents.getValue('name'),
            time: queryEvents.getValue('sys_created_on')
        });
    }

} else {
    gs.info('Invalid User');
}


function getUserName(sysId) {
    var getUser = new GlideRecord('sys_user');
    if (getUser.get(sysId)) {
        return getUser.getDisplayValue('name');
    }
    return sysId;
}


for (var userId in userEvents) {
    var events = userEvents[userId];
    var totalSeconds = 0;
    var startTime = null;

    events.forEach(function(evt) {
        if (evt.name === 'impersonation.start') {
            startTime = new GlideDateTime(evt.time);
        } else if (evt.name === 'impersonation.end' && startTime) {
            var endTime = new GlideDateTime(evt.time);
            totalSeconds += (endTime.getNumericValue() - startTime.getNumericValue()) / 1000;
            startTime = null;
        }
    });


    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = Math.floor(totalSeconds % 60);

    gs.info(impersonatorUserID + " impersonated User: " + getUserName(userId) +
        " - Total Duration of impersonation is : " + hours + "hrs " + minutes + "min " + seconds + "sec (" + totalSeconds + "sec)");
}
