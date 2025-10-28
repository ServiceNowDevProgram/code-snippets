api.controller=function($scope) {
  /* widget controller */
$scope.rawJson = '';
$scope.formattedJson = '';
$scope.error = '';

	$scope.beautifyJSON = function(){
		try{
			$scope.error = '';
			const parsed = JSON.parse($scope.rawJson);
			$scope.formattedJson = JSON.stringify(parsed,null,2);
		}catch(e){
			$scope.error = 'Invalid JSON' + e.message;
			$scope.formattedJson = '';
		}
	};
	
};
