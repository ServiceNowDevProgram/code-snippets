module.exports.trimNonCharacters = (str) => str.replace(/[^\p{L}\d()\s]+/ug, '');
