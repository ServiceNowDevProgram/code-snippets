function onLoad ()
{
  var aPriority = g_form.getValue('priority');
  var label = g_form.getLable('number');
  label.style.backgroundColor = "lightblue";
  if(aPriority==1)
  {
    label.style.color = "red";
  }
  else if (aPriority==2)
  {
    label.style.color = "yellow";
  }
  else
  {
        label.style.color = "blue";
  }
}

