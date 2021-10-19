(function execute(inputs, outputs) {
  
  var userID = inputs.userID;
  outputs.userID = lengthCheck(userID);
  
 	function lengthCheck(userID) {
	// If length >= 20
	if(userID.toString().length >= 20) {
		var regExp = /[0-9]+$/; // Regular Expression for Numbers
	  if(regExp.test(userID)) {
		var num = regExp.exec(userID);
		userID = userID.substring(0, 21 - (num + 1).length) + num;
		return userID;
		}
		else {
			return userID.substring(0, 20);
		}
	}
	// If length less than 20
	else {
		return userID;
	}
  }
  
})(inputs, outputs);
