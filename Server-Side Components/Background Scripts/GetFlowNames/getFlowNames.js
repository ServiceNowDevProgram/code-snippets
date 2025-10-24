var grActionInstance = new GlideAggregate('sys_hub_action_instance');
var strTableName = 'change_request'; //replace with your table name

grActionInstance.addJoinQuery('sys_variable_value', 'sys_id', 'document_key').addCondition('value', strTableName);
grActionInstance.addAggregate('GROUP_CONCAT_DISTINCT', 'flow'); 
grActionInstance.groupBy('flow');
grActionInstance.addQuery('flow.sys_class_name', 'sys_hub_flow')
grActionInstance.query();

while(grActionInstance.next()) {
    gs.info( '[{0}]\t{1}',  grActionInstance.flow.active ? 'active' : 'inactive', grActionInstance.flow.name);
}
