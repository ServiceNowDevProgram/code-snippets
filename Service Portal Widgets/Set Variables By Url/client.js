function($scope, $window) {
    // This is the controller, we've included
    // $scope in the function above because
    // it's easy to work with
    var c = this;
    // We are going to simplify accessing 
    // g_form within the client script by
    // setting it as a variable named g_form
    var g_form = $scope.page.g_form;
    //We are going to simplify accessing
    // g_form within the HTML by setting
    // it as a $scope attribute
    $scope.g_form = $scope.page.g_form;
    // from here you can just iterate over
    // the url params;
    var params = $window.location.href.split('?')[1];
    console.log(params);
    var paramsToString = params.toString();
    var paramsArr = paramsToString.split('&');
    paramsArr.map(function (keyValue) {
        var key = keyValue.split('=')[0];
        var value = keyValue.split(key + '=').join('');
        value = decodeURIComponent(value);
        try {
            var message = 'Setting ' + key + ' to ';
            message += value + ' from url parameter.';
            //console.log(message);
            $scope.g_form.setValue(key, value);
        } catch (error) {
            console.log('Error setting field', error);
        }
    });
}