api.controller = function($element, $scope, $timeout) {
    /* widget controller */
    var c = this;
    $scope.setColor = function() {
	//Apply CSS depending on color selected in select dropdoen
	//Logic can be modified dynamically depending on your conditions
        $timeout(function() {
	//Function to apply CSS
            $element.find('.color').css("color", c.data.color);
            $element.find('.color').css("font-size", "20px");
        }, 100);
    };
};
