function onLoad() {
   
    var taskId = getParameterValue("taskid");
   
    if (taskId != "" && taskId != null && taskId != undefined) {
      console.log('=== CAMACHO Task id: ' + taskId);
      
      var gaGetTaskNumber = new GlideAjax('UtilsAjax');
      gaGetTaskNumber.addParam('sysparm_name', 'getTaskNumber');
      gaGetTaskNumber.addParam('sysparm_task_id', taskId);
      gaGetTaskNumber.getXMLAnswer(setmyFormValue);
    }
 }
 
 function setmyFormValue(answer) {
   
   //console.log('=== CAMACHO Entered setmyFormValue');
   if (answer) {
     var obj = JSON.parse(answer);
     var numero = obj.number.toString();
     console.log(numero);
     
     g_form.setValue('task_number', numero);
     
   }
 }
 
 function getParameterValue(name) {
   var url = top.location.href;
   var value = new URLSearchParams(url).get(name);
   if (value) {
     return value;
   } else {
     return null;
   }
 }