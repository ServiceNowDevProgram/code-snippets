api.controller=function($scope, spModal ) {
  /* widget controller */
  var c = this;
	
	// Variables from client script
  $scope.myText = "Type in textbox.";	
	$scope.htmlText = "<p><b>AnglurJS:</b> Directives and Filters"
  $scope.startIndex = 0;
  $scope.myFilter = "";

	//On-Click Function
  $scope.myButton = function(){
		spModal.alert("Run a function on Click");
	}	

	//Function on Enter Press
  $scope.myKey = function() {
		spModal.alert("Run a function on Enter Key");		
  }	
	
};
