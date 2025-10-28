# Can clickable svg image
## main used echarts.js


## *step1*
Prepare a svg image, focus, you need set name for every root you want to click from svg image. there is a example svg image source code.
```html
<g name="7G" id="g19657">
    <path fill="#cccccc" stroke="#000000" d="m 225.8,250.9 h -11.9 c -1.7,0 -3.1,-1.4 -3.1,-3.1 V 239 c 0,-1.7 1.4,-3.1 3.1,-3.1 h 11.9 c 1.7,0 3.1,1.4 3.1,3.1 v 8.9 c -0.1,1.6 -1.4,3 -3.1,3 z" id="path19653" />
    <path fill="#cccccc" stroke="#000000" d="m 231.4,248.3 h -2.6 v -9.8 h 2.6 c 0.9,0 1.6,0.7 1.6,1.6 v 6.5 c 0.1,0.9 -0.7,1.7 -1.6,1.7 z" id="path19655" />
</g>

<g name="8G" id="g19663">
    <path fill="#cccccc" stroke="#000000" d="m 256,250.9 h -11.9 c -1.7,0 -3.1,-1.4 -3.1,-3.1 V 239 c 0,-1.7 1.4,-3.1 3.1,-3.1 H 256 c 1.7,0 3.1,1.4 3.1,3.1 v 8.9 c 0,1.6 -1.4,3 -3.1,3 z" id="path19659" />
    <path fill="#cccccc" stroke="#000000" d="m 261.7,248.3 h -2.6 v -9.8 h 2.6 c 0.9,0 1.6,0.7 1.6,1.6 v 6.5 c 0,0.9 -0.7,1.7 -1.6,1.7 z" id="path19661" />
</g>

<g name="9G" id="g19669">
    <path fill="#cccccc" stroke="#000000" d="m 286.2,250.9 h -11.9 c -1.7,0 -3.1,-1.4 -3.1,-3.1 V 239 c 0,-1.7 1.4,-3.1 3.1,-3.1 h 11.9 c 1.7,0 3.1,1.4 3.1,3.1 v 8.9 c 0,1.6 -1.4,3 -3.1,3 z" id="path19665" />
    <path fill="#cccccc" stroke="#000000" d="m 291.9,248.3 h -2.6 v -9.8 h 2.6 c 0.9,0 1.6,0.7 1.6,1.6 v 6.5 c 0.1,0.9 -0.7,1.7 -1.6,1.7 z" id="path19667" />
</g>

<g name="10G" id="g19675">
    <path fill="#cccccc" stroke="#000000" d="m 316.5,250.9 h -11.9 c -1.7,0 -3.1,-1.4 -3.1,-3.1 V 239 c 0,-1.7 1.4,-3.1 3.1,-3.1 h 11.9 c 1.7,0 3.1,1.4 3.1,3.1 v 8.9 c 0,1.6 -1.4,3 -3.1,3 z" id="path19671" />
    <path fill="#cccccc" stroke="#000000" d="m 322.1,248.3 h -2.6 v -9.8 h 2.6 c 0.9,0 1.6,0.7 1.6,1.6 v 6.5 c 0.1,0.9 -0.6,1.7 -1.6,1.7 z" id="path19673" />
</g>

```
Just focus the g tag, every set a unique name.

## *step2*
Go to your instance and direct to *System UI > Images*， upload your svg image here, and remember the name you typed.

## *step3*
Uing the image in your widget.
```javascript
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
```

## *step4*
add echarts.js to your widget dependencies.

# Now you can use it.



