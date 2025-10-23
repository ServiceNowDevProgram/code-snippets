function onLoad(){
  var now = new Date(); // Shows current date and time
  var nowFormatted = now.toISOString(); // Format : yyyy-MM-ddTHH:mm:ss:sssZ
  g_form.setValue('u_date', nowFormatted); // Replace with your field name
}
