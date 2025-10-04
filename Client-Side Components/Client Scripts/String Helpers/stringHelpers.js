// Converts string to lowercase, removes symbols, replaces spaces with dashes
function toSlug(text) {
	let str = text.toLowerCase();
	str = str.replace(/[^a-z0-9_\s-]/g, "");
	str = str.replace(/[\s-]+/g, " ");
	str = str.replace(/[\s_]/g, "-");
	return str;
};

// Converts dashed/underscored text back to words with spaces
function fromSlugToWords(text) {
	return text.replace(/[-_]/g, " ");
};

// Converts dashed/underscored text to continuous word
function fromSlugToCompact(text) {
	return text.replace(/[-_]/g, "");
};

// Replaces spaces with underscores
function toUnderscoreCase(text) {
	return text.replace(/\s/g, "_");
};

// Capitalizes the first letter of each word
function capitalizeWords(text) {
	return text.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
};

// Converts entire string to uppercase
function toUpperCase(text) {
	return text ? text.toUpperCase() : text;
};

// Converts entire string to lowercase
function toLowerCase(text) {
	return text ? text.toLowerCase() : text;
};

// Removes spaces from start and end
function trimText(text) {
	return text.trim();
};
