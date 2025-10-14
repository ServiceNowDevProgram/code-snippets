function onchange(control,old value, new value){
if(new value){
  var ga = new GlideAjax('userutils');
  ga.addparam('sysparm_name', 'getuserdept');
  ga.addparam('sysparm_user', 'newvalue);
              ga.getxmlAnswer(function (answer){
                g_form.setValue('department', answer);
              });
  
