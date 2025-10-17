function onChange(control, oldValue, newValue, isLoading) {
if (isLoading || !newValue) return;

// GlideAjax call to fetch department leads
var ga = new GlideAjax('WatchListHelper');
ga.addParam('sysparm_name', 'getWatchListByCaller');
ga.addParam('sysparm_caller', newValue);
ga.getXMLAnswer(function(answer) {
if (answer) {
// answer is comma separated list of sys_ids
var currentWatchList = g_form.getValue('watch_list');
var combined = currentWatchList ? currentWatchList + ',' + answer : answer;
g_form.setValue('watch_list', combined);
}
});
}
