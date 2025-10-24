removePreviousCI();

var ci = [];
var ret;
var array = new ArrayUtil();

//call checkingCi funciton
checkingCI(current.cmdb_ci);

//••••••••••••••••••••••••••••••••••• Adding Infected CI•••••••••••••••••••••••••••••••
function checkingCI(id) {
  //we push the first value
  ci.push(id);
  var gr = new GlideRecord('cmdb_rel_ci');
  gr.addQuery('child', id);
  gr.query();
  while (gr.next()) {
    ret = array.unique(recursive(gr.parent.toString()));
  }
  if (ret) {
    callInfectedCI(ret, current);
  } else {
    var rec = new GlideRecord('task_ci');
    rec.addQuery('task', current.sys_id);
    rec.addQuery('ci_item', current.cmdb_ci);
    rec.query();
    if (!rec.next()) {
      rec.initialize();
      rec.task = current.sys_id;
      rec.ci_item = current.cmdb_ci;
      rec.insert();
    }
  }
}

function recursive(id) {
  ci.push(id);

  var gr = new GlideRecord('cmdb_rel_ci');
  gr.addQuery('child', id);
  gr.query();
  while (gr.next()) {
    recursive(gr.parent.toString());
  }

  return ci;
}
function callInfectedCI(cmdb, incident) {
  for (var x in cmdb) {
    var gr = new GlideRecord('task_ci');
    gr.newRecord();
    gr.task = current.sys_id.toString();
    gr.ci_item = cmdb[x];
    gr.insert();

    gs.info('Infected CI ' + gr.sys_id());
  }
}

//•••••••••••••••••••••••Removal of infected CI••••••••••••••••••••••••••••••••••

function removePreviousCI() {
  // Delete Affected CI records for this task and previous CI
  var rec = new GlideRecord('task_ci');
  rec.addQuery('task', current.sys_id);
  rec.query();
  while (rec.next()) {
    rec.deleteRecord();
  }
}
