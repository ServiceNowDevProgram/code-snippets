    function createAdminUser(strUserName, strFirstName, strLastName, strEmail) {

        try {
            var grUser               = new GlideRecord('sys_user');
            var strPreferredLanguage = 'en';
            var stTimeZone           = 'Europe/Berlin';
            var strDateFormat        = 'dd.MM.yyyy';
            var strStartPassword     = 'Start1234!';
            var strUserSysId         = null;
            var arrRoles             = [
                'admin', 
                'workspace_admin',
                'security_admin',
            ];
            var objUserPreferences   = [
                {'name' : 'glide.ui.application_picker.in_header', 'value' : 'true'},
                {'name' : 'glide.ui.update_set_picker.in_header', 'value' : 'true'},
                {'name' : 'glide.ui.related_list_timing', 'value' : 'deferred'},
                {'name' : 'glide.css.theme.ui16', 'value' : '7547a6e0673102008dd992a557415af1'},
                {'name' : 'rowcount', 'value' : '100'},
                {'name' : 'com.glideapp.dashboards.homepage_notification.dont_ask_me_again', 'value' : 'true'},
            ];        

  
            //----------------------------------------------------------------------------------
            //perform some tests on method parameters
            //----------------------------------------------------------------------------------

            if (!(typeof strUserName === "string" && strUserName.trim().length > 3)) {
                gs.addErrorMessage('Please pass a valid value for Parameter "strUserName"!');
                return null;
            }

            if (!(typeof strFirstName === "string" && strFirstName.trim().length > 2)) {
                gs.addErrorMessage('Please pass a valid value for Parameter "strFirstName"!');
                return null;
            }

            if (!(typeof strLastName === "string" && strLastName.trim().length > 2)) {
                gs.addErrorMessage('Please pass a valid value for Parameter "strLastName"!');
                return null;
            }

 
            if (!(typeof strEmail === "string" && strEmail.trim().length > 10)) {
                gs.addErrorMessage('Please pass a valid value for Parameter "strEmail"!');
                return null;
            }

            strUserName  = strUserName.trim();
            strFirstName = strFirstName.trim();
            strLastName  = strLastName.trim();
            strEmail     = strEmail.trim();
            
            if (grUser.get('user_name', strUserName)) {
                gs.addErrorMessage('User with user name "' + strUserName  + '" already exists!');
                return null;
            }

            if (grUser.get('email', strEmail)) {
                gs.addErrorMessage('User with email "' + strEmail  + '" already exists!');
                return null;
            }


            //----------------------------------------------------------------------------------
            //test, whether all roles exists and current logged-in is allowed to 
            //assign a priviledged role to a new user
            //----------------------------------------------------------------------------------

            var grRole = new GlideRecord('sys_user_role');

            arrRoles.forEach(function(strRoleName) {
                if (grRole.get('name', strRoleName)) {
                    if (grRole.getValue('elevated_privilege') == 1 && !gs.hasRole('security_admin')) {
                        gs.addErrorMessage('Your are not allowed to assign role "' + strRoleName + '" to antother user!');
                        return null;
                    }
                }
                else {
                    gs.addErrorMessage('Role "' + strRoleName + '" does not exist!');
                    return null;
                }
            });

            
            //----------------------------------------------------------------------------------
            //create record at table <sys_user>
            //----------------------------------------------------------------------------------

            grUser.initialize();
            grUser.setValue('user_name', strUserName);
            grUser.setValue('email', strEmail);
            grUser.setValue('first_name', strFirstName);
            grUser.setValue('last_name', strLastName);
            grUser.setValue('preferred_language', strPreferredLanguage);
            grUser.setValue('time_zone', stTimeZone);
            grUser.setValue('date_format', strDateFormat);
            grUser.setValue('password_needs_reset', true);
            grUser.getElement('user_password').setDisplayValue(strStartPassword);
    
            if (grUser.insert()) {
                strUserSysId = grUser.getUniqueValue();
            }
            else {
                gs.addErrorMessage('Could not create user with user name "' + strUserName + '"!');
                return null;
            }


            //----------------------------------------------------------------------------------
            //add roles to user
            //----------------------------------------------------------------------------------

            arrRoles.forEach(function(strRoleName) {
                if (grRole.get('name', strRoleName)) {
                    var grUserHasRole = new GlideRecord("sys_user_has_role");
    
                    grUserHasRole.initialize();
                    grUserHasRole.setValue('role', grRole.getUniqueValue());
                    grUserHasRole.setValue('user', strUserSysId);
        
                    if (!grUserHasRole.insert()) {
                        gs.addErrorMessage(
                            'Could not assign role "' + strRoleName + '"' +
                            ' to user with user name "' + strUserName + '"!'
                        );
                    }
                }
                else {
                    gs.addErrorMessage(
                        'Role "' + strRoleName + '"' +
                        ' is not available and thus cannot be assigned to user with user name "' + strUserName + '"!'
                    );
                }
            });
 

            //----------------------------------------------------------------------------------
            //add some user preferences
            //----------------------------------------------------------------------------------

            var grUserPreference = new GlideRecord('sys_user_preference');    
    
            for (var i = 0; i < objUserPreferences.length; i++) {		
                grUserPreference.initialize();
                grUserPreference.setValue('user', strUserSysId);
                grUserPreference.setValue('name', objUserPreferences[i].name);
                grUserPreference.setValue('value', objUserPreferences[i].value);
                grUserPreference.insert();
            }

            return strUserSysId;
        }
        catch (e) {
            gs.addErrorMessage('Unexpected error! See syslog for more information!');
            gs.error(e);		
        }

        return null; 
    }
