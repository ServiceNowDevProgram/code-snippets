<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">

<img src='sn_tile_icon/now-checklist.svg' stype='width=5%,height:5%' onclick="showopentckts()" title="Show Open Incident of me"></img>

<script language="javascript">
function showopentckts(){
var name=g_form.getValue("caller_id");
var tableName='incident';
var url=tableName+'_list.do?sysparm_query=caller_id='+name+'^stateNOT IN7,8';
window.open(url,'OpenIncident',"popup");
}

</script>

</j:jelly>