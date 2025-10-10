/**
 * Advanced REST API Integration Handler
 * Provides retry logic, circuit breaker, rate limiting, and comprehensive error handling
 * 
 * @class RESTIntegrationHandler
 * @example
 * var handler = new RESTIntegrationHandler('MyAPI');
 * var response = handler.get('/users/123');
 * if (response.success) {
 *     gs.info('User data: ' + JSON.stringify(response.data));
 * }
 */

var RESTIntegrationHandler = Class.create();
RESTIntegrationHandler.prototype = {
    
    /**
     * Initialize the REST Integration Handler
     * @param {string} integrationName - Name of the integration (used for config lookup)
     */
    initialize: function(integrationName) {
        this.integrationName = integrationName;
        this.baseUrl = gs.getProperty('x_company.' + integrationName + '.base_url');
        this.maxRetries = parseInt(gs.getProperty('x_company.' + integrationName + '.max_retries', '3'));
        this.timeout = parseInt(gs.getProperty('x_company.' + integrationName + '.timeout', '30000'));
        this.rateLimit = parseInt(gs.getProperty('x_company.' + integrationName + '.rate_limit', '100'));
        
        // Circuit breaker configuration
        this.circuitBreaker = {
            state: 'CLOSED', // CLOSED, OPEN, HALF_OPEN
            failureCount: 0,
            failureThreshold: 5,
            successCount: 0,
            successThreshold: 2,
            lastFailureTime: null,
            resetTimeout: 60000 // 60 seconds
        };
        
        // Rate limiter (token bucket algorithm)
        this.rateLimiter = {
            tokens: this.rateLimit,
            lastRefill: new Date().getTime(),
            refillRate: this.rateLimit / 60 // per second
        };
        
        // Response cache
        this.cache = {};
        this.cacheTimeout = 300000; // 5 minutes
    },
    
    /**
     * Make a GET request with retry logic
     * @param {string} endpoint - API endpoint path
     * @param {object} params - Query parameters
     * @param {object} options - Additional options (headers, cache, etc.)
     * @returns {object} Response object with success, data, error, statusCode
     */
    get: function(endpoint, params, options) {
        options = options || {};
        options.method = 'GET';
        options.params = params;
        
        // Check cache for GET requests
        if (options.useCache !== false) {
            var cacheKey = this._getCacheKey(endpoint, params);
            var cachedResponse = this._getFromCache(cacheKey);
            if (cachedResponse) {
                gs.debug('[RESTIntegrationHandler] Cache hit for: ' + endpoint);
                return cachedResponse;
            }
        }
        
        var response = this._executeWithRetry(endpoint, options);
        
        // Cache successful GET responses
        if (response.success && options.useCache !== false) {
            this._addToCache(cacheKey, response);
        }
        
        return response;
    },
    
    /**
     * Make a POST request with retry logic
     * @param {string} endpoint - API endpoint path
     * @param {object} body - Request body
     * @param {object} options - Additional options
     * @returns {object} Response object
     */
    post: function(endpoint, body, options) {
        options = options || {};
        options.method = 'POST';
        options.body = body;
        return this._executeWithRetry(endpoint, options);
    },
    
    /**
     * Make a PUT request with retry logic
     * @param {string} endpoint - API endpoint path
     * @param {object} body - Request body
     * @param {object} options - Additional options
     * @returns {object} Response object
     */
    put: function(endpoint, body, options) {
        options = options || {};
        options.method = 'PUT';
        options.body = body;
        return this._executeWithRetry(endpoint, options);
    },
    
    /**
     * Make a DELETE request with retry logic
     * @param {string} endpoint - API endpoint path
     * @param {object} options - Additional options
     * @returns {object} Response object
     */
    'delete': function(endpoint, options) {
        options = options || {};
        options.method = 'DELETE';
        return this._executeWithRetry(endpoint, options);
    },
    
    /**
     * Execute request with exponential backoff retry logic
     * @private
     */
    _executeWithRetry: function(endpoint, options) {
        var attempt = 0;
        var delay = 1000; // Initial delay: 1 second
        var lastError = null;
        
        // Check circuit breaker
        if (!this._checkCircuitBreaker()) {
            return {
                success: false,
                error: 'Circuit breaker is OPEN. Service unavailable.',
                statusCode: 503,
                circuitBreakerState: this.circuitBreaker.state
            };
        }
        
        // Check rate limit
        if (!this._checkRateLimit()) {
            return {
                success: false,
                error: 'Rate limit exceeded. Please try again later.',
                statusCode: 429
            };
        }
        
        while (attempt <= this.maxRetries) {
            try {
                gs.debug('[RESTIntegrationHandler] Attempt ' + (attempt + 1) + ' for: ' + endpoint);
                
                var response = this._executeRequest(endpoint, options);
                
                // Success - reset circuit breaker
                if (response.success) {
                    this._recordSuccess();
                    return response;
                }
                
                // Check if error is retryable
                if (!this._isRetryable(response.statusCode)) {
                    this._recordFailure();
                    return response;
                }
                
                lastError = response;
                
            } catch (ex) {
                lastError = {
                    success: false,
                    error: 'Exception: ' + ex.message,
                    statusCode: 0
                };
                gs.error('[RESTIntegrationHandler] Exception on attempt ' + (attempt + 1) + ': ' + ex.message);
            }
            
            attempt++;
            
            // Don't sleep after last attempt
            if (attempt <= this.maxRetries) {
                gs.debug('[RESTIntegrationHandler] Retrying in ' + delay + 'ms...');
                gs.sleep(delay);
                delay *= 2; // Exponential backoff
            }
        }
        
        // All retries exhausted
        this._recordFailure();
        lastError.retriesExhausted = true;
        lastError.totalAttempts = attempt;
        
        return lastError;
    },
    
    /**
     * Execute the actual HTTP request
     * @private
     */
    _executeRequest: function(endpoint, options) {
        var url = this.baseUrl + endpoint;
        var request = new sn_ws.RESTMessageV2();
        
        request.setHttpMethod(options.method);
        request.setEndpoint(url);
        request.setHttpTimeout(this.timeout);
        
        // Add query parameters for GET requests
        if (options.params) {
            for (var key in options.params) {
                request.setQueryParameter(key, options.params[key]);
            }
        }
        
        // Add request body for POST/PUT
        if (options.body) {
            request.setRequestBody(JSON.stringify(options.body));
        }
        
        // Set headers
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Accept', 'application/json');
        
        // Add authentication
        this._addAuthentication(request, options);
        
        // Add custom headers
        if (options.headers) {
            for (var header in options.headers) {
                request.setRequestHeader(header, options.headers[header]);
            }
        }
        
        // Execute request
        var response = request.execute();
        var statusCode = response.getStatusCode();
        var responseBody = response.getBody();
        
        // Log request/response
        this._logRequest(options.method, url, options.body, statusCode, responseBody);
        
        // Parse response
        var result = {
            success: statusCode >= 200 && statusCode < 300,
            statusCode: statusCode,
            headers: this._parseHeaders(response),
            rawBody: responseBody
        };
        
        // Parse JSON response
        try {
            if (responseBody) {
                result.data = JSON.parse(responseBody);
            }
        } catch (ex) {
            result.data = responseBody;
        }
        
        // Add error message for failed requests
        if (!result.success) {
            result.error = this._extractErrorMessage(result.data, statusCode);
        }
        
        return result;
    },
    
    /**
     * Check circuit breaker state
     * @private
     */
    _checkCircuitBreaker: function() {
        var now = new Date().getTime();
        
        // If circuit is OPEN, check if reset timeout has passed
        if (this.circuitBreaker.state === 'OPEN') {
            if (now - this.circuitBreaker.lastFailureTime > this.circuitBreaker.resetTimeout) {
                gs.info('[RESTIntegrationHandler] Circuit breaker transitioning to HALF_OPEN');
                this.circuitBreaker.state = 'HALF_OPEN';
                this.circuitBreaker.successCount = 0;
                return true;
            }
            return false;
        }
        
        return true;
    },
    
    /**
     * Record successful request
     * @private
     */
    _recordSuccess: function() {
        if (this.circuitBreaker.state === 'HALF_OPEN') {
            this.circuitBreaker.successCount++;
            if (this.circuitBreaker.successCount >= this.circuitBreaker.successThreshold) {
                gs.info('[RESTIntegrationHandler] Circuit breaker transitioning to CLOSED');
                this.circuitBreaker.state = 'CLOSED';
                this.circuitBreaker.failureCount = 0;
            }
        } else if (this.circuitBreaker.state === 'CLOSED') {
            this.circuitBreaker.failureCount = 0;
        }
    },
    
    /**
     * Record failed request
     * @private
     */
    _recordFailure: function() {
        this.circuitBreaker.failureCount++;
        this.circuitBreaker.lastFailureTime = new Date().getTime();
        
        if (this.circuitBreaker.failureCount >= this.circuitBreaker.failureThreshold) {
            gs.warn('[RESTIntegrationHandler] Circuit breaker transitioning to OPEN');
            this.circuitBreaker.state = 'OPEN';
        }
    },
    
    /**
     * Check rate limit using token bucket algorithm
     * @private
     */
    _checkRateLimit: function() {
        var now = new Date().getTime();
        var timePassed = (now - this.rateLimiter.lastRefill) / 1000; // seconds
        
        // Refill tokens
        this.rateLimiter.tokens = Math.min(
            this.rateLimit,
            this.rateLimiter.tokens + (timePassed * this.rateLimiter.refillRate)
        );
        this.rateLimiter.lastRefill = now;
        
        // Check if we have tokens available
        if (this.rateLimiter.tokens >= 1) {
            this.rateLimiter.tokens -= 1;
            return true;
        }
        
        gs.warn('[RESTIntegrationHandler] Rate limit exceeded');
        return false;
    },
    
    /**
     * Check if HTTP status code is retryable
     * @private
     */
    _isRetryable: function(statusCode) {
        // Retry on server errors (5xx) and specific client errors
        var retryableCodes = [408, 429, 500, 502, 503, 504];
        return retryableCodes.indexOf(statusCode) !== -1;
    },
    
    /**
     * Add authentication to request
     * @private
     */
    _addAuthentication: function(request, options) {
        var authType = gs.getProperty('x_company.' + this.integrationName + '.auth_type', 'bearer');
        
        if (authType === 'bearer') {
            var token = this._getAuthToken();
            if (token) {
                request.setRequestHeader('Authorization', 'Bearer ' + token);
            }
        } else if (authType === 'basic') {
            var username = gs.getProperty('x_company.' + this.integrationName + '.username');
            var password = gs.getProperty('x_company.' + this.integrationName + '.password');
            request.setBasicAuth(username, password);
        } else if (authType === 'apikey') {
            var apiKey = gs.getProperty('x_company.' + this.integrationName + '.api_key');
            var headerName = gs.getProperty('x_company.' + this.integrationName + '.api_key_header', 'X-API-Key');
            request.setRequestHeader(headerName, apiKey);
        }
    },
    
    /**
     * Get authentication token (with caching)
     * @private
     */
    _getAuthToken: function() {
        // Check cache
        var cacheKey = 'auth_token_' + this.integrationName;
        var cachedToken = this._getFromCache(cacheKey);
        if (cachedToken) {
            return cachedToken.token;
        }
        
        // Acquire new token (implement OAuth 2.0 flow here)
        var token = gs.getProperty('x_company.' + this.integrationName + '.access_token');
        
        // Cache token
        this._addToCache(cacheKey, { token: token }, 3600000); // 1 hour
        
        return token;
    },
    
    /**
     * Cache management
     * @private
     */
    _getCacheKey: function(endpoint, params) {
        return endpoint + '_' + JSON.stringify(params || {});
    },
    
    _getFromCache: function(key) {
        var cached = this.cache[key];
        if (cached && new Date().getTime() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }
        return null;
    },
    
    _addToCache: function(key, data, ttl) {
        this.cache[key] = {
            data: data,
            timestamp: new Date().getTime(),
            ttl: ttl || this.cacheTimeout
        };
    },
    
    /**
     * Parse response headers
     * @private
     */
    _parseHeaders: function(response) {
        var headers = {};
        var headerKeys = response.getHeaders();
        for (var i = 0; i < headerKeys.size(); i++) {
            var key = headerKeys.get(i);
            headers[key] = response.getHeader(key);
        }
        return headers;
    },
    
    /**
     * Extract error message from response
     * @private
     */
    _extractErrorMessage: function(data, statusCode) {
        if (typeof data === 'object') {
            return data.error || data.message || data.error_description || 'HTTP ' + statusCode;
        }
        return 'HTTP ' + statusCode + ': ' + data;
    },
    
    /**
     * Log request/response for debugging
     * @private
     */
    _logRequest: function(method, url, body, statusCode, responseBody) {
        if (gs.getProperty('x_company.' + this.integrationName + '.debug', 'false') === 'true') {
            gs.info('[RESTIntegrationHandler] ' + method + ' ' + url);
            if (body) {
                gs.debug('[RESTIntegrationHandler] Request: ' + JSON.stringify(body));
            }
            gs.info('[RESTIntegrationHandler] Response: ' + statusCode);
            gs.debug('[RESTIntegrationHandler] Body: ' + responseBody);
        }
    },
    
    type: 'RESTIntegrationHandler'
};
