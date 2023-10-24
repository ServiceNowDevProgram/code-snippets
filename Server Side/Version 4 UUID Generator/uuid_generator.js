function generateUUID() { 
	var d1 = new Date().getTime();
	var d2 = 0;

	return 'xxxxxxxx-xxxx-zxxx-yxxx-xxxxxxxxxxxx'.replace(
		/[xyz]/g, 
		function(c) {
			if (c === 'z') {
				return String(Math.floor(Math.random() * 5) + 1);  
			}

			var d3 = Math.random() * 16;

			if (d1 > 0) {
				d3 = (d1 + d3) % 16 | 0;
				d1 = Math.floor(d1 / 16);
			} 
			else {
				d3 = (d2 + d3) % 16 | 0;
				d2 = Math.floor(d2 / 16);
			}

			return (c === 'x' ? d3 : (d3 & 0x3 | 0x8)).toString(16);
		}
	);
}

gs.info(generateUUID());
