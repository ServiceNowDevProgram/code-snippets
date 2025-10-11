//client side script of the widget

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

//CSS part of the widget

.list-group-item {
	border: none;
  
	.btn-link {
	  padding-left: 0;
	  padding-right: 0;
	}
  }
  .input-switch{
	display: inline-block;
	float: right;


// HTML part of the widget

<div class="notification-content">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h2 class="panel-title">
        <i class="fa fa-envelope-o m-r-sm"></i>${Notifications}
      </h2>
    </div>
    <div class="body padder-xs">
      <div class="list-group">
        <div class="list-group-item" ng-repeat='notification in c.notificationArray'>
          <label><strong>{{notification.name}}</strong></label>
          <div class="input-switch">
            <input aria-labelledby="switch_label_{{notification.notification.sys_id}}" 
               id="switch{{notification.notification.sys_id}}" 
               type="checkbox" 
               name="switch{{notification.notification.sys_id}}" 
               data-ng-model="notification.records[0].logical_active" 
               data-ng-change="c.toggleNotification(notification.records[0].logical_active,notification.records[0].channel.sys_id,notification.notification.sys_id,notification.records[0].sys_id,notification.records[0].table)" 
               data-ng-disabled="notification.records[0].readonly" >
        <label aria-hidden="true" class="switch" for="switch{{notification.notification.sys_id}}">&#8203;</label>
          </div>
          <div class='description' ng-bind-html='::notification.description'>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

//Server side script of the widget

(function() {
	data.category = options.categoryid || 'b69d02137f232200ee2e108c3ffa9142'; // sys id of the category
})();
