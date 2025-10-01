# Helps to get Refresh Token based on username and password or get the Access Token based on the Refresh Token
# To be noted that this is using the new ES2021 feature. So if your instance is upgraded to Xanadu or you are using a Scoped App that already enabled the ES2021 then this Script Include can be used.

# Example

```
var helper = new OAuthTokenHelper();

var result = helper.getRefreshAndAccessTokens("oauth_profile_id", "context e.g. Sales", "user@service-now.com", "username", "password") 

```