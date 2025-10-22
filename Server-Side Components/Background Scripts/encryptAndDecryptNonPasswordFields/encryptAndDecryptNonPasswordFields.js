//To Encrypt password field
var grIncident = new GlideRecord('incident');
if (grIncident.get('dc1c4143476202101b589d2f316d4390')) {
 grIncident.setDisplayValue('u_pass', 'demo@123');
 grIncident.update();
}
//NOTE: You can't use the setValue() API for the Password2 field

//To print cipher text
var grIncident = new GlideRecord('incident');
if (grIncident.get('dc1c4143476202101b589d2f316d4390')) {
 gs.info('Encrypted cipher test of password ' + grIncident.getValue('u_pass'));
}

//To decrypt password field
var grIncident = new GlideRecord('incident');
if (grIncident.get('dc1c4143476202101b589d2f316d4390')) {
 var result = grIncident.u_pass.getDecryptedValue();
 gs.info("Decrypted password- " +result);
}
//NOTE: The getDecryptedValue() API isn't scoped. It's available globally.
