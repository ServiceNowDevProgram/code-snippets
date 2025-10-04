api.controller = function($scope) {
    // Month and day names
    $scope.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Initialize the current month, year, and days
    var today = new Date();
    $scope.currentMonth = today.getMonth();
    $scope.currentYear = today.getFullYear();
    $scope.days = [];

    // Load the calendar days
    $scope.loadCalendar = function() {
        $scope.days = [];
        
        // Calculate the first and last day of the month
        var firstDay = new Date($scope.currentYear, $scope.currentMonth, 1).getDay();
        var lastDate = new Date($scope.currentYear, $scope.currentMonth + 1, 0).getDate();
        
        // Add empty days for alignment (for days before the 1st of the month)
        for (var i = 0; i < firstDay; i++) {
            $scope.days.push('');
        }
        
        // Add days of the month
        for (var day = 1; day <= lastDate; day++) {
            $scope.days.push(day);
        }
    };

    // Check if the day is today
    $scope.isCurrentDay = function(day) {
        return day == today.getDate() && $scope.currentMonth == today.getMonth() && $scope.currentYear == today.getFullYear();
    };

    // Navigate to the previous month
    $scope.prevMonth = function() {
        if ($scope.currentMonth === 0) {
            $scope.currentMonth = 11;
            $scope.currentYear--;
        } else {
            $scope.currentMonth--;
        }
        $scope.loadCalendar();
    };

    // Navigate to the next month
    $scope.nextMonth = function() {
        if ($scope.currentMonth === 11) {
            $scope.currentMonth = 0;
            $scope.currentYear++;
        } else {
            $scope.currentMonth++;
        }
        $scope.loadCalendar();
    };

    // Initialize the calendar for the current month
    $scope.loadCalendar();
};
