var IncidentDeleteUtils = Class.create();
IncidentDeleteUtils.prototype = {
  initialize: function() {},

  deleteIncident: function(sys_id){
    var gr = new GlideRecord('incident');
    if(gr.get(sys_id)){
      gr.deleteRecord();
      return "Incident Deleted Successfully";
    }
    return "Incident Not Found";
  },

  type: 'IncidentDeleteUtils'
};
