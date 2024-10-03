This code will be helpful to those who are looking out to remove HTML tags and convert it to String variable within the Flow Designer. The Replace String transformation function doesn't works well with the HTML variable so to overcome this challenge, we can make use of a Run Script Flow action along with a regex and JavaScript replace method.

The function expects the input HTML string to be passed into and we get a string free from HTML tags and whitespaces as an output.
