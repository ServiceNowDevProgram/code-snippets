# The Glide User (g_user) is a global object available within the client side. It provides information about the logged-in  user.

Property                   Description

g_user.userID              Sys ID of the currently logged-in user
g_user.name                User's Full name
g_user.firstName           User's First name
g_user.lastName            User's Last name

# It also has some methods available within the client side.

Method                     Description

g_user.hasRole()           Determine whether the logged-in user has a specific role
g_user.hasRoleExactly()    Do not consider the admin role while evaluating the method
g_user.hasRoles()          You can pass two or more roles in a single method
