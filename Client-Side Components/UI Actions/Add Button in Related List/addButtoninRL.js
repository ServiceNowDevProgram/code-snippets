//Condition for the UI Action to be visible/available to admin users
RP.isRelatedList()&&gs.hasRole('admin')&&new sn_grc.addButtonsIssueCustom().isRisk(RP.getListControl().getControlID())

//The Script for OnClick function is written below-
function addRiskToIssue() {
    var handleClick = function(ids) {
        CustomEvent.un(eventName, handleClick);
        var ajax = new GlideAjax('sn_grc.issueAssociationinRL');
        ajax.addParam('sysparm_item_ids', ids);
        ajax.addParam('sysparm_issue_id', g_form.getUniqueValue());
        ajax.addParam('sysparm_name', 'createRisk');
        ajax.getXMLAnswer(function(answerStr) {
            var answer = JSON.parse(answerStr);
            if (answer.error) {
                g_form.addErrorMessage(answer.error);
                riskoverlay.close();
                return;
            }

            g_form.clearMessages();

            if (answer.count) {
                g_form.addInfoMessage(answer.count + " risks got associated with this issue record.");
                riskoverlay.close();
            }

        });
    };

    var afterClose = function() {
        CustomEvent.un(eventName, handleClick);
    
        for (var key in GlideLists2) {
            if (!key)
                continue;
            GlideList2.get(key).setFilterAndRefresh('');
        }
    };
  
    var currentTableName = g_form.getTableName();
    var eventName = 'create_risks';
    var listTableName = 'sn_risk_risk';
    var actionName = getMessage('Add Risks');
    var popup_plural = getMessage('Risks');
	var issue = g_form.getUniqueValue();
	var query = 'active=true^sys_idNOT INjavascript:new sn_grc.getAlreadyAssociatedRecords().getSysIdsItem("' + issue + '");';
    var parameters = 'sysparm_click_event_name=' + eventName + '&';
    parameters += 'sysparm_nostack=true&';
    parameters += 'sysparm_table=' + listTableName + '&';
    parameters += 'sysparm_ui_action_name=' + actionName + '&';
    parameters += 'sysparm_omit_filter=true&';
    parameters += 'sysparm_plural=' + popup_plural + '&';
    parameters += 'sysparm_show_close=false&';
    var options = {
        id: 'show_risks',
        closeOnEscape: true,
        showClose: true,
        onAfterClose: afterClose,
        onAfterLoad: resizeIframe,
        height: '90%',
        width: '90%',
        title: 'Choose Risks to Associate',
        iframe: '$sn_grc_show_list.do?' + parameters
    };

    if (g_scratchpad.popup_list_version == 3) {
        parameters += "sysparm_query=" + '&';
        parameters += "sysparm_fixed_query=" + query + '&';
        options.iframe = "$sn_grc_show_list.do?" + parameters;
    } else {
        parameters += "sysparm_query=" + query + '&';
        options.iframe = "sn_grc_show_list.do?" + parameters;
    }
    var riskoverlay = new GlideOverlay(options);
    riskoverlay.center();
    riskoverlay.render();
    CustomEvent.on(eventName, handleClick);
}

function resizeIframe() {
    var x = g_glideBoxes.show_risks;
    x.autoDimension();
    x.autoPosition();
    x._createIframeShim();
}
