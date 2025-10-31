/*
* The following is a client callable script include. This can be used with the onChange Client script to be able to gather the data on the server side
*/

var ReferenceQualifierAjaxHelper = Class.create();
ReferenceQualifierAjaxHelper.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  getUserInformation : function() {
    var userID = this.getParameter('sysparm_user');
    var userRec = new GlideRecord('sys_user');

    if(userRec.get(userID)) {
      var results = {
        "email" : userRec.getValue('email'),
        "department" : userRec.getValue('department'),
        "title" : userRec.getValue('title'),
        "phone" : userRec.getValue('phone')
      };

      return JSON.stringify(results)
    }

  },
  
  type: 'ReferenceQualifierAjaxHelper'
});
