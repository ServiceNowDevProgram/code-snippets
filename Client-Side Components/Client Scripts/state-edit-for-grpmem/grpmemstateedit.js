//Create a Display Business Rule with the following code and then the following code on "On-Load" client script

//Display Business Rule Code:
/*****
g_scratchpad.grpmember = gs.getUser().isMemberOf(current.assignment_group); //This returns true or false . If user is part of the group it returns true, if user is not part of the group it returns false and assign it to scratchpad variable.
*****/

if(g_scratchpad.grpmember == false)
{
g_form.setReadonly("state", true);
}
