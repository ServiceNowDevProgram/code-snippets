function($scope) {
  /* widget controller */
  var c = this;
	
		$scope.orderField = "openedat";
	
$scope.changeSort = function(field){
		if($scope.orderField == field){
			$scope.orderReverse = !$scope.orderReverse;
		}else{
			$scope.orderField=field;
		}
			
		};
	
}