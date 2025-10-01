function removeHtmlTags(value) {
  if (value === null || value === undefined) {
    return '';
  }

  var stringValue = String(value);
  var withoutTags = stringValue.replace(/<[^>]+>/g, ' ');

  return withoutTags.replace(/\s+/g, ' ').trim();
}

if (typeof module !== 'undefined') {
  module.exports = removeHtmlTags;
}

if (typeof inputs !== 'undefined' && typeof outputs !== 'undefined') {
  (function execute(inputs, outputs) {
    var htmlString = inputs.htmlValue || '';
    outputs.plainString = removeHtmlTags(htmlString);
  })(inputs, outputs);
}
