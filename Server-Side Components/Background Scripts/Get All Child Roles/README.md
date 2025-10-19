Use this script to get a flattened array of all Roles contained by a specificed role.
This will recursively drill down into other contained roles so you have the full list of roles involved in the hierarchy.

To use, you can set the "roleNameOrSysId" variable to either a role name or the Sys ID from the "sys_user_role" table
Or call the "getFullRoleHierarchyList" function directly and pass in a role name or Sys ID

The following lines exist just to print out the results for your testing. Remove this if needed:

for (var i = 0; i < result.length; i++) {
	gs.info(result[i]);
}



- Example input: "it_project_manager"

- List of chiold roles found in the Related List for "it_project_manager":

resource_user
idea_manager
it_demand_manager
pa_viewer
it_project_user
project_manager
timeline_user

- Example output and full list of nested child roles for "it_project_manager":

resource_user
report_group
report_user
viz_creator
skill_user
idea_manager
it_demand_manager
it_project_user
it_project_portfolio_user
project_portfolio_user
sn_gf.goal_user
sn_gf.goal_user_read
sn_gf.strategy_planner_read
it_demand_user
demand_user
baseline_user
pps_resource
project_user
timecard_user
sn_test_management.tester
planning_console_user
task_editor
sn_gf.strategy_planner
timeline_user
demand_manager
scrum_user
cmdb_read
scrum_admin
rm_scrum_task_admin
rm_doc_admin
rm_task_admin
rm_test_admin
rm_story_admin
rm_epic_admin
rm_release_scrum_admin
rm_sprint_admin
view_changer
financial_mgmt_user
fiscal_calendar_user
sn_invst_pln.std_user
rate_model_user
sn_invst_pln_v2.investment_user
sn_invst_pln_investment_user
currency_instance_report_admin
pa_viewer
project_manager
timecard_approver
sn_test_management.test_manager
