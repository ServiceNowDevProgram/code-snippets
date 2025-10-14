(function executeRule(current,previous){
  if(current.assignment_group){
    current.short_description = current.short_description + '_' + current.assignment_group.getValueDisplayValue();
  }
}) (current, previous);
