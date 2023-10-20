This script takes in a GlideRecord object and returns an object. Use the following background script to test the function.

function _grToObject(recordToPackage) {
  var packageToSend = {};
  for (var property in recordToPackage) {
      try {
          packageToSend[property] = recordToPackage[property].getDisplayValue();
      } catch (err) {}
  }
  return packageToSend;
}

var incSysID = ''; // Update w/ Incident sysId in target instance

var grInc = new GlideRecord('incident');
if(grInc.get(incSysID)){
    gs.info(JSON.stringify(_grToObject(grInc)));
} else {
    gs.info('Invalid Incident sysId');
}
