//Declare g_scartchpad.grpmember in the display BusinessRule of the table on which you would like to have the state editable only for group members.

//Create a Display Business Rule with the following code and then the following code on "On-Load" client script

//Display Business Rule Code:
/*****

g_scratchpad.grpmember = gs.getUser().isMemberOf(current.assignment_group);

*****/

if(g_scratchpad.grpmember == true)
{
  g_form.setReadonly("state", true);
}
