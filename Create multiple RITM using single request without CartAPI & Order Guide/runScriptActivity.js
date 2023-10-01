/* ============Start of run script activity===============*/
/* 1. Get values from user list variable */
var list = current.variables.user_list.toString();
var array = list.split(',');

/* 2. Get current ritm’s request  this will be used to set request on multiple Ritm to be created*/
var request = current.request;

/* 3. Store sys_id of our catalog item */ 
var catalogItem = '3cecd2350a0a0a6a013a3a35a5e41c07';  // Not to hardcode (use system property)
//var catalogItem = gs.getProperty(‘name of property where sysid of cat item stored’);

/* 4. loop through array we have created in 1 and create RITM */
/* Loop will initialize from 1 because we have creating one ritm from main request. */
for (var i = 1; i < array.length; i++) {
    /* 4a. Create RITM*/
    var grRitm = new GlideRecord("sc_req_item");
    grRitm.initialize();
    grRitm.cat_item = catalogItem;
    grRitm.price = current.price;
    grRitm.request = request;
    grRitm.requested_for = array[i];
    grRitm.due_date = current.due_date;
    //Store the sys Id in another variable
    var ritmSysId = grRitm.insert();    
    /*End of RITM creation*/

    
/* 4b. Store the variables from catalog Item in an array */
    var itemName = grRitm.cat_item.name;
    var itemVar = new GlideRecord('item_option_new');
    itemVar.addQuery('cat_item.name', itemName);
    itemVar.query();
    var itemVarList = [];
    while (itemVar.next()) {
        itemVarList.push(itemVar.getUniqueValue('name'));
    }
    /*End of Store the variables from catalog Item in an array */

    

   

/* 4c.Create a records in sc_item_option  */
/* This table contains value of variable filled by end user , In this case we will update it through script */
   
 for (var j = 0; j < itemVarList.length; j++) {
        var itemOption = new GlideRecord('sc_item_option');
        itemOption.initialize();
        
        itemOption.order = j;
        itemOption.item_option_new = itemVarList[j];
        // sys_id of variable "Hidden variable"
        if(itemOption.item_option_new =='1c4f7a252fe17110cb5554492799b62d'){
	itemOption.value = 'No';  // set the value to "No" so flow will divert and not get into loop
        } 
      // sys_id of variable "User list"
      if(itemOption.item_option_new =='6cbe3a252fe17110cb5554492799b6e3'){
			itemOption.value = array[i];
         }
      // Store the sysid
        var optSysID = itemOption.insert();

        /* 4d. Create a relationship of RITM with variables value */		
        var ritmM2M = new GlideRecord('sc_item_option_mtom');
        ritmM2M.initialize();
        ritmM2M.request_item = ritmSysId; // Parent Item
        ritmM2M.sc_item_option = optSysID; // Dependent Value
        ritmM2M.insert();
    }

     /* 4e. Start the workflow (sys_id of workflow from "wf_workflow" table  “Copy of Procurement Process Flow - Hardware”)*/   

 startWorkflow('5c7efae12fe17110cb5554492799b62b');

/*for startWorkflow() – Taken reference from OOTB Business rule from RITM table
Business rule : Start Workflow
*/

}

/* 4. End of loop through array we have created in 1 and create RITM */


/* Attach workflow to Ritm */
function startWorkflow(id) {
    var grRitm1 = new GlideRecord("sc_req_item");
    grRitm1.addQuery("sys_id", ritmSysId);
    grRitm1.query();
    if (grRitm1.next()) {
        var w = new Workflow();
        var context = w.startFlow(id, grRitm1, grRitm1.operation(), getVars(grRitm1));
        if (context != null)
            grRitm1.context = context.sys_id;
	workflow.info("context = " +grRitm1.context);
		
    }
	grRitm1.update();
}
    /* Send the RITM variables to workflow*/
    function getVars(grRitm1) {
        var vars = {};
        for (var n in grRitm1.variables)
            vars[n] = grRitm1.variables[n];

        return vars;
    }
/*Update User list for main (current) RITM*/
current.variables.user_list = array[0];
current.requested_for = array[0];

/*====================End of run script Activity===============================*/

 
  



       


