(function execute(inputs, outputs) {
  
  // Be sure to update inputs variable for Configuration Item
  var supportGroup = inputs.configuration_item.support_group;
  var answer = '';

  if (supportGroup == '') {
    answer = inputs.default_support_group; //Return the group specified in the "Default support group" input
  } else {
    answer = supportGroup; //Return the 'Support group' specified on the CI input
  }

  outputs.support_group = answer;

})(inputs, outputs);
