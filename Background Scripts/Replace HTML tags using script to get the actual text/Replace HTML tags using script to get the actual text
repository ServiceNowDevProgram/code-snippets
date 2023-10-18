function replaceHtmlTags(inputString) {
    // Use regular expression to match HTML tags and replace them with an empty string
 if (typeof inputString !== 'string') {
    throw new Error('Input must be a string');
  }
    var regex = /<(?:.|\n)*?>/gm;
    return inputString.replace(regex, '');
}

// Example usage:
var originalString = '<p>This is a <b>sample</b> text with <a href="https://example.com">links</a>.</p>';
var stringWithoutHtmlTags = replaceHtmlTags(originalString);
gs.info('Original String: ' + originalString);
gs.info('String without HTML tags: ' + stringWithoutHtmlTags);
