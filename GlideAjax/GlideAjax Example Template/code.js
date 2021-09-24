//Example AJAX call to get number of related incidents for a change. Notice that this example has two scripts that should be on two different tables.

//Client Script: 
function onLoad() { 

    var chgSysId = g_form.getUniqueValue(); 

    var ga = new GlideAjax('ChangeManagementRelatedRecords'); 
    ga.addParam('sysparm_name','getIncidentCount'); 
    ga.addParam('sysparm_change_id', chgSysId); 
    ga.getXML(GetRelatedIncidentCount); 

    function GetRelatedIncidentCount(response) { 
        var results = JSON.parse(answer);
        alert('Related Incidents: ' + results.row_count); 
    } 
} 


//Script Include: 
var ChangeManagementRelatedRecords = Class.create(); 
ChangeManagementRelatedRecords.prototype = Object.extendsObject(AbstractAjaxProcessor, { 

    getIncidentCount: function() { 

        var changeID = this.getParameter('sysparm_change_id'); 
        var incident = new GlideRecord('incident'); 
        incident.addQuery('rfc', changeID); 
        incident.query(); 

        var results = {};
        results.row_count = incident.getRowCount();

        return JSON.stringify(results);
    }, 
      
       _privateFunction: function() { // this function is not client callable      
    } 
      
}); 