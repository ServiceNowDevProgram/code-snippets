(function() {
    if (input && input.action == "updateuser") {
        //ACCESS CHANGED VALUE	
        var changedUserName = input.userId;
        var changedUserId = input.userName;
        /**Add any logic here to update and return the response**/
	//data.response = "";
        //console.log("userName: " + changedUserName);
        //console.log("userId: " + changedUserId);
    } else {
        //DEFAULT VALUE
        data.userName = gs.getUserDisplayName();
        data.userId = gs.getUserID();
    }
})();
