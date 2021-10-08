# Service Portal Widget - Button "Add attachments"

This widget is using the 'Attachment API - POST /now/attachment/file' to upload multiple files on form submit.

## Demo
For demo, update the instance name on the api call statement.

## Body
<div>
<br/>  Table Name: <sn-record-picker table="'sys_db_object'" display-field="'label'" value-field="'name'" field="tableName" search-fields="'label'" default-query="''" required></sn-record-picker>
<br/>  Record Number (eg: INC0000055): <input type='text' ng-model='record' ng-change='getID(record)' required/>  
<br/><br/>  File: <input type="file" id="fileToUpload" multiple onchange="angular.element(this).scope().setFiles(this)"/>
<br/>      <div ng-show="files.length">
        <div ng-repeat="file in files.slice(0)">
            <span>{{file.webkitRelativePath || file.name}}</span>
            (<span ng-switch="file.size > 1024*1024">
                <span ng-switch-when="true">{{file.size / 1024 / 1024 | number:2}} MB</span>
                <span ng-switch-default>{{file.size / 1024 | number:2}} kB</span>
            </span>)<span class="glyphicon glyphicon-remove-circle" id="removeicon" ng-click="removeFiles(file)"></span>
        </div>
        <input type="button" ng-click="uploadFiles()" value="Upload" />
    </div>
</div>

## Controler As (css)

#removeicon:hover{
  cursor:pointer;
  cursor:hand;
}

## Client script
function($scope, $http) {
	var c = this;
// CODE FOR sn-record-picker
  $scope.tableName = {
    name: 'tableName'
  };		
  $scope.$on("field.change", function(evt, parms) {
    if (parms.field.name == 'tableName'){
			c.data.table = parms.newValue.toString();
			c.server.update();
		}
	});

// CODE FOR input	record
  $scope.getID = function(rec) {
		c.data.record = rec.toString();
    c.server.update();
  }	
	
// CODE FOR fileupload	
	$scope.files = [];	
	$scope.setFiles = function(element) {
		$scope.$apply(function() {
			console.log('files:', element.files);
			// Turn the FileList object into an Array
			for (var i = 0; i < element.files.length; i++) {
				$scope.files.push(element.files[i]);
			}
		});
	};
	
	$scope.removeFiles = function(fname) {
		var index = $scope.files.indexOf(fname);
		if(index>-1)
			$scope.files.splice(index,1);
	};	

	$scope.uploadFiles = function() {	
		$scope.fd = new FormData();
		$scope.files.forEach(function(file){
			$scope.fd.set('files', file);
			var request = {
				method: 'POST',
				url: 'https://<instance-name-here>.service-now.com/api/now/attachment/file?table_name='+c.data.table+'&table_sys_id='+c.data.rec_sysid+'&file_name='+file.name,
				data: $scope.fd.get('files'),
				headers: {
					'Content-Type': file.type,
					'Accept':'application/json'					
				}
			};
			console.log('HTTP request:',request);

			// SEND THE FILES.
			$http(request)
				.success(function (d) {
				// On success code here
			})
				.error(function (err) {
				// On error code here
			});

		});
	}
		
}

## Server side

(function() {
	data.response = '';
	if(input.record){
		var gr = new GlideRecord(input.table);
		gr.addQuery('number',input.record);
		gr.query();
		if(gr.next()){
			data.rec_sysid = gr.sys_id.toString();
			data.response = 'success';
		}
	}

})();

