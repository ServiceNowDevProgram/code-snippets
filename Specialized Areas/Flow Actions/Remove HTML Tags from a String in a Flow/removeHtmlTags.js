(function execute(inputs, outputs) {
  var htmlString = inputs.htmlValue || '';
  outputs.plainString = htmlString.replace(/<[^>]+>/g, '').trim();
})(inputs, outputs);
