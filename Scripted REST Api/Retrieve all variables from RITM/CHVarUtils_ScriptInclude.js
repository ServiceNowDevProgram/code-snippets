var CHVarUtils = Class.create();
CHVarUtils.prototype = {
    initialize: function() {},
    getTaskVarsById: function(taskId) {
        
        //Given a System ID, find all variables and their internal and display values.
        var resultJson = {};
        var varArr = [];
        var mrvArr = [];
        var varCount = 0;
        var mrvCount = 0;
        var taskTable = "";
        var info = "";

        if (taskId) {

            var ts = new GlideRecord("task");
            ts.get("sys_id", taskId);

            if (ts.sys_id) {
                if (ts.sys_class_name) {
                    taskTable = ts.sys_class_name;

                    //Get regular variables for SCTASKs and RITMs
                    if (taskTable == "sc_req_item" || taskTable == "sc_task") {
                        var item = "";
                        var itemName = "";
                        var itemRec = "";

                        var ci = new GlideRecord(taskTable);
                        ci.get("sys_id", taskId);

                        if (taskTable == "sc_req_item") {
                            item = ci.cat_item.sys_id;
                            itemRec = ci.sys_id;
                            itemName = ci.cat_item.name;
                        } else {
                            item = ci.request_item.cat_item.sys_id;
                            itemRec = ci.request_item.sys_id;
                            itemName = ci.request_item.cat_item.name;
                        }

                        var vars = ci.variables.getElements(true);

                        for (var x = 0; x < vars.length; x++) {

                            var v = vars[x];

                            if (!v.isMultiRow()) {
                                info = v.toString();
                                var varData = {};
                                varData.name = v.getLabel();
                                varData.value = v.getValue();
                                varData.displayValue = v.getDisplayValue();
                                varCount += 1;
                                varArr.push(varData);
                            } else {
                                var mrVarTable = {};
                                mrVarTable.name = v.getLabel();                                
                                mrvCount += 1;
                                var rows = v.getRows();
								mrVarTable.rowCount = rows.length;
                                var mrRowArr = [];
								var mrRowCollection = [];

                                for (var j = 0; j < rows.length; j++) {
                                    var mrRowData = [];
                                    var cells = rows[j].getCells();
                                   for (var k = 0; k < cells.length; k++) {
                                        var mrCellData = {};
                                        mrCellData.name = cells[k].getLabel();
                                        mrCellData.value = cells[k].getCellValue();
                                        mrCellData.displayValue = cells[k].getCellDisplayValue();
                                        mrRowData.push(mrCellData);
                                   }
									mrRowCollection.push(mrRowData);
                                }
                                mrVarTable.rowCollection = mrRowCollection || "(no data)";

                                mrvArr.push(mrVarTable);

                            }

                        }

                    }
                }

                resultJson.taskId = taskId;
                resultJson.taskNumber = ts.number;
                resultJson.state = ts.state.getDisplayValue();
                resultJson.stage = ts.stage.getDisplayValue();
                resultJson.approval = ts.approval.getDisplayValue();
                resultJson.taskType = taskTable;
                resultJson.taskShortDescription = ts.short_description;
                resultJson.additionalInfo = info;
                resultJson.variableCount = varCount;
                resultJson.multiRowVariableCount = mrvCount;
                resultJson.variables = varArr;
                resultJson.multiRowVariables = mrvArr;

                return resultJson;
            }
        }
    },
    type: 'CHVarUtils'
};

​
