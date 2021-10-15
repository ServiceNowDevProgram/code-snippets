function($scope, $http) {
	var c = this;
	// CODE FOR sn-record-picker
	$scope.tableName = {
		name: 'tableName'
	};		
	$scope.$on("field.change", function(evt, parms) {
		if (parms.field.name == 'tableName'){
			c.data.table = parms.newValue.toString();
			c.server.update();
		}
	});

	// CODE FOR input	record
	$scope.getID = function(rec) {
		c.data.record = rec.toString();
		c.server.update();
	}	

	// CODE FOR fileupload	
	$scope.files = [];	
	$scope.setFiles = function(element) {
		$scope.$apply(function() {
			console.log('files:', element.files);
			// Turn the FileList object into an Array
			for (var i = 0; i < element.files.length; i++) {
				$scope.files.push(element.files[i]);
			}
		});
	};

	$scope.removeFiles = function(fname) {
		var index = $scope.files.indexOf(fname);
		if(index>-1)
			$scope.files.splice(index,1);
	};	

	$scope.uploadFiles = function() {	
		$scope.fd = new FormData();
		$scope.files.forEach(function(file){
			$scope.fd.set('files', file);
			var request = {
				method: 'POST',
				url: '/api/now/attachment/file?table_name='+c.data.table+'&table_sys_id='+c.data.rec_sysid+'&file_name='+file.name,
				data: $scope.fd.get('files'),
				headers: {
					'Content-Type': file.type,
					'Accept':'application/json'					
				}
			};
			//console.log('HTTP request:',request);

			// SEND THE FILES.
			$http(request).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				console.log("File was uploaded successfully!")
			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				console.log("Uploaded failed!")
			});

		});
	}

}