function themeSwitcherMenu(){
	return {
		restrict: 'E',
		replace: true,
		controllerAs: 'c',
		controller: function(userPreferences){
			var c = this;
			c.$onInit = function(){
				userPreferences.getPreference('preferred_color_scheme').then(function(response){
					c.currentTheme = response || 'os-default';
					document.documentElement.dataset["colorScheme"] = c.currentTheme;
				});

			};

			c.THEME_ICON = {
				"os-default": "adjust",
				light: "sun-o",
				dark: "moon-o"
			};

			c.themeChosen = function(theme){
				c.currentTheme = theme;
				userPreferences.setPreference('preferred_color_scheme', theme);
				document.documentElement.dataset["colorScheme"] = theme;
			};

		},
		template: "<li class=\"theme-switcher gt-menu-item\" role=\"menuitem\">\n" +
		"  <ul class=\"nav navbar-nav\" role=\"menubar\">\n" +
		"    <li class=\"dropdown\" role=\"presentation\">\n" +
		"      <a\n" +
		"        href=\"javascript:void(0)\"\n" +
		"        class=\"toggle-dropdown\"\n" +
		"        data-toggle=\"dropdown\"\n" +
		"        aria-expanded=\"false\"\n" +
		"        title=\"Theme switcher\"\n" +
		"        aria-label=\"Theme: {{c.currentTheme}}\"\n" +
		"        role=\"menuitem\"\n" +
		"        aria-haspopup=\"true\"\n" +
		"      >\n" +
		"        <i\n" +
		"          class=\"fa fa-{{c.THEME_ICON[c.currentTheme]}}\"\n" +
		"          aria-hidden=\"true\"\n" +
		"        ></i>\n" +
		"      </a>\n" +
		"      <ul class=\"dropdown-menu\" role=\"menu\" aria-label=\"Theme options\">\n" +
		"        <li class=\"header-menu-item\">\n" +
		"          <a\n" +
		"            tabindex=\"-1\"\n" +
		"            href=\"javascript:void(0)\"\n" +
		"            ng-click=\"c.themeChosen('os-default')\"\n" +
		"            ><i class=\"fa fa-adjust m-r-xs\" aria-hidden=\"true\"></i> ${OS Default}" +
		"          </a\n" +
		"          >\n" +
		"        </li>\n" +
		"        <li class=\"header-menu-item\">\n" +
		"          <a\n" +
		"            tabindex=\"-1\"\n" +
		"            href=\"javascript:void(0)\"\n" +
		"            ng-click=\"c.themeChosen('light')\"\n" +
		"            ><i class=\"fa fa-sun-o m-r-xs\" aria-hidden=\"true\"></i>${Light}</a\n" +
		"          >\n" +
		"        </li>\n" +
		"        <li class=\"header-menu-item\">\n" +
		"          <a\n" +
		"            tabindex=\"-1\"\n" +
		"            href=\"javascript:void(0)\"\n" +
		"            ng-click=\"c.themeChosen('dark')\"\n" +
		"            ><i class=\"fa fa-moon-o m-r-xs\" aria-hidden=\"true\"></i> ${Dark}</a\n" +
		"          >\n" +
		"        </li>\n" +
		"      </ul>\n" +
		"    </li>\n" +
		"  </ul>\n" +
		"</li>\n" 
	};
}