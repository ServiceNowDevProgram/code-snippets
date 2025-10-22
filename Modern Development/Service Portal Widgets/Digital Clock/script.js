api.controller = function($scope, $interval) {
    function updateTime() {
        var now = new Date();
        $scope.currentTime = now.toLocaleTimeString();
    }

    // Initialize the clock on load
    updateTime();

    // Update the clock every second
    $interval(updateTime, 1000);
};
