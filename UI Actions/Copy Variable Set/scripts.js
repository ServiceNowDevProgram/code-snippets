/****************Client Code****************/

function clientConfirm() {
    var answer = confirm("This will create a copy of this variable set including all variables, choices, UI policies, UI policy actions and client scripts. Do you want to proceed?");
    if (answer == true) {
        gsftSubmit(null, g_form.getFormElement(), 'copyQuestionSet');
    } else {
        return false;
    }
}

/****************Server Code****************/
//set some new default values
var name = current.title;
current.title = 'Copy of ' + name;

//insert a copy of the variable set
var oldid = current.sys_id.toString();
var newid = current.insert();
var allVars = {};

if (typeof window == 'undefined') {
    main(oldid, newid);
}

function main(oldid, newid) {

    createVariables(oldid, newid);
    createCatalogClientScript(oldid, newid);
    createCatalogUiPolicy(oldid, newid);
}

//creates a copy of the variables and associates them to the new variable set
function createVariables(oldid, newid) {
    var vars = new GlideRecord('item_option_new');
    vars.addQuery('variable_set', oldid);
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
            qc.question = varnewid;
            qc.insert();
        }
    }
}

//creates a copy of the client scripts and associates to the variable set.
function createCatalogClientScript(oldid, newid) {
    var ccs = new GlideRecord('catalog_script_client');
    ccs.addQuery('variable_set', oldid);
    ccs.query();
    while (ccs.next()) {
        if (ccs.type == 'onChange') {
            var cv = ccs.cat_variable;
            ccs.cat_variable = allVars[cv];
        }
        ccs.variable_set = newid;
        ccs.insert();
    }
}

//creates a copy of the UI Policies and associates them to the new variable set
function createCatalogUiPolicy(oldid, newid) {
    var cup = new GlideRecord('catalog_ui_policy');
    cup.addQuery('variable_set', oldid);
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
            cupa.catalog_variable = allVars[cv];
            cupa.insert();
        }
    }
}

//Return the user to the new variable set record
action.setRedirectURL(current);
