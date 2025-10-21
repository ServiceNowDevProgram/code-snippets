// Use: Fix script to update all email domains in sys_user table
// Replaces 'bad_domain.com' with 'new_domain.com' in email field

var usr = new GlideRecord('sys_user');
usr.addEncodedQuery('emailLIKEbad_domain.com'); // find users with old domain
usr.query();

while (usr.next()) {
    gs.print('OLD EMAIL: ' + usr.email);

    // Create regex to match old domain
    var regex = new SNC.Regex('bad_domain\\.com'); // uses '\\' to escape dot for regex
    // Use replaceAll method to substitute
    usr.email = regex.replaceAll(usr.email, 'new_domain.com');
    usr.update();
    gs.print('NEW EMAIL: ' + usr.email);
}
