//Example AJAX call to get number of related incidents for a change. Notice that this example has two scripts that should be on two different tables.

//Client Script: 
function onLoad() { 

    var chgSysId = g_form.getUniqueValue(); 

    var ga = new GlideAjax('ChangeManagementRelatedRecords'); 
    ga.addParam('sysparm_name','getIncidentCount'); 
    ga.addParam('sysparm_change_id', chgSysId); 
    ga.getXMLAnswer(GetRelatedIncidentCount); 

    function GetRelatedIncidentCount(answer) {
        if (answer) { //Doing some check before showing the message
            g_form.addInfoMessage('Related Incidents: ' + answer); //using g_form instead of alert
        }
    } 
} 


//Script Include: 
var ChangeManagementRelatedRecords = Class.create(); 
ChangeManagementRelatedRecords.prototype = Object.extendsObject(AbstractAjaxProcessor, { 

    getIncidentCount: function() { 

        var changeID = this.getParameter('sysparm_change_id');
        var incCount = new global.GlideQuery('incident') // Using GlideQuery instead of GlideRecord for better performance related to counting records. 
                       .where('rfc', changeID);
                       .count();
        return incCount;
    }, 
      
       _privateFunction: function() { // this function is not client callable      
    } 
      
}); 
