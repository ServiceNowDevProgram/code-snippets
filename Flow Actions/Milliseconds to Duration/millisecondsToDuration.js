(function execute(inputs, outputs) {

var gdt0 = new GlideDateTime("1970-01-01 00:00:00"); //Epoch DateTime
var gdt1 = inputs.milliseconds;
gdt0.add(gdt1); // Adds the milliseconds to the epoch date/time

outputs.time = gdt0.toString(); 

})(inputs, outputs);  
