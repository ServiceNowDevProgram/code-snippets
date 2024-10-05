//Validating URLs using regular expressions

// Regular expression to match URLs
const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

// Function to check if a URL is valid using the regular expression
function isValidURL(url) {
  // Test the URL against the regex
  return regex.test(url);
}

// Example URL string
const url= "www.servicenow.com"; // Replace with an URL

// Check if the URL matches the format and log the result
if (isValidURL(url)) {
  console.log(`Valid URL`);
} else {
  console.log(`Invalid URL`);
}
