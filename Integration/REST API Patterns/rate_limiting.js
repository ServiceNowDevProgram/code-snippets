/**
 * Rate Limiting Implementation for ServiceNow REST API Calls
 * 
 * This script provides rate limiting capabilities to control the frequency
 * of outbound API calls and comply with external API rate limits.
 * 
 * @author: ServiceNow Community
 * @version: 1.0
 * @category: Integration/Rate Limiting
 */

var RateLimiter = Class.create();
RateLimiter.prototype = {
    
    initialize: function(options) {
        this.maxRequests = options.maxRequests || 100;
        this.timeWindowMs = options.timeWindowMs || 60000; // 1 minute default
        this.strategy = options.strategy || 'token_bucket'; // token_bucket, sliding_window, fixed_window
        this.burstCapacity = options.burstCapacity || this.maxRequests;
        this.identifier = options.identifier || 'default';
        
        // Initialize based on strategy
        this._initializeStrategy();
    },
    
    /**
     * Check if request is allowed and consume a token
     * @param {string} key - Optional key for per-user/endpoint limiting
     * @returns {Object} Result with allowed status and metadata
     */
    checkLimit: function(key) {
        var limitKey = this.identifier + (key ? ':' + key : '');
        var now = new GlideDateTime().getNumericValue();
        
        switch (this.strategy) {
            case 'token_bucket':
                return this._checkTokenBucket(limitKey, now);
            case 'sliding_window':
                return this._checkSlidingWindow(limitKey, now);
            case 'fixed_window':
                return this._checkFixedWindow(limitKey, now);
            default:
                throw new Error('Unknown rate limiting strategy: ' + this.strategy);
        }
    },
    
    /**
     * Execute API call with rate limiting
     * @param {Function} apiCall - Function to execute
     * @param {string} key - Optional rate limit key
     * @param {Object} options - Additional options
     * @returns {Object} API call result with rate limit info
     */
    executeWithLimit: function(apiCall, key, options) {
        options = options || {};
        var maxWaitMs = options.maxWaitMs || 10000;
        var waitInterval = options.waitInterval || 100;
        var startTime = new GlideDateTime().getNumericValue();
        
        while (true) {
            var limitCheck = this.checkLimit(key);
            
            if (limitCheck.allowed) {
                try {
                    var result = apiCall();
                    return {
                        success: true,
                        data: result,
                        rateLimit: limitCheck,
                        waitTime: new GlideDateTime().getNumericValue() - startTime
                    };
                } catch (e) {
                    return {
                        success: false,
                        error: e.message,
                        rateLimit: limitCheck,
                        waitTime: new GlideDateTime().getNumericValue() - startTime
                    };
                }
            }
            
            // Check if we've exceeded max wait time
            var currentTime = new GlideDateTime().getNumericValue();
            if (currentTime - startTime > maxWaitMs) {
                return {
                    success: false,
                    error: 'Rate limit wait timeout exceeded',
                    rateLimit: limitCheck,
                    waitTime: currentTime - startTime
                };
            }
            
            // Wait before trying again
            gs.sleep(waitInterval);
        }
    },
    
    /**
     * Get current rate limit status
     * @param {string} key - Optional key for specific limit
     * @returns {Object} Current status information
     */
    getStatus: function(key) {
        var limitKey = this.identifier + (key ? ':' + key : '');
        var now = new GlideDateTime().getNumericValue();
        
        switch (this.strategy) {
            case 'token_bucket':
                return this._getTokenBucketStatus(limitKey, now);
            case 'sliding_window':
                return this._getSlidingWindowStatus(limitKey, now);
            case 'fixed_window':
                return this._getFixedWindowStatus(limitKey, now);
            default:
                return { error: 'Unknown strategy' };
        }
    },
    
    /**
     * Reset rate limit for a specific key
     * @param {string} key - Key to reset
     */
    reset: function(key) {
        var limitKey = this.identifier + (key ? ':' + key : '');
        
        // Remove from system properties
        var props = ['tokens', 'last_refill', 'window_start', 'request_count', 'requests'];
        for (var i = 0; i < props.length; i++) {
            gs.setProperty('rate_limit.' + limitKey + '.' + props[i], '');
        }
    },
    
    /**
     * Initialize strategy-specific data structures
     * @private
     */
    _initializeStrategy: function() {
        // Strategy-specific initialization if needed
        gs.info('RateLimiter: Initialized with strategy ' + this.strategy + 
               ', max requests: ' + this.maxRequests + 
               ', window: ' + this.timeWindowMs + 'ms');
    },
    
    /**
     * Token bucket rate limiting implementation
     * @param {string} key - Limit key
     * @param {number} now - Current timestamp
     * @returns {Object} Limit check result
     * @private
     */
    _checkTokenBucket: function(key, now) {
        var tokensKey = 'rate_limit.' + key + '.tokens';
        var lastRefillKey = 'rate_limit.' + key + '.last_refill';
        
        var currentTokens = parseFloat(gs.getProperty(tokensKey, this.burstCapacity.toString()));
        var lastRefill = parseFloat(gs.getProperty(lastRefillKey, now.toString()));
        
        // Calculate tokens to add based on time elapsed
        var timeSinceLastRefill = now - lastRefill;
        var tokensToAdd = (timeSinceLastRefill / this.timeWindowMs) * this.maxRequests;
        
        // Update token count
        currentTokens = Math.min(this.burstCapacity, currentTokens + tokensToAdd);
        
        var allowed = currentTokens >= 1;
        
        if (allowed) {
            currentTokens -= 1;
        }
        
        // Store updated values
        gs.setProperty(tokensKey, currentTokens.toString());
        gs.setProperty(lastRefillKey, now.toString());
        
        return {
            allowed: allowed,
            strategy: 'token_bucket',
            remaining: Math.floor(currentTokens),
            resetTime: null,
            retryAfter: allowed ? 0 : Math.ceil((1 - currentTokens) * (this.timeWindowMs / this.maxRequests))
        };
    },
    
    /**
     * Sliding window rate limiting implementation
     * @param {string} key - Limit key
     * @param {number} now - Current timestamp
     * @returns {Object} Limit check result
     * @private
     */
    _checkSlidingWindow: function(key, now) {
        var requestsKey = 'rate_limit.' + key + '.requests';
        var requestsJson = gs.getProperty(requestsKey, '[]');
        var requests = JSON.parse(requestsJson);
        
        // Remove requests outside the time window
        var windowStart = now - this.timeWindowMs;
        requests = requests.filter(function(timestamp) {
            return timestamp > windowStart;
        });
        
        var allowed = requests.length < this.maxRequests;
        
        if (allowed) {
            requests.push(now);
        }
        
        // Store updated requests
        gs.setProperty(requestsKey, JSON.stringify(requests));
        
        var oldestRequest = requests.length > 0 ? Math.min.apply(Math, requests) : now;
        var resetTime = oldestRequest + this.timeWindowMs;
        
        return {
            allowed: allowed,
            strategy: 'sliding_window',
            remaining: this.maxRequests - requests.length,
            resetTime: resetTime,
            retryAfter: allowed ? 0 : Math.max(0, resetTime - now)
        };
    },
    
    /**
     * Fixed window rate limiting implementation
     * @param {string} key - Limit key
     * @param {number} now - Current timestamp
     * @returns {Object} Limit check result
     * @private
     */
    _checkFixedWindow: function(key, now) {
        var windowStartKey = 'rate_limit.' + key + '.window_start';
        var requestCountKey = 'rate_limit.' + key + '.request_count';
        
        var windowStart = parseFloat(gs.getProperty(windowStartKey, '0'));
        var requestCount = parseInt(gs.getProperty(requestCountKey, '0'));
        
        // Check if we need to start a new window
        if (now - windowStart >= this.timeWindowMs) {
            windowStart = now;
            requestCount = 0;
        }
        
        var allowed = requestCount < this.maxRequests;
        
        if (allowed) {
            requestCount++;
        }
        
        // Store updated values
        gs.setProperty(windowStartKey, windowStart.toString());
        gs.setProperty(requestCountKey, requestCount.toString());
        
        var resetTime = windowStart + this.timeWindowMs;
        
        return {
            allowed: allowed,
            strategy: 'fixed_window',
            remaining: this.maxRequests - requestCount,
            resetTime: resetTime,
            retryAfter: allowed ? 0 : Math.max(0, resetTime - now)
        };
    },
    
    /**
     * Get token bucket status
     * @param {string} key - Limit key
     * @param {number} now - Current timestamp
     * @returns {Object} Status information
     * @private
     */
    _getTokenBucketStatus: function(key, now) {
        var tokensKey = 'rate_limit.' + key + '.tokens';
        var lastRefillKey = 'rate_limit.' + key + '.last_refill';
        
        var currentTokens = parseFloat(gs.getProperty(tokensKey, this.burstCapacity.toString()));
        var lastRefill = parseFloat(gs.getProperty(lastRefillKey, now.toString()));
        
        return {
            strategy: 'token_bucket',
            maxRequests: this.maxRequests,
            burstCapacity: this.burstCapacity,
            currentTokens: currentTokens,
            lastRefill: new GlideDateTime(lastRefill),
            timeWindowMs: this.timeWindowMs
        };
    },
    
    /**
     * Get sliding window status
     * @param {string} key - Limit key
     * @param {number} now - Current timestamp
     * @returns {Object} Status information
     * @private
     */
    _getSlidingWindowStatus: function(key, now) {
        var requestsKey = 'rate_limit.' + key + '.requests';
        var requestsJson = gs.getProperty(requestsKey, '[]');
        var requests = JSON.parse(requestsJson);
        
        var windowStart = now - this.timeWindowMs;
        var validRequests = requests.filter(function(timestamp) {
            return timestamp > windowStart;
        });
        
        return {
            strategy: 'sliding_window',
            maxRequests: this.maxRequests,
            currentRequests: validRequests.length,
            remaining: this.maxRequests - validRequests.length,
            timeWindowMs: this.timeWindowMs,
            requestTimestamps: validRequests
        };
    },
    
    /**
     * Get fixed window status
     * @param {string} key - Limit key
     * @param {number} now - Current timestamp
     * @returns {Object} Status information
     * @private
     */
    _getFixedWindowStatus: function(key, now) {
        var windowStartKey = 'rate_limit.' + key + '.window_start';
        var requestCountKey = 'rate_limit.' + key + '.request_count';
        
        var windowStart = parseFloat(gs.getProperty(windowStartKey, '0'));
        var requestCount = parseInt(gs.getProperty(requestCountKey, '0'));
        
        return {
            strategy: 'fixed_window',
            maxRequests: this.maxRequests,
            currentRequests: requestCount,
            remaining: this.maxRequests - requestCount,
            windowStart: new GlideDateTime(windowStart),
            windowEnd: new GlideDateTime(windowStart + this.timeWindowMs),
            timeWindowMs: this.timeWindowMs
        };
    },
    
    type: 'RateLimiter'
};

