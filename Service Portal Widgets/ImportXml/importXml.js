// HTML for the widget 

<div>
  
    <span ng-click="import()" class="btn btn-primary">
        Import
    </span>


    <script type="text/ng-template" id="importTemplate">
        <div>
            <h4>Import</h4>
            <iframe id="uploadXml" src="/upload.do?sysparm_referring_url=test_table_list.do&sysparm_target=test_table" title="description"> </iframe>
            <button class="btn btn-primary" ng-click="close()">${Cancel}</button>
        </div>
    </script>
</div>

//Service Script for the widget

(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
})();

//Client Script for the widget

api.controller=function($uibModal, $scope) {
	/* widget controller */
	var c = this;
  
    var interval;
	$scope.import = function(){
		$scope.modal = $uibModal.open({
			templateUrl: 'importTemplate',
			scope: $scope
		});

		interval = window.setInterval(function(){
			checkIframeUrl();
		}, 1500);
	};
	
	checkIframeUrl = function() {
		var getIframe  = $('#uploadXml');
		if (getIframe.length > 0) {
			
			if (getIframe.contents().find("nav").length != 0)
				getIframe.contents().find("nav").remove();
			
			var currentURL = document.getElementById("uploadXml").contentWindow.location.href;
			if (currentURL != '' && !currentURL.includes('upload.do')) {
				$scope.modal.close();
				clearInterval(interval);
			}			
		}
	};
};
