var getVariables = new GlideRecord('sc_req_item');
if (getVariables.get("<pass_ritm_sys_id_here>")) {

  //<mobile_devices_set> is the internal name of MRVS
    var mrvsInternalName = getVariables.variables.mobile_devices_set;
    var rowsCount = mrvsInternalName.getRowCount();

    if (rowsCount > 0) {
        for (var i = 0; i < rowsCount; i++) {
            var getRowVal = mrvsInternalName.getRow(i);
            var getCellVal = getRowVal.getCells();

            for (var j = 0, len = getCellVal.length; j < len; j++) {
                var mrvsFieldName = getCellVal[j].getName();
                var mrvsFieldValue = getCellVal[j].getCellDisplayValue();
                gs.info(mrvsFieldName + ' : ' + mrvsFieldValue);
            }
        }
    }
}
