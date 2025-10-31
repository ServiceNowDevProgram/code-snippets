function($scope, $http) {
  $scope.approve = function(sysId) {
    $http.post('/api/x_your_scope/collab_action', {
      action: 'approve',
      sys_id: sysId
    }).then(function(response) {
      $scope.server.update();
    });
  };

  $scope.reject = function(sysId) {
    $http.post('/api/x_your_scope/collab_action', {
      action: 'reject',
      sys_id: sysId
    }).then(function(response) {
      $scope.server.update();
    });
  };
}
