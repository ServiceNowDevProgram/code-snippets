# Get User's Roles from User Name

GlideQuery's can greatly simplify extracting information from queries, especially when dot walking.

This query retrieves a user's roles, and returns an array of objects with the the role's display
value, the role's active status, the user's display value, and the user's email.  Adding more
fields is trivial with this format, and the query stream is very easy to follow.