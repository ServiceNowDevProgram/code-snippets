var d = new Date();// getting today's date
var month = d.getMonth();// getting the month
var a = month.toString();
if(a== '2'|| a=='5' || a=='8' || a=='11'){//condition will be true only when month is March, June, September, December
answer = true;
}
else{
answer = false;
}