// Usage Examples:

/*
// Token bucket rate limiter (allows bursts)
var tokenBucketLimiter = new RateLimiter({
    maxRequests: 100,
    timeWindowMs: 60000, // 1 minute
    strategy: 'token_bucket',
    burstCapacity: 150,
    identifier: 'external-api'
});

// Check if request is allowed
var limitCheck = tokenBucketLimiter.checkLimit('user123');
if (limitCheck.allowed) {
    // Make API call
    gs.info('Request allowed, remaining: ' + limitCheck.remaining);
} else {
    gs.warn('Rate limit exceeded, retry after: ' + limitCheck.retryAfter + 'ms');
}

// Execute API call with automatic rate limiting
var result = tokenBucketLimiter.executeWithLimit(function() {
    var rm = new sn_ws.RESTMessageV2();
    rm.setEndpoint('https://api.example.com/data');
    rm.setHttpMethod('GET');
    return rm.execute();
}, 'endpoint1', { maxWaitMs: 5000 });

if (result.success) {
    gs.info('API call completed after ' + result.waitTime + 'ms wait');
}

// Sliding window rate limiter (strict enforcement)
var slidingWindowLimiter = new RateLimiter({
    maxRequests: 50,
    timeWindowMs: 60000,
    strategy: 'sliding_window',
    identifier: 'strict-api'
});

// Fixed window rate limiter (traditional approach)
var fixedWindowLimiter = new RateLimiter({
    maxRequests: 1000,
    timeWindowMs: 3600000, // 1 hour
    strategy: 'fixed_window',
    identifier: 'hourly-limit'
});

// Check status
var status = tokenBucketLimiter.getStatus('user123');
gs.info('Rate limiter status: ' + JSON.stringify(status));

// Reset limits for a specific key
tokenBucketLimiter.reset('user123');
*/
