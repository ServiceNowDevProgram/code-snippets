var gd = new GlideDate(); //Intitialize GlideDate object
gd.setValue('2021-13-10');  //you can pass date for which you need conversion
//Now you can choose the format as required. Below are few examples
gs.info(gd.getByFormat("dd-MM-yyyy"));
gs.info(gd.getByFormat("yyyy/MM/dd"));
gs.info(gd.getByFormat("dd/MM/yyyy"));
