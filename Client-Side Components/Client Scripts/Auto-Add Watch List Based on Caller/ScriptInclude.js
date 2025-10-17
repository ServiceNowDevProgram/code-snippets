var WatchListHelper = Class.create();
WatchListHelper.prototype = Object.extendsObject(AbstractAjaxProcessor, {

getWatchListByCaller: function() {
var callerId = this.getParameter('sysparm_caller');
var watchListSysIds = [];
var userGR = new GlideRecord('sys_user');
if (userGR.get(callerId) && userGR.department) {
// Fetch department managers
var dept = new GlideRecord('cmn_department');
if (dept.get(userGR.department)) {
if (dept.manager)
  watchListSysIds.push(dept.manager.sys_id.toString());
}
}
// Return as comma separated string
return watchListSysIds.join(',');
},

type: 'WatchListHelper'
});
