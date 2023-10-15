function reparentTable(tableName, parentTable) {
  var tableParentChangePropVal = gs.getProperty("glide.rollback.blacklist.TableParentChange.change");
  try {
    gs.info(tableName + " reparent to " + parentTable);
    var tableUtil = new TableUtils(tableName);
    var parentTables = tableUtil.getTables();
    if (parentTables.indexOf(parentTable) != -1) {
      gs.info(tableName + " is reparented to " + parentTable);
      reparentingDone = true;
    } else {
      gs.setProperty("glide.rollback.blacklist.TableParentChange.change", false);
      var tpc = new GlideTableParentChange(tableName);
      reparentingDone = tpc.change(tableName, parentTable);
      gs.info(
        "Completed " + tableName + " reparent to " + parentTable + "with status reparentingDone = " + reparentingDone
      );
    }
  } catch (exception) {
    gs.info("Exception thrown during reparenting: " + exception);
    reparentingDone = false;
  } finally {
    gs.setProperty("glide.rollback.blacklist.TableParentChange.change", tableParentChangePropVal);
    gs.info("Completed setting up glide.rollback.blacklist.TableParentChange.change property");
  }
}
