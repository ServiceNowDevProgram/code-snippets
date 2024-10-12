
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading || newValue === '') {
      return;

   }
  //If State of Incident is updated to In Progress from New State then Flash the Assigned to field.
  
   if(newValue==2)
{	
	g_form.flash("incident.assigned_to","red",-4);

	//The arguments for the flash method are as follows: tablename.fieldname
  //RGB color or acceptable CSS color like "blue" or "tomato"
  //Integer that determines how long the label flashes:
  //2 for a 1-second flash
  //0 for a 2-second flash
  //-2 for a 3-second flash
  //-4 for a 4-second flash
}
   
}
