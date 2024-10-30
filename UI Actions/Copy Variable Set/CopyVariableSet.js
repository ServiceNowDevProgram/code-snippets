/* Copy a full variable set with the Catalog UI Policies, Actions, Variables, Catalog Client Scripts*/
//set some new default values 
  var setName = current.title;
current.title = 'Copy of ' + setName;
current.sys_scope = gs.getCurrentApplicationId(); 
current.sys_policy = ""; / / insert a copy of the variable set 
var oldid = current.sys_id.toString();
var newid = current.insert();

if (newid) {
    var allVars = {};
    createVariables(oldid, newid);
    createCatalogClientScript(oldid, newid);
    createCatalogUiPolicy(oldid, newid);
} 

//creates a copy of the variables and associates them to the new variable set 
function createVariables(oldid, newid) { 
  var vars = new GlideRecord('item_option_new');
  vars.addQuery('variable_set', oldid);
  vars.addActiveQuery(); 
  vars.query();
  while (vars.next()) {
    var varoldid = vars.sys_id.toString();
    vars.variable_set = newid;
    var varnewid = vars.insert();
    allVars['IO:' + varoldid] = 'IO:' + varnewid.toString();
    var qc = new GlideRecord('question_choice');
    qc.addQuery('question', varoldid); 
    qc.query(); 
    while (qc.next()) {
      qc.question = varnewid; qc.insert();
    } 
  }
}

//creates a copy of the client scripts and associates to the variable set. 
function createCatalogClientScript(oldid, newid) { 
  var ccs = new GlideRecord('catalog_script_client');
  ccs.addQuery('variable_set', oldid); 
  ccs.addActiveQuery(); 
  ccs.query();
  while (ccs.next()) {
    ccs.variable_set = newid; ccs.insert(); 
  }
}

//creates a copy of the UI Policies and associates them to the new variable set 
function createCatalogUiPolicy(oldid, newid) {
  var cup = new GlideRecord('catalog_ui_policy');
  cup.addQuery('variable_set', oldid);
  cup.addActiveQuery();
  cup.query(); 
  while (cup.next()) { 
    var uipoldid = cup.sys_id.toString();
    cup.variable_set = newid; 
    var newuip = cup.insert(); 
    var cupa = new GlideRecord('catalog_ui_policy_action'); 
    cupa.addQuery('ui_policy', uipoldid); 
    cupa.query();
    while (cupa.next()) { 
      cupa.ui_policy = newuip;
      cupa.variable_set = newid;
      var cv = cupa.catalog_variable; 
      cupa.catalog_variable = allVars[cv]; cupa.insert();
    }
  }
}

//Return the user to the new variable set record 
action.setRedirectURL(current);
