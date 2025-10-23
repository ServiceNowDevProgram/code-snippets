// Background Script example: call an API with automatic OAuth bearer handling
(function() {
  var helper = new OAuthClientCredsHelper();

  var options = {
    // Token settings
    tokenUrl: 'https://auth.example.com/oauth2/token',
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET', // store securely in real environments
    scope: 'read:things',               // optional
    audience: '',                       // optional (for some IdPs)
    propPrefix: 'x_acme.oauth.sample',  // system property prefix for cache

    // Resource request
    resource: 'https://api.example.com/v1/things?limit=25',
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  };

  var res = helper.request(options);
  gs.info('Status: ' + res.status + ', refreshed=' + res.refreshed);
  gs.info('Body: ' + res.body);
})();
