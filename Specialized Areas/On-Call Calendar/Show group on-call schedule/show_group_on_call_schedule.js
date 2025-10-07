<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
    <g:evaluate var="jvar_guid" expression="gs.generateGUID(this);" />
    <j:set var="jvar_n" value="show_schedule_${jvar_guid}:${ref}"/>
    <g:reference_decoration id="${jvar_n}" field="${ref}"
        onclick="showOnCallSchedule('${jvar_n}')"
        title="${gs.getMessage('Show group on-call schedule')}" image="images/icons/tasks.gifx" icon="icon-calendar"/>
    <script>
        function showOnCallSchedule(reference){
            var group = g_form.getValue(reference.split('.')[1]);
            var grpRota = new GlideRecord('cmn_rota');
            grpRota.addQuery('group', group);
            grpRota.addQuery('active', true);
            grpRota.query();
            if(grpRota.hasNext()){
                // Get the sys_id (assuming you have a method to retrieve the correct sys_id)
                var sysId = '3D' + group; // Ensure the sys_id starts with "3D"
                // Construct a URL for the popup window using $[AMP]
                var url = 'https://instancename.service-now.com/now/nav/ui/classic/params/target/%24oc_workbench.do%3Fsysparm_redirect%3D%2524oc_groups.do$[AMP]sysparm_group_id%3D' + encodeURIComponent(group);
                // Open the popup
                popupOpenStandard(url);
            } else {
                alert('No active rotation specified for the selected group.');
            }
        }
    </script>
</j:jelly>
