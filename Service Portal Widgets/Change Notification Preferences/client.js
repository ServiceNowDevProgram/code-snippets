api.controller = function($http) {
    /* widget controller */
    var c = this;
    var baseApiUrl = '/api/now/v1/notification/preference';
    c.enableNotifications = true;
    // initial call to get all the notifications
    $http.get(baseApiUrl + '?category=' + c.data.category + '&sysparm_limit=100&sysparm_offset=0')
        .then(function(response) {
            if (response.data && response.statusText == 'OK') {
              var tempNotificationArray = response.data.result.preferences;
							c.notificationArray = tempNotificationArray.map(function(obj){
								$http.get('/api/now/table/sysevent_email_action?sysparm_query=sys_id='+obj.notification.sys_id.toString()+'&sysparm_fields=description&sysparm_limit=1')
								.then(function(resp){
									obj.description = resp.data.result[0].description;
								});
								return obj;
							});
								
            }
        });
    c.toggleNotification = function(active, channel_id, notification_id, sys_id, table) {
        var data = {};
        data.active = active;
        data.channel_id = channel_id;
        data.notification_id = notification_id;
        data.sys_id = (sys_id != '') ? sys_id : null;
        data.table = table;
        $http.post(baseApiUrl, {
                preference: data
            })
            .then(function(response) {
            });
    };
};