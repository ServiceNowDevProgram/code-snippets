//Validate GIT Repository using Regular Expression

// Function to validate the  GIT Repository
function isValid_GIT_Repository(str) {
	// Regex to check valid
	// GIT Repository
	let regex = new RegExp(/((http|git|ssh|http(s)|file|\/?)|(git@[\w\.]+))(:(\/\/)?)([\w\.@\:/\-~]+)(\.git)(\/)?/);

	// if str
	// is empty return false
	if (str == null) {
		return "false";
	}

	// Return true if the str
	// matched the ReGex
	if (regex.test(str) == true) {
		return "true";
	}
	else {
		return "false";
	}
}

// Example Usage
// Test Case 1:
let str1 = "http://host.xz/path/to/repo.git/";
console.log(isValid_GIT_Repository(str1));

// Test Case 2:
let str2 = "https://github.com/ServiceNowDevProgram/code-snippets.git";
console.log(isValid_GIT_Repository(str2));

// Test Case 3:
let str3 = "git@git.smartbox.in:smartbox/american_locker.git";
console.log(isValid_GIT_Repository(str3));

// Test Case 4:
let str4 = "https://github.com/ServiceNowDevProgram/code-snippets";
console.log(isValid_GIT_Repository(str4));

// Test Case 5:
let str5 = "https://git.smartbox.in";
console.log(isValid_GIT_Repository(str5));

