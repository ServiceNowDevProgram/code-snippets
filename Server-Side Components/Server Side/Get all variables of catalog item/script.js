function getAllVariables(itemSysID) {
  
  var varSetIDs = [],
    allVarbls = {};
  allVarbls.itemName = 'EMPTY';

  var varset = new GlideRecord('item_option_new_set');
  var joingr = varset.addJoinQuery('io_set_item');
  varset.addActiveQuery();
  joingr.addCondition('sc_cat_item', itemSysID);
  varset.query();
  while (varset.next()) {
    varSetIDs.push(varset.getValue('sys_id'));
  }

  var varbls = new GlideRecord('item_option_new');
  varbls.addActiveQuery();
  var condition = varbls.addQuery('cat_item', itemSysID);
  condition.addOrCondition('variable_set', 'IN', varSetIDs);
  varbls.orderBy('name');
  varbls.query();

  while (varbls.next()) {
    if (allVarbls.itemName == 'EMPTY' && varbls.cat_item.name != '') {
      allVarbls.itemName = varbls.cat_item.name + '';
    }

    allVarbls[varbls.getValue('sys_id')] = varbls.getValue('name');

  }

  var print = '\n\n"' + allVarbls.itemName + '" has the following variables with "sys_id" : "name" as\n\n';

  for (var i in allVarbls) {
    if (i == 'itemName') {
      continue;
    }
    print += i + ' : "' + allVarbls[i] + '"\n';
  }

  return print;

}


gs.info(getAllVariables('3a25637b47701100ba13a5554ee490a0')); // sys_id of catalog item "Service Category Request"


