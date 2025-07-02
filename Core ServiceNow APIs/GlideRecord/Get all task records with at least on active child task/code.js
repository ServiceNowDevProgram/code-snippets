var sysIds = [];

var glideRecordTaskTable = new GlideRecord('task');
var glideRecordJoin = glideRecordTaskTable.addJoinQuery('task', 'sys_id', 'parent');
glideRecordJoin.addCondition('active', true);
glideRecordTaskTable.query();
while(glideRecordTaskTable.next()){
    sysIds.push(glideRecordTaskTable.getValue('sys_id'));
}