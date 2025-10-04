// Converts string to lowercase, removes symbols, replaces spaces with dashes
function toSlug(text) {
	let str = text.toLowerCase();
	str = str.replace(/[^a-z0-9_\s-]/g, "");
	str = str.replace(/[\s-]+/g, " ");
	str = str.replace(/[\s_]/g, "-");
	return str;
};