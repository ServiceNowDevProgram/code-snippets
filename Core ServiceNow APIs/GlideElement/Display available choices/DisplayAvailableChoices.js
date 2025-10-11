var grInc = new GlideRecord('incident');
grInc.get('number', 'INC0006924');
var acceptedValues = j2js(grInc.contact_type.getChoices());
gs.debug('The accepted values for field contact_type are: ' + acceptedValues.join(', '));