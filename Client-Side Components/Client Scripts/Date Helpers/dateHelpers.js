// Returns today's date in YYYY-MM-DD format
function getTodayISO() {
	var d = new Date();
	return d.getFullYear() + "-" + 
		((d.getUTCMonth() + 1) < 10 ? "0" + (d.getUTCMonth() + 1) : (d.getUTCMonth() + 1)) + "-" + 
		(d.getDate() < 10 ? "0" + d.getDate() : d.getDate());
};

// Returns today's date in human-readable string
function getTodayReadable() {
	return new Date().toDateString();
};

// Returns only the current year
function getCurrentYear() {
	return new Date().getFullYear();
};

// Converts UNIX timestamp (in seconds) to date + time info
function formatUnixTimestamp(unixSeconds) {
	var d = new Date(unixSeconds * 1000);
	return {
		fullDateTime: d.toDateString() + " at " + d.toLocaleTimeString(),
		date: d.toDateString(),
		time: d.toLocaleTimeString(),
	};
};

// Converts JS Date or date string to "YYYY-MM-DD HH:mm:ss"
function formatDateTime(inputDate) {
	var d = new Date(inputDate);
	var date = d.getFullYear() + "-" + 
		((d.getUTCMonth() + 1) < 10 ? "0" + (d.getUTCMonth() + 1) : (d.getUTCMonth() + 1)) + "-" + 
		(d.getDate() < 10 ? "0" + d.getDate() : d.getDate());
	var time = (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + ":" + 
		(d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) + ":" + 
		(d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
	return date + " " + time;
};
