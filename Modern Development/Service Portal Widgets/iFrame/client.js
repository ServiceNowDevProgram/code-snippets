api.controller = function ($scope, $rootScope, $location, $sce) {
    var c = this;
    var params = $location.search();
    var url = params.url || c.options.url;
    var size = params.size || c.options.size;
      var label = params.label || c.options.label;
      var setPageTitle = params.set_page_title || c.options.set_page_title;
  
    if (!url) $scope.showError = true;
    else {
      $scope.frameSource = $sce.trustAsResourceUrl(url);
      $scope.contentClass = "external-content-" + size;
          $scope.label = label;
    }
  
      $rootScope.$emit('sp.update.breadcrumbs', [{label:label}]);
      if(setPageTitle)
          $('head title').text(label);
  };
  