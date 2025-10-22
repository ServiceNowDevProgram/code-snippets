/*  function to fetch the configuration item details like serial No, name , class , install status */
function searchCI() {  
  var ciNameorId = document.getElementById('ci_input').value;
  if (!ciNameorId) {
      alert('Please Enter the Configuration item Name or ID');
  } else {
      var ga = new GlideAjax('ci_lifecycle_management_script_include');
      ga.addParam('sysparm_name', 'get_ci_info');
      ga.addParam('sysparm_ci_name_or_id', ciNameorId);
      ga.getXMLAnswer(function(response) {
          var record = JSON.parse(response);
          document.getElementById("ci-info").style.display = "block";
          document.getElementById('ci_name').innerText = record.name;
          document.getElementById('serial_number').innerText = record.serial_number;
          document.getElementById('ci_class').innerText = record.ci_class;
          document.getElementById('ci_install_status').innerText = record.ci_install_status;
          var operations = ['Stolen', 'Retired','In Stock','In Maintenance'];
          operations.forEach((operation) => {
      var hidden_ele_id = operation.replace(/\s+/g, "");
      var elementId = "ci_"+hidden_ele_id;
      var ele = document.getElementById(elementId);
      if(operation == record.ci_install_status){
        ele.style.display = "none";
      }
          });
      });
  }
}
/* end of searchCI() */

/* function to update the status of Configuration item */
function UpdateCI(status) {
  var ciNameorId = document.getElementById('ci_input').value;
  if (ciNameorId) {
      var updateci = new GlideAjax('ci_lifecycle_management_script_include');
      updateci.addParam('sysparm_name', 'update_ci_info');
      updateci.addParam('sysparm_ci_id_or_name', ciNameorId);
      updateci.addParam('sysparm_ci_status', status);
      updateci.getXMLAnswer(function(response) {
          var result = JSON.parse(response);
    if(result.updated == true){
      alert("Record Updated Successfully");
    }
         
      });


  } else {
     alert('Facing issues to Update the CI');
  }

}
/* function to update the status of Configuration item */
