api.controller = function() {
	/* widget controller */
	var c = this;

	var chartDom = document.getElementById('main');
	var myChart = echarts.init(chartDom);
	var option = {};


	$.get('example.svg', function(svg) {

		echarts.registerMap('demo', {
			svg: svg
		});

		var takenSeatNames = ['B2-001','B2-020','B2-003','B2-009','B2-031'];

		option = {
			tooltip: {},
			geo: {
				map: 'demo',
				roam: true,
				selectedMode: 'single',
				layoutCenter: ['50%', '50%'],
				layoutSize: '95%',
				tooltip: {
					show: true
				},
				itemStyle: {
					color: '#fff'
				},
				emphasis: {
					itemStyle: {
						color: null,
						borderColor: 'green',
						borderWidth: 2
					},
					label: {
						show: false
					}
				},
				select: {
					itemStyle: {
						//color: '#fff'
					},
					label: {
						show: false,
						textBorderColor: '#fff',
						textBorderWidth: 2
					}
				},
				regions: makeTakenRegions(takenSeatNames)
			}
		};

		function makeTakenRegions(takenSeatNames) {
			var regions = [];
			for (var i = 0; i < takenSeatNames.length; i++) {
				regions.push({
					name: takenSeatNames[i],
					silent: true,
					itemStyle: {
						color: '#bf0e08'
					},
					emphasis: {
						itemStyle: {
							borderColor: '#aaa',
							borderWidth: 1
						}
					},
					select: {
						itemStyle: {
							//color: '#bf0e08'
						}
					}
				});
			}
			return regions;
		}

		myChart.setOption(option);

		// Get selected
		myChart.on('geoselectchanged', function(params) {
			var selectedNames = params.allSelected[0].name.slice();

			//Remove taken
			for (var i = selectedNames.length - 1; i >= 0; i--) {
				if (takenSeatNames.indexOf(selectedNames[i]) >= 0) {
					selectedNames.splice(i, 1);
				}
			}
		});

	});
};