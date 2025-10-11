function onLoad(){
  if(g_service_catalog.isOrderGuide()){
    //variable_name1, varaible_name2 are the fields already present on the Order guide, hence hiding below fields on the catalog form when the catalog form is used through an order guide.
    g_form.setDisplay('varible_name1',false);
    g_form.setDisplay('varible_name2',false);
  }
