function($uibModal, $scope, spUtil) {
	var c = this;

    $scope.uploadFiles = function() {    
        $scope.fd = new FormData();
        $scope.files.forEach(function(file){
            $scope.fd.set('files', file);
            var request = {
                method: 'POST',
                url: 'https://<instance-name-here>.service-now.com/api/now/attachment/file?table_name='+c.data.table+'&table_sys_id='+c.data.rec_sysid+'&file_name='+file.name,
                data: $scope.fd.get('files'),
                headers: {
                    'Content-Type': file.type,
                    'Accept':'application/json'                    
                }
            };
            console.log('HTTP request:',request);

            // SEND THE FILES.
            $http(request)
                .success(function (d) {
                // On success code here
            })
                .error(function (err) {
                // On error code here
            });

        });
    }
}

