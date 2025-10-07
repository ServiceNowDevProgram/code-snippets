/*
Set user field value on load using catalog cleint script and make the field readonly
*/

function onLoad()
{
  var user_id = g_user.userID;
  g_form.setValue('field_name', user_id);
  g_form.setReadOnly('field_name', true);
}
