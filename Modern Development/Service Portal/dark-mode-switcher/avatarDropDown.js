function avatarDropDown($compile){
	return {		
		restrict: 'C',	
		link: function(scope, element) {
			var $themeSwitcher = angular.element('<theme-switcher-menu></theme-switcher-menu>');
			element.before($themeSwitcher);
			$compile($themeSwitcher)(scope);
		}
	};
}