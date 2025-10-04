var gr = new GlideDateTime(); 
var day = gr.getDayOfWeekLocalTime(); 
if(day == 7 || day == 6)
{
gs.print("Today is Weekend");
}
else
{
gs.print("Today is working day");
}
