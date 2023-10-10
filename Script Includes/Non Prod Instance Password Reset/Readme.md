This script include can reset the password of the non prod instances using Rest integration. Before implementation you should have a admin user credentials for the integration. Follow follwoing steps to implement this script.

Step 1: Create Basic Auth Profile

Step 2: Go To the sys_auth_profile_basic.LIST

Step 3: Enter the Profile Name. For example: I have given instance name as a basic auth profile name "dev73660"

Step 4: Enter the admin user id and password of the non prod instance.

Step 5: Call this script include using below code.

```var instanceName = 'dev73660';  //instance name of the non prod instance```

```var userid = '62826bf03710200044e0bfc8bcbe5df1'; //Sysid of the target user for password reset```

```var password = 'Welcome@12345'; // Dummy password ```

```var authProfileName = 'dev73660'; //Basic authentication profile name setup at step 3```

```var passwordReset = new passwordReset();```

```gs.print(passwordReset.nonProdPasswordReset(instanceName, userid, password,authProfileName));```
