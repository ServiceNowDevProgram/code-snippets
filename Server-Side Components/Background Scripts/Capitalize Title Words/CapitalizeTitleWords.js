/*
* According to MLA Format, the first and last words will always be capitalized even if normally excluded.
* Otherwise, you can add to the list of excluded words via the "excludedWords" array in the "processTitle" function.
* Set the "title" variable to the text you want to format. Often this will be a Short Description or similar field. Or you can call "processTitle" and pass in the string
* You can use a Business Rule (on insert) to make the modifications and provide more consistent formatting even when you have users who love to exclusively use lower case for everything.
*/

var title = "the ultimate short description of the 21st century";

gs.info(processTitle(title));

function processTitle(title) {
  var excludedWords = ["a", "and", "as", "at", "but", "by", "down", "for", "from", "if", "in", "into", "like", "near", "nor", "of", "off", "on", "once", "onto", "or", "over", "past", "so", "than", "that", "the", "to", "upon", "when", "with", "yet"];
  
	var indexList = [0];
	var startIndex = -1;
	var currentToken = [];
	for (var i = 0; i < title.length; i++) {
		var c = title[i];
		var cNum = c.charCodeAt(0);
		if ((cNum >= 65 && cNum <= 90) || (cNum >= 97 && cNum <= 122) || (cNum >= 48 && cNum <= 57) || (cNum == 39)) {
			if (currentToken.length == 0)
				startIndex = i;
			currentToken.push(c);
		} else {
			if (excludedWords.indexOf(currentToken.join("")) == -1) {
				indexList.push(startIndex);
			}
			currentToken = [];
		}
	}

	indexList.push(startIndex);

	var titleArray = [];
	for (var i2 = 0; i2 < title.length; i2++) {
		if (indexList.indexOf(i2) != -1) {
			titleArray.push(title[i2].toUpperCase());
		} else {
			titleArray.push(title[i2]);
		}
	}

	return titleArray.join("");
}
