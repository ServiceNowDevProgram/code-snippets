<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">

	<j:set var="jvar_group_sysid" value="${sysparm_group}"/>
	<g:evaluate jelly="true">
		var groupSysId = trim(jelly.sysparm_group);
		var groupName = '';
		var taskRecords = 0;
		var reportRecords = 0;
		var workflowRecords = 0;
		var workflowVersions = '';
		var scriptIncludeRecords = 0;
		var businessRulesRecords = 0;
		var clientScriptRecords = 0;
		var maintainItemRecords = 0;
		var businessServiceRecords=0;
		var systemPropertiesRecords=0;
		var avaiforGroupsRecords = 0;
		var grACLRecords = 0;
		
		var grGroupName = new GlideRecord('sys_user_group');
		if (grGroupName.get('sys_id', groupSysId)) {
			groupName = grGroupName.name;
		}
		
		// TASK
		var grTask = new GlideRecord("task");
		grTask.addEncodedQuery('sys_created_onRELATIVEGE@month@ago@9^assignment_group.sys_id='+groupSysId+'^active=true^GROUPBYsys_class_name^ORDERBYsys_created_on');
		grTask.query();  
		taskRecords = grTask.getRowCount();

		// REPORTS
		var grReport = new GlideRecord("sys_report");
		grReport.addEncodedQuery('filterLIKE'+groupSysId+'^ORfilterLIKEE'+groupName);
		grReport.query();  
		reportRecords = grReport.getRowCount();

		
		// WORKFLOWS
		var grWFActivity = new GlideRecord('wf_activity');  
		grWFActivity.addQuery('sys_id', 'IN', getWfActivities(groupSysId, groupName));  
		grWFActivity.addQuery('workflow_version.published', 'true');  
		grWFActivity.query();  
		while (grWFActivity.next()) {  
		
		
   var grh = new GlideRecord("wf_workflow_version");
   grh.addEncodedQuery("sys_id=" + grWFActivity.workflow_version.sys_id);
   grh.query();
   while (grh.next()) {

           workflowVersions += grWFActivity.workflow_version.sys_id + ',';		
}
}		
		workflowRecords = getCount(workflowVersions);
		if(workflowRecords == 1){
		var sci = sciWorkflow(grh.workflow.sys_id.toString());
		if(sci){	
		workflowRecords =0;
		workflowVersions ='';
		}
		}
		
		function sciWorkflow(workflow){
var gr12 = new GlideRecord("sc_cat_item");
gr12.addEncodedQuery("active=false^workflow="+workflow);
gr12.query();
if (gr12.next()) {
   return true;
}
		}
		
		function getCount(sysid){
        var gr = new GlideRecord('wf_workflow_version');
        gr.addQuery('sys_id','IN',sysid);
        gr.query();
        return gr.getRowCount();
        }
		
		function getWfActivities(group_id, group_name) {  
			var grVariables = new GlideRecord('sys_variable_value');  
			grVariables.addEncodedQuery('valueLIKE'+group_name+'^ORvalueLIKE'+group_id+'^document=wf_activity');	
			grVariables.query();  
			var results = []; 
			while (grVariables.next()) {
				results.push(grVariables.document_key + '');  
			}
			return results;  
		}
		
		// SCRIPT INCLUDES
		var grScriptInclude = new GlideRecord("sys_script_include");
		grScriptInclude.addEncodedQuery('scriptLIKE'+groupSysId+'^ORscriptLIKE'+groupName+'^active=true');
		grScriptInclude.query();  
		scriptIncludeRecords = grScriptInclude.getRowCount();
		
		// BUSINESS RULES
		var grBusinessRules = new GlideRecord("sys_script");
		grBusinessRules.addEncodedQuery('active=true^scriptLIKE'+groupName+'^ORscriptLIKE'+groupSysId);
		grBusinessRules.query();  
		businessRulesRecords = grBusinessRules.getRowCount();
		
		// CLIENT SCRIPT
		var grClientScript = new GlideRecord("sys_script_client");
		grClientScript.addEncodedQuery('sys_class_name=sys_script_client^active=true^scriptLIKE'+groupName+'^ORscriptLIKE'+groupSysId);
		grClientScript.query();  
		clientScriptRecords = grClientScript.getRowCount();
		
		
		// MAINTAIN ITEMS (CATALOG ITEMS)
		var grMaintainItems = new GlideRecord("sc_cat_item");
grMaintainItems.addEncodedQuery('u_approval_group_1='+groupSysId+'^ORu_approval_group_2='+groupSysId+'^ORgroup='+groupSysId+'^ORu_fulfillment_group_2='+groupSysId+'^active=true');	
		grMaintainItems.query();  
		maintainItemRecords = grMaintainItems.getRowCount();
		
		//CMDB CI's
		
		var grBusinessServices = new GlideRecord('cmdb_ci');
