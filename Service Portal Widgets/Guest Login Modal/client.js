api.controller=function($scope, $uibModal) {
  /* widget controller */
  var c = this;
	c.authenticated = c.data.authenticated;
	c.continueAsGuest = sessionStorage.continueAsGuest;
	
	c.login_button_text = c.data.login_button_text;
	
	if (!c.authenticated) {
		if (!c.continueAsGuest) { // if user hasn't already clicked Continue as Guest
			c.modalInstance = $uibModal.open({
				templateUrl: 'guest-login-content',
				scope: $scope,
				backdrop: 'static',
				windowTopClass: 'modal-center-override',
				ariaLabelledBy: 'title'
			});
		}
	}
	
	$scope.openLogin = function () {
		window.location = '/sp';
	};
	
	// When Guest button is clicked, store in sessionStorage and close modal
	$scope.continueAsGuest = function () {
		sessionStorage.continueAsGuest = true;
		c.modalInstance.close();
	}
};