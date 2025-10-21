/**
 * Script Include: RestGetWithBackoff
 * Purpose: Safely perform RESTMessageV2 GET requests with retry handling,
 *          exponential backoff, and simple pagination support.
 * 
 * Example usage (Background Script):
 *    var helper = new RestGetWithBackoff();
 *    var data = helper.getAll({
 *      endpoint: 'https://api.example.com/v1/items',
 *      headers: { 'Authorization': 'Bearer ${token}' },
 *      maxRetries: 4,
 *      baseDelayMs: 750
 *    });
 *    gs.info('Fetched ' + data.length + ' records');
 */

var RestGetWithBackoff = Class.create();
RestGetWithBackoff.prototype = {
  initialize: function() {},

  /**
   * Main entry point to fetch all pages of results.
   * Handles retries, pagination, and aggregates results.
   * @param {Object} options - endpoint, headers, maxRetries, baseDelayMs
   * @returns {Array} all items combined from paginated responses
   */
  getAll: function(options) {
    var url = options.endpoint;                  // Initial API endpoint
    var headers = options.headers || {};         // Optional request headers
    var maxRetries = options.maxRetries || 5;    // Maximum retry attempts per page
    var baseDelayMs = options.baseDelayMs || 500;// Base delay for exponential backoff

    var items = [];             // Array to collect all items across pages
    var attempts = 0;           // Total number of REST calls
    var totalSleepMs = 0;       // Total delay time across retries

    // Continue fetching until there are no more pages (links.next = null)
    while (url) {
      // Execute the REST call (with internal retry logic)
      var res = this._execute('get', url, headers, maxRetries, baseDelayMs);
      attempts += res.attempts;       // Count total attempts made
      totalSleepMs += res.sleptMs;    // Sum total sleep time used in retries

      // If non-success HTTP code, throw to stop execution
      if (res.status < 200 || res.status >= 300)
        throw 'HTTP ' + res.status + ' for ' + url + ': ' + res.body;

      // Parse and validate JSON body
      var json = this._safeJson(res.body);

      // If body contains an 'items' array, append to results
      if (Array.isArray(json.items)) items = items.concat(json.items);

      // Get next page link if available (standard 'links.next' pattern)
      url = json && json.links && json.links.next ? json.links.next : null;
    }

    // Log a completion summary
    gs.info('REST helper complete. items=' + items.length +
            ', attempts=' + attempts +
            ', sleptMs=' + totalSleepMs);

    return items;
  },

  /**
   * Executes a REST call with retry and exponential backoff.
   * Retries on HTTP 429 (Too Many Requests) or 5xx errors.
   * @returns {Object} status, body, attempts, sleptMs
   */
  _execute: function(method, url, headers, maxRetries, baseDelayMs) {
    var attempt = 0;
    var sleptMs = 0;

    while (true) {
      attempt++;

      // Build the RESTMessageV2 object
      var r = new sn_ws.RESTMessageV2();
      r.setEndpoint(url);
      r.setHttpMethod(method.toUpperCase());

      // Apply custom headers (for example, auth tokens or content type)
      Object.keys(headers).forEach(function(k) { r.setRequestHeader(k, headers[k]); });

      // Execute the request
      var resp = r.execute();
      var status = resp.getStatusCode();
      var body = resp.getBody();

      // Success range (2xx)
      if (status >= 200 && status < 300) {
        return { status: status, body: body, attempts: attempt, sleptMs: sleptMs };
      }

      // Handle 429 (rate limit) or transient 5xx server errors
      if (status === 429 || status >= 500) {
        // Stop retrying if max reached
        if (attempt >= maxRetries) {
          return { status: status, body: body, attempts: attempt, sleptMs: sleptMs };
        }

        // Honour Retry-After header if present; otherwise exponential delay
        var retryAfter = Number(resp.getHeader('Retry-After')) || 0;
        var delayMs = retryAfter > 0 ? retryAfter * 1000 : Math.pow(2, attempt) * baseDelayMs;

        // Log retry details for visibility in system logs
        gs.info('Retrying ' + url + ' after ' + delayMs +
                ' ms due to HTTP ' + status + ' (attempt ' + attempt + ')');

        gs.sleep(delayMs); // Wait before retrying
        sleptMs += delayMs;
        continue;
      }

      // Non-retryable failure (e.g., 4xx not including 429)
      return { status: status, body: body, attempts: attempt, sleptMs: sleptMs };
    }
  },

  /**
   * Safe JSON parser that throws descriptive error on invalid JSON.
   * @param {String} body - raw HTTP response text
   * @returns {Object} parsed JSON
   */
  _safeJson: function(body) {
    try {
      return JSON.parse(body || '{}');
    } catch (e) {
      throw 'Invalid JSON: ' + e.message;
    }
  },

  type: 'RestGetWithBackoff'
};