grBusinessServices.addEncodedQuery('install_status!=7^change_control='+groupSysId+'^ORsupport_group='+groupSysId)
	grBusinessServices.query();
		businessServiceRecords= grBusinessServices.getRowCount();
		
		//System Properties
	var grsysProperties = new GlideRecord('sys_properties');
		grsysProperties.addEncodedQuery('valueLIKE'+groupSysId);
		grsysProperties.query();
		systemPropertiesRecords = grsysProperties.getRowCount();
		
		//Available for Groups
		var grAvaiForGroups = new GlideRecord("sc_cat_item_group_mtom");
		grAvaiForGroups.addEncodedQuery('sc_cat_item.active=true^sc_avail_group='+ groupSysId);
		
		grAvaiForGroups.query();  
		avaiforGroupsRecords = grAvaiForGroups.getRowCount();
		
		//Available for Notifications
		var grAvaiForNotifications = new GlideRecord("sysevent_email_action");
		grAvaiForNotifications.addEncodedQuery('active=true^conditionLIKE'+ groupSysId +'^ORrecipient_groupsLIKE'+ groupSysId + '^ORadvanced_conditionLIKE'+ groupSysId);
		
		grAvaiForNotifications.query();  
		NotificationRecords = grAvaiForNotifications.getRowCount();
		
		//ACL for Groups
		
		var grACL = new GlideRecord("sys_security_acl");
 grACL.addEncodedQuery('scriptLIKE' + groupName + '^ORscriptLIKE' + groupSysId + '^ORconditionLIKE' + groupName + '^ORconditionLIKE' + groupSysId + '^active=true');
grACL.query();  
grACLRecords = grACL.getRowCount();
		
	</g:evaluate>
	
	<table width="500px">
		<tr style="font-weight:bold">
			<td>Module</td>
			<td>Records</td>
			<td>Details</td>
		</tr><tr class="breadcrumb" >
			<td>TASK</td>
			<td>${taskRecords}</td>
			<td>
				<a href="task_list.do?sysparm_query=sys_created_onRELATIVEGE%40month%40ago%409%5Eassignment_group.sys_id%3D${groupSysId}%5Eactive%3Dtrue%5EGROUPBYsys_class_name%5EORDERBYsys_created_on" target="blank">View records</a>
			</td>
		</tr><tr>
			<td>Workflows</td>
			<td>${workflowRecords}</td>
			<td><a href="wf_workflow_version_list.do?sysparm_query=sys_idIN${workflowVersions}" target="blank">View records</a></td>
		</tr><tr class="breadcrumb">
			<td>Reports</td>
			<td>${reportRecords}</td>
			<td><a href="sys_report_list.do?sysparm_query=filterLIKE${groupSysId}%5EORfilterLIKEE${groupName}" target="blank">View records</a></td>
		</tr><tr class="breadcrumb">
			<td>Catalog Items</td>
			<td>${maintainItemRecords}</td>
			<td><a href="sc_cat_item_list.do?sysparm_query=u_approval_group_1%3D${groupSysId}%5EORu_approval_group_2%3D${groupSysId}%5EORgroup%3D${groupSysId}%5EORu_fulfillment_group_2%3D${groupSysId}%5Eactive%3Dtrue" target="blank">View records</a></td>
		<!--/tr><tr>
			<td>Script Includes</td>
			<td>${scriptIncludeRecords}</td>
			<td><a href="sys_script_include_list.do?sysparm_query=scriptLIKE${groupSysId}%5EORscriptLIKE${groupName}%5Eactive%3Dtrue" target="blank">View records</a></td>
		</tr><tr>
			<td>Business Rules</td>
			<td>${businessRulesRecords}</td>
			<td><a href="sys_script_list.do?sysparm_query=active%3Dtrue%5EscriptLIKE${groupName}%5EORscriptLIKE${groupSysId}" target="blank">View records</a></td>
		</tr><tr class="breadcrumb" >
			<td>Client Scripts</td>
			<td>${clientScriptRecords}</td>
			<td><a href="sys_script_client_list.do?sysparm_query=sys_class_name%3Dsys_script_client%5Eactive%3Dtrue%5EscriptLIKE${groupName}%5EORscriptLIKE${groupSysId}" target="blank">View records</a></td>
			</tr><tr class="breadcrumb" >
			<td>Configuration Items</td>
			<td>${businessServiceRecords}</td>
			<td><a href="cmdb_ci_list.do?sysparm_query=change_control%3D${groupSysId}%5EORsupport_group%3D${groupSysId}%5Einstall_status!%3D7" target="blank">View records</a></td>
		</tr><tr class="breadcrumb" >
			<td>System Properties</td>
			<td>${systemPropertiesRecords}</td>
			<td><a href="sys_properties_list.do?sysparm_query=valueLIKE${groupSysId}" target="blank">View records</a></td>
		</tr>
		<tr class="breadcrumb" >
			<td>Available for Groups</td>
			<td>${avaiforGroupsRecords}</td>
			<td><a href="sc_cat_item_group_mtom_list.do?sysparm_query=sc_cat_item.sys_class_name%3Dsc_cat_item%5EORsc_cat_item.sys_class_name%3Dsc_cat_item_producer%5EORsc_cat_item.sys_class_name%3Dstd_change_record_producer%5Esc_cat_item.active%3Dtrue%5Esc_avail_group%3D${groupSysId}" target="blank">View records</a></td>
		</tr>
		<tr class="breadcrumb" >
			<td>Notifications</td>
			<td>${NotificationRecords}</td>
			<td><a href="sysevent_email_action_list.do?sysparm_query=active%3Dtrue%5EconditionLIKE${groupSysId}%5EORrecipient_groupsLIKE${groupSysId}%5EORadvanced_conditionLIKE${groupSysId}" target="blank">View records</a></td>
		</tr>
		
			<tr class="breadcrumb" >
			<td>Access Controls (ACL)</td>
			<td>${grACLRecords}</td>
			<td><a href="sys_security_acl_list.do?sysparm_query=scriptLIKE${groupName}%5EORscriptLIKE${groupSysId}%5Eactive%3Dtrue%5ENQconditionLIKE${groupName}%5EORconditionLIKE${groupSysId}%5Eactive%3Dtrue" target="blank">View records</a></td>
		</tr>
	</table>
	<input type="hidden" id="sysparm_group" value="${sysparm_group} - ${taskRecords} "/>

</j:jelly>
