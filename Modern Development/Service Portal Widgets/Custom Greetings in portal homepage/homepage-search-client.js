//Below code will be used in client script of portal.
api.controller=function() {
  /* widget controller */
  var c = this;
	
	var message ='';
	var date = new Date(); //get the current date.
	var hours = date.getHours(); //get the current hour

// calculations based on hour to get the correct greeting
if(hours > 4 && hours <= 12) {
    message = message+ '${Good Morning}';
} else if(hours > 12 && hours <= 16) {
    message = message+ '${Good Afternoon}';
} else if(hours > 16 && hours <= 20) {
    message = message+ '${Good Evening}';
} else if(hours > 20 || hours <= 4) {
    message = message+ '${Good Night}';
}
	
	c.data.greeting = 'Hi '+ scope.user.first_name +', '+ message +'. ' +'How can we help you?';
};
