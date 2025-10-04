var GetChoicesFromDT = Class.create();
GetChoicesFromDT.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    getChoices: function() {
	    
         /**
	 * Gets the defined choices for the passed in catalog item
  	 * 
    	 * @author Laszlo Balla
	 * @param {String} sysparm_cat_item
  	 *    The sys_id of the catalog item to get choices for - mandatory
    	 * @param {String} sysparm_cat_variable
      	 *    Value from an additional catalog variable to evaluate as part of your decision - optional
	 * @return {String}
  	 *    A stringified array (since it goes to client script) of choices
  	 */
	
	
	 /**
         * In addition to the above, the following variable MUST be set for the script to work:
	 *
	 ** decisionTableId : Sys ID of the decision table. Store in a system property and set with gs.getProperty()
         ** dtInput1, 2, etc. :  the technical names of the Decision Table inputs
	 ** resultColumn : the technical name of the result column of your Decision Table that has the choices set
         */

        var catItem = gs.nil(this.getParameter('sysparm_cat_item')) ? null : this.getParameter('sysparm_cat_item'); // Mandatory parameter
        var catVar = gs.nil(this.getParameter('sysparm_cat_variable')) ? null : this.getParameter('sysparm_cat_variable'); // Optional parameter example (variable from record producer). Multiple as needed, or remove if not.
        var decisionTableId = ''; //Sys ID of the decision table. Store in a system property and set with gs.getProperty()
        var dtInput1 = 'u_catalog_item'; // Make sure you set this to the technical name of the first input of your Decision Table
        var dtInput2 = 'u_catalog_variable'; // Make sure you set this to the technical name of the second input of your Decision Table, if you have one. Multiply as needed, or remove if not.
        var resultColumn = 'u_choice_result'; // Set this to the technical name of the result column that contains your choices
        var answerArray = [];
        var choiceArr = [];
        var iter1 = 0;

        if (!gs.nil(catItem) && !gs.nil(decisionTableId)) {
            var choiceQuery = 'var__m_sys_decision_multi_result_element_' + decisionTableId;
            var decisonTable = new sn_dt.DecisionTableAPI();
            var inputs = new Object();
            inputs[dtInput1] = '' + catItem;

            // Repeat this block as necessary with additional parameters and inputs
            if (!gs.nil(catVar)) {
                inputs[dtInput2] = '' + catVar;
            }

            var dtResponse = decisonTable.getDecisions(decisionTableId, inputs);
            while (iter1 < dtResponse.length) {
                answerArray.push(dtResponse[iter1]['result_elements'][resultColumn].toString());
                iter1++;
            }
	   // Now find the the actual choices with labels
            var choiceGr = new GlideRecord('sys_choice');
            choiceGr.addQuery('name', choiceQuery);
            choiceGr.addQuery('value', 'IN', answerArray.toString());
            choiceGr.setLimit(30); // The Choice table is huge, so I recommend setting a reasonable query limit. You should have an idea of the max # of results anyway.
            choiceGr.query();
            while (choiceGr.next()) {
                var choice = {};
                choice['value'] = choiceGr.getValue('value');
                choice['label'] = choiceGr.getValue('label');
                choiceArr.push(choice);
            }

            return JSON.stringify(choiceArr); // Return a stringified array to the client

        } else {
            gs.error('GetChoicesFromDT Script include did not run as the catItem mandatory variable is null: ' + catItem + ' or decision table sys_id is empty: ' + decisionTableId);
            return;
        }
    },

    type: 'GetChoicesFromDT'
});
