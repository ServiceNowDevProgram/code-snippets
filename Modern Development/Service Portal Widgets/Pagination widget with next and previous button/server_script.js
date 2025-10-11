(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  /*PAGINATION*/
  try {
    data.tableRecord = [];
    var getIncRec = new GlideRecordSecure("incident");
    getIncRec.addEncodedQuery("active=true^state=2");
    getIncRec.query();
    while (getIncRec.next()) {
      var obj = {};
      obj.number = getIncRec.getDisplayValue("number");
      obj.short_description = getIncRec.getDisplayValue("short_description");
      obj.priority = getIncRec.getDisplayValue("priority");
      obj.state = getIncRec.getDisplayValue("state");
      obj.assignment_group = getIncRec.getDisplayValue("assignment_group");
      obj.assigned_to = getIncRec.getDisplayValue("assigned_to");
      obj.priority = getIncRec.getDisplayValue("priority");
      obj.link =
        "sp?id=form&table=incident&sys_id=" + getIncRec.getUniqueValue();
      data.tableRecord.push(obj);
    }
  } catch (e) {
    gs.addErrorMessage("Error Catched" + e);
  }
})();
