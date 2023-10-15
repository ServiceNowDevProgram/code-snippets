/**
 *  Transforms a GlideRecord object to an object
 *  @return {object} packageToSend - The transformed object
 *  @param {object} recordToPackage - A GlideRecord object
 **/
function _grToObject(recordToPackage) {
  var packageToSend = {};
  for (var property in recordToPackage) {
      try {
          packageToSend[property] = recordToPackage[property].getDisplayValue();
      } catch (err) {}
  }
  return packageToSend;
}
