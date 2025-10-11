api.controller=function($scope, spModal) {
  	var c = this;
	c.newLocations = [];
	
	c.server.get({
		action: 'getChildren',
		type: 'city',
		parent: null
	}).then((res) => {
		c.locations = res.data.locations;
		$scope.locations = res.data.locations.selected;
		$scope.locations.room = '';
	});
	
	c.changeCity = (newSysId) => {
		$scope.locations.city = c.locations.available.city.filter((city) => city.sys_id === newSysId)[0];
		$scope.locations['building/structure'] = c.locations.default['building/structure'];
		$scope.locations.floor = c.locations.default.floor;
		$scope.locations.zone = c.locations.default.zone;
		
		c.getChildren('building/structure', newSysId);
	}
	
	c.changeBuilding = (newSysId) => {
		$scope.locations['building/structure'] = c.locations.available['building/structure'].filter((building) => building.sys_id === newSysId)[0];
		$scope.locations.floor = c.locations.default.floor;
		$scope.locations.zone = c.locations.default.zone;
		
		c.getChildren('floor', newSysId);
	}
	
	c.changeFloor = (newSysId) => {
		$scope.locations.floor = c.locations.available.floor.filter((floor) => floor.sys_id === newSysId)[0];
		$scope.locations.zone = c.locations.default.zone;
		
		c.getChildren('zone', newSysId);
	}
	
	c.changeZone = (newSysId) => {
		$scope.locations.zone = c.locations.available.zone.filter((zone) => zone.sys_id === newSysId)[0];
	}
	
	c.changeRoom = () => {
		//c.newLocations.push($scope.locations.zone.name + $scope.locations.room);
	}
	
	c.addNewLocation = () => {
		c.newLocations.push('City: ' + $scope.locations.city.name + ', building: ' + $scope.locations['building/structure'].name + ', floor: ' + $scope.locations.floor.name + ', corridor: ' + $scope.locations.zone.name + ', room: * ' + $scope.locations.room);
		if ($scope.page.g_form) {
			$scope.page.g_form.setValue('locks_locations_new_locations_added', c.newLocations.join('\n'));
		}
		$scope.locations.room = '';
	}
	
	c.notListedModal = (type) => {
		spModal.prompt('Please enter missing value for the ' + type)
			.then(value => {
				$scope.locations[type] = {name: '* ' + value, sys_id: '-2'};
			});
	}
	
	c.getChildren = (type, parent) => {
		c.server.get({
			action: 'getChildren',
			type: type,
			parent: parent
		}).then((res) => {
			c.locations.available[type] = res.data.locations.available[type];
		});
	}
	
	c.allSelected = () => {
		return $scope.locations && 
						$scope.locations.city.sys_id !== '-1' && 
						$scope.locations['building/structure'].sys_id !== '-1' &&
						$scope.locations.floor.sys_id !== '-1' && 
						$scope.locations.zone.sys_id !== '-1'
	}
};
