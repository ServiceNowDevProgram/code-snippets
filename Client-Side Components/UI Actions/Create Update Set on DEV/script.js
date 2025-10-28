function openDevUpdateSetForm() {

    // Name of the DEV instance where Update sets should be created:
    var dev_instance_name = 'my_org_dev_instance';
    // Update set name format:
    var update_set_name = g_form.getValue('number') + ' ' + g_form.getValue('short_description');

    var instanceURL = 'https://' + dev_instance_name + '.service-now.com/nav_to.do?uri=';
    var updatesetURL = '/sys_update_set.do?sys_id=-1&sysparm_query=name=' + update_set_name;
    var encodedUpdateSetURL = encodeURIComponent(updatesetURL);
    var gotoURL = instanceURL + encodedUpdateSetURL;

    g_navigation.open(gotoURL, '_blank');
}
