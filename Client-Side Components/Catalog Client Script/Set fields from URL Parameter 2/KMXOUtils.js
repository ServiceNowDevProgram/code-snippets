var KMXOUtils = Class.create();
KMXOUtils.prototype = {
    initialize: function() {
    },

  /*
  * Receives a um sys_id and returns a Task table field value
  *
  * @param {String} - taskId
  * @return {Object}
  */
  getTaskNumber: function(taskId)
  {
      if (taskId != "" && taskId != null && taskId != undefined) {

        var grTask = new GlideRecord('x_770214_consultor_rwd_activity');

        if (grTask.get(taskId)) {
          
          var number = grTask.getValue('number');
          
          var obj = {};
          obj["number"] = number;
          
          return obj;

        } else {

          return {};

        }
        
      }
  },

    type: 'KMXOUtils'
};