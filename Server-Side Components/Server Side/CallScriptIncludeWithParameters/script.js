// client callable script include function using this.getParameter('sysparm_xxx') for inputs. 
//below client callable script include function, checks whether the given sysID and table records exists in SN or NOT !
var CheckRecord = Class.create();
CheckRecord.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  
    isValidRecInTbl: function() {
      
        var table = this.getParameter('sysparm_table');
        var recordID = this.getParameter('sysparm_sys_id');

        var recs = new GlideRecord(table);
        recs.addQuery('sys_id', recordID);
        recs.query();

        if (recs.next()) {
            return 'true';
        } else {
            return 'false';
        }
    },
  
    type: 'CheckRecord'
});


// we normally use above like functions to be called from GlideAjax but when we want to call the above from server side we can use below code.

//we can use below code in any server side script 
var tableToCheck = 'incident';
var sysIDOfRec ='df3e9b822fb83110c083d0ccf699b639';

var scriptIncObj = new global.CheckRecord(); //creating script include class object

scriptIncObj.getParameter = function(name){
    if(name == 'sysparm_table') return tableToCheck; //passing input value to get used in script include
    if(name == 'sysparm_sys_id') return sysIDOfRec; //passing input value to get used in script include
}

var result = scriptIncObj.isValidRecInTbl(); //calling required function in script include which uses this.getParameter()

gs.info('record '+sysIDOfRec+' exists in '+tableToCheck+ '? '+result)


