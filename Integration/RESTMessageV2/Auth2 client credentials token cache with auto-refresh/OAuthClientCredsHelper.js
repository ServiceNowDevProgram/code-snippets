/**
 * Script Include: OAuthClientCredsHelper
 * Purpose: Perform OAuth 2.0 client-credentials token acquisition and caching,
 *          and wrap RESTMessageV2 calls with automatic token injection and refresh.
 *
 * SECURITY: Store clientSecret in a secure location (Credentials or encrypted property).
 */
var OAuthClientCredsHelper = Class.create();
OAuthClientCredsHelper.prototype = {
  initialize: function() {},

  /**
   * Execute an API request with Bearer token and one-shot auto-refresh on 401.
   * Returns an object {status, body, headers, refreshed:Boolean}
   */
  request: function(options) {
    var token = this.getToken(options); // may fetch or use cached

    var res = this._call(options, token);
    if (res.status !== 401) return res;

    // If 401, refresh token once and retry
    var refreshed = this.getToken(this._forceRefresh(options));
    var retry = this._call(options, refreshed);
    retry.refreshed = true;
    return retry;
  },

  /**
   * Get a cached token or fetch a new one if expired/near-expiry.
   * Returns the access_token string.
   */
  getToken: function(options) {
    this._assert(['tokenUrl', 'clientId', 'clientSecret', 'propPrefix'], options);
    var now = new Date().getTime();

    var tokenKey = options.propPrefix + '.access_token';
    var expiryKey = options.propPrefix + '.expires_at';

    var cached = gs.getProperty(tokenKey, '');
    var expiresAt = parseInt(gs.getProperty(expiryKey, '0'), 10) || 0;

    // 60-second safety buffer
    var bufferMs = 60 * 1000;
    if (cached && expiresAt > (now + bufferMs)) {
      return cached;
    }

    // Need a fresh token
    var fresh = this._fetchToken(options);
    gs.setProperty(tokenKey, fresh.access_token);
    gs.setProperty(expiryKey, String(fresh.expires_at));
    return fresh.access_token;
  },

  // ------------------ internals ------------------

  _call: function(options, accessToken) {
    var r = new sn_ws.RESTMessageV2();
    r.setEndpoint(options.resource);
    r.setHttpMethod((options.method || 'GET').toUpperCase());
    r.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    // Extra headers
    Object.keys(options.headers || {}).forEach(function(k) {
      r.setRequestHeader(k, options.headers[k]);
    });

    if (options.body && /^(POST|PUT|PATCH)$/i.test(options.method || 'GET')) {
      r.setRequestBody(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
      // set content type if caller didn't
      if (!options.headers || !options.headers['Content-Type']) {
        r.setRequestHeader('Content-Type', 'application/json');
      }
    }

    var resp = r.execute();
    return {
      status: resp.getStatusCode(),
      body: resp.getBody(),
      headers: this._collectHeaders(resp),
      refreshed: false
    };
  },

  _fetchToken: function(options) {
    // RFC 6749 client-credentials: POST x-www-form-urlencoded
    var r = new sn_ws.RESTMessageV2();
    r.setEndpoint(options.tokenUrl);
    r.setHttpMethod('POST');
    r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    var params = [
      'grant_type=client_credentials',
      'client_id=' + encodeURIComponent(options.clientId),
      'client_secret=' + encodeURIComponent(options.clientSecret)
    ];
    if (options.scope) params.push('scope=' + encodeURIComponent(options.scope));
    if (options.audience) params.push('audience=' + encodeURIComponent(options.audience));

    r.setRequestBody(params.join('&'));

    var resp = r.execute();
    var status = resp.getStatusCode();
    var body = resp.getBody();
    if (status < 200 || status >= 300) {
      throw 'Token endpoint HTTP ' + status + ': ' + body;
    }

    var json;
    try { json = JSON.parse(body); }
    catch (e) { throw 'Invalid token JSON: ' + e.message; }

    var access = json.access_token;
    var ttlSec = Number(json.expires_in || 3600);
    if (!access) throw 'Token response missing access_token';

    var now = new Date().getTime();
    var expiresAt = now + (ttlSec * 1000);
    return { access_token: access, expires_at: expiresAt };
  },

  _collectHeaders: function(resp) {
    var map = {};
    var names = resp.getAllHeaders();
    for (var i = 0; i < names.size(); i++) {
      var name = String(names.get(i));
      map[name] = resp.getHeader(name);
    }
    return map;
  },

  _forceRefresh: function(options) {
    // Nudge cache by setting expiry in the past
    var expiryKey = options.propPrefix + '.expires_at';
    gs.setProperty(expiryKey, '0');
    return options;
  },

  _assert: function(keys, obj) {
    keys.forEach(function(k) {
      if (!obj || typeof obj[k] === 'undefined' || obj[k] === null || obj[k] === '')
        throw 'Missing option: ' + k;
    });
  },

  type: 'OAuthClientCredsHelper'
};
