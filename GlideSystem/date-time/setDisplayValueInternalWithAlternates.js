var gdt = new GlideDateTime();

//get the current datetime in the logged in user's time zone
gs.print(gdt.getDisplayValue());

//parse the incomplete date time values to current user's date and GMT time
gdt.setDisplayValueInternalWithAlternates("12:00:00 10-25");
gs.print(gdt.getValue());

//Output
//*** Script: 2021-10-07 03:47:32
//*** Script: 2021-10-07 08:47:32
