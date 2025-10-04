(function() {
	data.locations = {
		available: {
			city: [],
			'building/structure': [],
			floor: [],
			zone: []
		},
		default: {
			city: {name: 'Pick a city', sys_id: '-1'},
			'building/structure': {name: 'Pick a building', sys_id: '-1'},
			floor: {name: 'Pick a floor', sys_id: '-1'},
			zone: {name: 'Pick a corridor', sys_id: '-1'}
		}
	};
	
	data.locations.selected = data.locations.default;
	
	if (input && input.action === 'getChildren' && input.type) {
		data.locations.available[input.type] = getData(input.type, input.parent);
	}
	
	function getData(locationType, parent) {
		let ret = [];
		let gq = new global.GlideQuery('cmn_location').where('cmn_location_type', locationType);
		
		if (!gs.nil(parent))
			gq = gq.where('parent', parent);
		
		gq
			.orderBy('name')
			.select('name')
			.forEach(function(childLocation){
				ret.push({
					sys_id: childLocation.sys_id,
					name: childLocation.name
				});
			});
		return ret;
	}
})();
