api.controller = function($scope, spUtil) {
    /* widget controller */
    c = this;
	
    //Map the record values
    $scope.user = {
        displayValue: c.data.userName,
        value: c.data.userId,
        name: 'user'
    };

    //Event when field value changes
    $scope.$on("field.change", function(evt, parms) {
        if (parms.field.name == 'user') {
            //Pass new value to server side
            c.server.get({
                action: 'updateuser',
                userId: parms.newValue,
                userName: parms.displayValue
            }).then(function(response) {
                //Handle any response
            });
        }
    });
};
