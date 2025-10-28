api.controller = function($scope, $rootScope, spModal) {
    var c = this;

    $scope.pageReady = false;

    // From ootb form widget
    var g_form;
    $rootScope.$on("spModel.gForm.rendered", function(e, gFormInstance) {
        if (gFormInstance.getTableName() == $scope.data.table) {
            g_form = gFormInstance;
            $scope.pageReady = true;
        }
    });

    $rootScope.$on("field.change", function(e, parms) {
        $scope.dirtyForm = g_form.isUserModified();
    });
	
	$rootScope.$on("sp.form.record.updated", function() {
		$scope.submitting = false;
	});

    // From ootb form widget
    $scope.getButtonClass = function(action) {
        if (action.form_style == "destructive")
            return "btn-danger";

        if (action.form_style == "primary")
            return "btn-primary";

        return "btn-default";
    };

    // From ootb form widget
    $scope.triggerUIAction = function(action) {
        if ($scope.data.disableUIActions && !action.primary) {
            return;
        }

        var activeElement = document.activeElement;
        if (activeElement) {
            activeElement.blur();
		}

        spModal.confirm("Are you sure?").then(function(confirmed) {
            if (confirmed) {
                $scope.$evalAsync(function() {
                    if (g_form) {
                        $scope.submitting = true;
                        if (!g_form.submit(action.action_name || action.sys_id))
                            $scope.submitting = false;
                    }
                });
            }
        });
    };

    $scope.showInfoMessage = function() {
        g_form.addInfoMessage("Info message");
    };

    $scope.showErrorMessage = function() {
        g_form.addErrorMessage("Error message");
    };
};