// HTML for the widget 

<div>
  <div class="well" ng-repeat="inc in c.data.incidents" ng-class="">
    <div class="title">
      {{inc.number}}
    </div>
    <div class="description">
      {{inc.short_description}}
    </div>
  </div>
</div>

//Service Script for the widget

(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

	var incidentList = [];
	var incidentGR = new GlideRecord('incident');
	incidentGR.addQuery('major_incident_state=accepted');
	incidentGR.addActiveQuery();
	incidentGR.orderByDesc('sys_created_on');
	incidentGR.setLimit(5);
	incidentGR.query();
	
	while(incidentGR.next()) {
		var inc = {};
		$sp.getRecordDisplayValues(inc, incidentGR, 'number,short_description');
		incidentList.push(inc);
	}
	
	data.incidents = incidentList;
})();

//Client Script for the widget

api.controller=function(spUtil, $scope) {
	/* widget controller */
	var c = this;
  
	spUtil.recordWatch($scope, "incident", "active=true^major_incident_state=accepted", function(name) {

		c.server.refresh();
		var audio = new Audio('Audio File Name.mp3'); //Add any audio file to the audio files module in the instance or use exisiting one.
		audio.play();

	});
	
};
