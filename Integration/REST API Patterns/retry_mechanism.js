/**
 * Retry Mechanism for ServiceNow REST API Calls
 * 
 * This script provides a robust retry mechanism with exponential backoff
 * for handling transient failures in REST API integrations.
 * 
 * @author: ServiceNow Community
 * @version: 1.0
 * @category: Integration/Reliability
 */

var RetryMechanism = Class.create();
RetryMechanism.prototype = {
    
    initialize: function(options) {
        this.maxRetries = options.maxRetries || 3;
        this.baseDelay = options.baseDelay || 1000; // milliseconds
        this.maxDelay = options.maxDelay || 30000; // milliseconds
        this.exponentialFactor = options.exponentialFactor || 2;
        this.jitterEnabled = options.jitterEnabled !== false; // default true
        this.retryableStatusCodes = options.retryableStatusCodes || [408, 429, 500, 502, 503, 504];
        this.retryableErrors = options.retryableErrors || ['timeout', 'network', 'connection'];
    },
    
    /**
     * Execute REST call with retry mechanism
     * @param {Function} apiCall - Function that returns REST response
     * @param {Object} context - Additional context for logging
     * @returns {Object} Final response or error
     */
    executeWithRetry: function(apiCall, context) {
        var attempt = 0;
        var lastError = null;
        var startTime = new GlideDateTime();
        
        while (attempt <= this.maxRetries) {
            try {
                gs.info('RetryMechanism: Attempt ' + (attempt + 1) + '/' + (this.maxRetries + 1) + 
                       (context ? ' for ' + JSON.stringify(context) : ''));
                
                var response = apiCall();
                
                // Check if response indicates success
                if (this._isSuccessfulResponse(response)) {
                    var endTime = new GlideDateTime();
                    var duration = GlideDateTime.subtract(startTime, endTime).getNumericValue();
                    
                    gs.info('RetryMechanism: Success after ' + (attempt + 1) + ' attempts in ' + 
                           Math.abs(duration) + 'ms');
                    
                    return {
                        success: true,
                        data: response,
                        attempts: attempt + 1,
                        duration: Math.abs(duration)
                    };
                }
                
                // Check if response is retryable
                if (!this._isRetryableResponse(response)) {
                    gs.warn('RetryMechanism: Non-retryable response received: ' + 
                           JSON.stringify(response));
                    return {
                        success: false,
                        error: 'Non-retryable response',
                        data: response,
                        attempts: attempt + 1
                    };
                }
                
                lastError = {
                    type: 'response',
                    data: response
                };
                
            } catch (e) {
                gs.error('RetryMechanism: Exception in attempt ' + (attempt + 1) + ': ' + e.message);
                
                // Check if exception is retryable
                if (!this._isRetryableException(e)) {
                    return {
                        success: false,
                        error: 'Non-retryable exception: ' + e.message,
                        attempts: attempt + 1
                    };
                }
                
                lastError = {
                    type: 'exception',
                    message: e.message,
                    stack: e.stack
                };
            }
            
            attempt++;
            
            // If we've exhausted all retries, return the last error
            if (attempt > this.maxRetries) {
                var endTime = new GlideDateTime();
                var duration = GlideDateTime.subtract(startTime, endTime).getNumericValue();
                
                gs.error('RetryMechanism: All ' + (this.maxRetries + 1) + ' attempts failed in ' + 
                        Math.abs(duration) + 'ms');
                
                return {
                    success: false,
                    error: 'All retry attempts exhausted',
                    lastError: lastError,
                    attempts: attempt,
                    duration: Math.abs(duration)
                };
            }
            
            // Calculate delay for next attempt
            var delay = this._calculateDelay(attempt);
            gs.info('RetryMechanism: Waiting ' + delay + 'ms before next attempt');
            
            // Wait before next attempt (in a real scenario, you might use scheduled jobs)
            gs.sleep(delay);
        }
    },
    
    /**
     * Execute multiple REST calls with retry mechanism in parallel
     * @param {Array} apiCalls - Array of objects with {call: Function, context: Object}
     * @param {Object} options - Parallel execution options
     * @returns {Array} Array of results
     */
    executeMultipleWithRetry: function(apiCalls, options) {
        options = options || {};
        var maxConcurrency = options.maxConcurrency || 5;
        var results = [];
        var batches = this._createBatches(apiCalls, maxConcurrency);
        
        for (var i = 0; i < batches.length; i++) {
            var batch = batches[i];
            var batchResults = [];
            
            gs.info('RetryMechanism: Processing batch ' + (i + 1) + '/' + batches.length + 
                   ' with ' + batch.length + ' calls');
            
            for (var j = 0; j < batch.length; j++) {
                var callInfo = batch[j];
                var result = this.executeWithRetry(callInfo.call, callInfo.context);
                result.originalIndex = callInfo.originalIndex;
                batchResults.push(result);
            }
            
            results = results.concat(batchResults);
            
            // Optional delay between batches
            if (options.batchDelay && i < batches.length - 1) {
                gs.sleep(options.batchDelay);
            }
        }
        
        // Sort results back to original order
        results.sort(function(a, b) {
            return a.originalIndex - b.originalIndex;
        });
        
        return results;
    },
    
    /**
     * Create a circuit breaker pattern for API calls
     * @param {string} circuitName - Name for the circuit
     * @param {Object} circuitOptions - Circuit breaker options
     * @returns {Object} Circuit breaker instance
     */
    createCircuitBreaker: function(circuitName, circuitOptions) {
        circuitOptions = circuitOptions || {};
        
        return {
            name: circuitName,
            failureThreshold: circuitOptions.failureThreshold || 5,
            timeoutMs: circuitOptions.timeoutMs || 10000,
            resetTimeoutMs: circuitOptions.resetTimeoutMs || 60000,
            state: 'CLOSED', // CLOSED, OPEN, HALF_OPEN
            failureCount: 0,
            lastFailureTime: null,
            
            execute: function(apiCall, context) {
                if (this.state === 'OPEN') {
                    if (this._shouldAttemptReset()) {
                        this.state = 'HALF_OPEN';
                        gs.info('Circuit breaker ' + this.name + ' attempting reset');
                    } else {
                        return {
                            success: false,
                            error: 'Circuit breaker is OPEN',
                            circuitState: this.state
                        };
                    }
                }
                
                var self = this;
                var retryMechanism = new RetryMechanism({
                    maxRetries: 1, // Circuit breaker uses single attempts
                    baseDelay: 0
                });
                
                var result = retryMechanism.executeWithRetry(apiCall, context);
                
                if (result.success) {
                    this._onSuccess();
                } else {
                    this._onFailure();
                }
                
                result.circuitState = this.state;
                return result;
            },
            
            _shouldAttemptReset: function() {
                if (!this.lastFailureTime) return true;
                var now = new GlideDateTime();
                var timeSinceFailure = now.getNumericValue() - this.lastFailureTime;
                return timeSinceFailure >= this.resetTimeoutMs;
            },
            
            _onSuccess: function() {
                this.failureCount = 0;
                this.state = 'CLOSED';
                gs.info('Circuit breaker ' + this.name + ' reset to CLOSED state');
            },
            
            _onFailure: function() {
                this.failureCount++;
                this.lastFailureTime = new GlideDateTime().getNumericValue();
                
                if (this.failureCount >= this.failureThreshold) {
                    this.state = 'OPEN';
                    gs.warn('Circuit breaker ' + this.name + ' opened due to ' + 
                           this.failureCount + ' failures');
                }
            }
        };
    },
    
    /**
     * Check if response indicates success
     * @param {Object} response - REST response object
     * @returns {boolean} True if successful
     * @private
     */
    _isSuccessfulResponse: function(response) {
        if (!response) return false;
        
        // Check for different response formats
        if (response.haveError && response.haveError()) {
            return false;
        }
        
        if (response.getStatusCode) {
            var statusCode = response.getStatusCode();
            return statusCode >= 200 && statusCode < 300;
        }
        
        if (response.success !== undefined) {
            return response.success === true;
        }
        
        if (response.status) {
            return response.status >= 200 && response.status < 300;
        }
        
        // Default assumption for object responses
        return true;
    },
    
    /**
     * Check if response/status code is retryable
     * @param {Object} response - REST response object
     * @returns {boolean} True if retryable
     * @private
     */
    _isRetryableResponse: function(response) {
        var statusCode = null;
        
        if (response.getStatusCode) {
            statusCode = response.getStatusCode();
        } else if (response.status) {
            statusCode = response.status;
        }
        
        if (statusCode) {
            return this.retryableStatusCodes.indexOf(statusCode) !== -1;
        }
        
        return false;
    },
    
    /**
     * Check if exception is retryable
     * @param {Error} exception - Exception object
     * @returns {boolean} True if retryable
     * @private
     */
    _isRetryableException: function(exception) {
        var message = exception.message.toLowerCase();
        
        for (var i = 0; i < this.retryableErrors.length; i++) {
            if (message.indexOf(this.retryableErrors[i]) !== -1) {
                return true;
            }
        }
        
        return false;
    },
    
    /**
     * Calculate delay with exponential backoff and jitter
     * @param {number} attempt - Current attempt number (1-based)
     * @returns {number} Delay in milliseconds
     * @private
     */
    _calculateDelay: function(attempt) {
        var delay = Math.min(
            this.baseDelay * Math.pow(this.exponentialFactor, attempt - 1),
            this.maxDelay
        );
        
        // Add jitter to prevent thundering herd
        if (this.jitterEnabled) {
            delay = delay * (0.5 + Math.random() * 0.5);
        }
        
        return Math.floor(delay);
    },
    
    /**
     * Create batches for parallel processing
     * @param {Array} items - Items to batch
     * @param {number} batchSize - Size of each batch
     * @returns {Array} Array of batches
     * @private
     */
    _createBatches: function(items, batchSize) {
        var batches = [];
        
        for (var i = 0; i < items.length; i += batchSize) {
            var batch = [];
            for (var j = i; j < Math.min(i + batchSize, items.length); j++) {
                var item = items[j];
                item.originalIndex = j;
                batch.push(item);
            }
            batches.push(batch);
        }
        
        return batches;
    },
    
    type: 'RetryMechanism'
};

// Usage Examples:

/*
// Basic retry mechanism
var retry = new RetryMechanism({
    maxRetries: 3,
    baseDelay: 1000,
    exponentialFactor: 2
});

var result = retry.executeWithRetry(function() {
    var rm = new sn_ws.RESTMessageV2();
    rm.setEndpoint('https://api.example.com/data');
    rm.setHttpMethod('GET');
    return rm.execute();
}, { endpoint: 'example-api', operation: 'getData' });

if (result.success) {
    gs.info('API call succeeded: ' + JSON.stringify(result.data));
} else {
    gs.error('API call failed: ' + result.error);
}

// Circuit breaker pattern
var circuitBreaker = retry.createCircuitBreaker('external-api', {
    failureThreshold: 5,
    resetTimeoutMs: 60000
});

var circuitResult = circuitBreaker.execute(function() {
    // Your API call here
    return apiCall();
});

// Multiple parallel calls with retry
var apiCalls = [
    {
        call: function() { return callAPI1(); },
        context: { api: 'service1' }
    },
    {
        call: function() { return callAPI2(); },
        context: { api: 'service2' }
    }
];

var results = retry.executeMultipleWithRetry(apiCalls, {
    maxConcurrency: 3,
    batchDelay: 500
});
*/
