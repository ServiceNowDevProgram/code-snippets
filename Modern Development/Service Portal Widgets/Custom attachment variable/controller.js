api.controller = function ($scope, nowAttachmentHandler, spUtil, spAttachmentUpload, $timeout, cabrillo, spModal) {
	var c = this;
	c.isNative = cabrillo.isNative()
  /*
   * change table and guid if you want to attach to some other record
   */
	$scope.table = $scope.page.g_form.recordTableName;
	$scope.guid = $scope.$parent.c.getAttachmentGuid();
  // 
	$scope.data.maxAttachmentSize = 24;
	var ah = $scope.attachmentHandler = new nowAttachmentHandler(setAttachments, appendError);
	ah.setParams($scope.table, $scope.guid, 1024 * 1024 * $scope.data.maxAttachmentSize);

  // implement logic to show drag and drop picker or clip icon with text
	$scope.showDragAndDrop = function () {
		if (true)
			return true;
		else
			return false;
	}
  /*
   * callback function called after attachment action happens
   * e.g. implement mandatory attachment
   */
	function setAttachments(attachments, action) {
		if (!angular.equals($scope.attachments, attachments))
			$scope.attachments = attachments;
		if (action === "added") {
			// custom attachment added logic
		}
		if (action === "renamed") {
			// custom attachment renamed logic
		}
		if (action === "deleted") {
			// custom attachment deleted logic
		}
		spUtil.get($scope, {
			action: "from_attachment"
		});
	}
  /*
   * callback function called on error
   */
	function appendError(error) {
		spUtil.addErrorMessage(error.msg + error.fileName);
	}

  // drag & drop handler
	$scope.dropFiles = function (files) {
		if (files && files.length > 0) {
			$scope.attachmentUploadInProgress = true;
			$scope.totalFilesBeingUploaded++;
			spAttachmentUpload.uploadAttachments($scope.attachmentHandler, files);
		}
		$timeout(function () {
			if ($scope.attachmentUploadInProgress != false)
				spUtil.addInfoMessage("The attachment upload is in progress. Note that some actions are deactivated during the file upload process");
		}, 2000);
		$scope.$on('attachment.upload.idle', function () {
			$scope.attachmentUploadInProgress = false;
			$scope.totalFilesBeingUploaded = 0;
		});
	};
  //confirm delete dialog
	$scope.confirmDeleteAttachment = function (attachment) {
		if (c.isNative) {
			if (confirm("delete attachment?")) {
				$scope.data.attachment_action_in_progress = true;
				$scope.attachmentHandler.deleteAttachment(attachment);
			}
		} else {
			spModal.confirm("delete attachment?").then(function () {
				$scope.data.attachment_action_in_progress = true;
				$scope.attachmentHandler.deleteAttachment(attachment);
			});
		}
	}
};
