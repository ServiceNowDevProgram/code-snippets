/**
 * Error Handling & Resilience Patterns for ServiceNow Scripted REST APIs
 * 
 * Comprehensive error handling framework with circuit breaker implementation,
 * retry mechanisms, graceful degradation, and health check capabilities.
 * 
 * Features:
 * - Comprehensive error response patterns
 * - Circuit breaker implementation
 * - Retry mechanisms with exponential backoff
 * - Graceful degradation strategies
 * - Health check endpoints
 * 
 * @author ServiceNow Developer Community
 * @version 1.0.0
 * @requires ServiceNow Madrid+
 */

(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    'use strict';
    
    /**
     * Error Handling & Resilience Framework
     */
    const ResilienceFramework = {
        
        // Configuration
        config: {
            circuitBreaker: {
                enabled: true,
                failureThreshold: 5,
                recoveryTimeout: 60000, // 1 minute
                monitoringWindow: 300000 // 5 minutes
            },
            retry: {
                enabled: true,
                maxAttempts: 3,
                baseDelay: 1000,
                maxDelay: 10000,
                exponentialBase: 2,
                jitterPercent: 10
            },
            healthCheck: {
                enabled: true,
                checkInterval: 30000, // 30 seconds
                dependencies: ['database', 'external_api', 'cache']
            },
            gracefulDegradation: {
                enabled: true,
                fallbackResponses: true,
                cacheOnFailure: true
            },
            monitoring: {
                enabled: true,
                logErrors: true,
                trackMetrics: true
            }
        },
        
        // Circuit breaker states
        circuitBreakerStates: new Map(),
        
        // Health check status
        healthStatus: {
            overall: 'healthy',
            dependencies: new Map(),
            lastCheck: null
        },
        
        // Error categories and handling strategies
        errorCategories: {
            'VALIDATION_ERROR': {
                retryable: false,
                statusCode: 400,
                logLevel: 'warn',
                userMessage: 'Invalid input data provided'
            },
            'AUTHENTICATION_ERROR': {
                retryable: false,
                statusCode: 401,
                logLevel: 'warn',
                userMessage: 'Authentication required'
            },
            'AUTHORIZATION_ERROR': {
                retryable: false,
                statusCode: 403,
                logLevel: 'warn',
                userMessage: 'Access denied'
            },
            'NOT_FOUND_ERROR': {
                retryable: false,
                statusCode: 404,
                logLevel: 'info',
                userMessage: 'Resource not found'
            },
            'RATE_LIMIT_ERROR': {
                retryable: true,
                statusCode: 429,
                logLevel: 'warn',
                userMessage: 'Rate limit exceeded'
            },
            'DATABASE_ERROR': {
                retryable: true,
                statusCode: 503,
                logLevel: 'error',
                userMessage: 'Database temporarily unavailable'
            },
            'EXTERNAL_API_ERROR': {
                retryable: true,
                statusCode: 502,
                logLevel: 'error',
                userMessage: 'External service unavailable'
            },
            'TIMEOUT_ERROR': {
                retryable: true,
                statusCode: 504,
                logLevel: 'error',
                userMessage: 'Request timeout'
            },
            'INTERNAL_ERROR': {
                retryable: false,
                statusCode: 500,
                logLevel: 'error',
                userMessage: 'Internal server error'
            }
        },
        
        /**
         * Main resilience processor
         */
        process: function(request, response) {
            try {
                // Initialize request context
                const context = this.initializeContext(request, response);
                
                // Check if this is a health check request
                if (this.isHealthCheckRequest(request)) {
                    return this.handleHealthCheck(context);
                }
                
                // Execute with resilience patterns
                this.executeWithResilience(context);
                
            } catch (error) {
                this.handleUnexpectedError(response, error);
            }
        },
        
        /**
         * Initialize request context
         */
        initializeContext: function(request, response) {
            return {
                request: request,
                response: response,
                requestId: this.generateRequestId(),
                startTime: new Date(),
                operation: this.extractOperation(request),
                attempts: 0,
                errors: [],
                circuitBreakerKey: this.getCircuitBreakerKey(request)
            };
        },
        
        /**
         * Execute request with resilience patterns
         */
        executeWithResilience: function(context) {
            // Check circuit breaker
            if (!this.checkCircuitBreaker(context)) {
                return;
            }
            
            // Execute with retry logic
            this.executeWithRetry(context);
        },
        
        /**
         * Execute with retry mechanism
         */
        executeWithRetry: function(context) {
            const executeAttempt = () => {
                context.attempts++;
                
                try {
                    // Execute the actual business logic
                    const result = this.executeBusinessLogic(context);
                    
                    // Success - reset circuit breaker
                    this.recordSuccess(context);
                    
                    // Send successful response
                    this.sendSuccessResponse(context, result);
                    
                } catch (error) {
                    // Record failure
                    this.recordFailure(context, error);
                    
                    // Determine if we should retry
                    if (this.shouldRetry(context, error)) {
                        const delay = this.calculateRetryDelay(context.attempts);
                        
                        gs.info(`Retrying request ${context.requestId} in ${delay}ms (attempt ${context.attempts})`);
                        
                        // Schedule retry
                        setTimeout(() => {
                            executeAttempt();
                        }, delay);
                    } else {
                        // No more retries - handle final error
                        this.handleFinalError(context, error);
                    }
                }
            };
            
            // Start first attempt
            executeAttempt();
        },
        
        /**
         * Check circuit breaker status
         */
        checkCircuitBreaker: function(context) {
            if (!this.config.circuitBreaker.enabled) return true;
            
            const key = context.circuitBreakerKey;
            const state = this.circuitBreakerStates.get(key) || {
                state: 'closed',
                failures: 0,
                lastFailure: null,
                nextAttempt: null
            };
            
            const now = Date.now();
            
            switch (state.state) {
                case 'closed':
                    // Normal operation
                    return true;
                    
                case 'open':
                    // Circuit is open - check if we can try again
                    if (now >= state.nextAttempt) {
                        // Move to half-open state
                        state.state = 'half-open';
                        this.circuitBreakerStates.set(key, state);
                        return true;
                    } else {
                        // Still in open state
                        this.sendCircuitBreakerError(context);
                        return false;
                    }
                    
                case 'half-open':
                    // Allow one request to test if service is recovered
                    return true;
                    
                default:
                    return true;
            }
        },
        
        /**
         * Record successful operation
         */
        recordSuccess: function(context) {
            if (!this.config.circuitBreaker.enabled) return;
            
            const key = context.circuitBreakerKey;
            const state = this.circuitBreakerStates.get(key);
            
            if (state) {
                if (state.state === 'half-open') {
                    // Reset circuit breaker on successful half-open attempt
                    state.state = 'closed';
                    state.failures = 0;
                    state.lastFailure = null;
                    state.nextAttempt = null;
                    this.circuitBreakerStates.set(key, state);
                }
            }
        },
        
        /**
         * Record failed operation
         */
        recordFailure: function(context, error) {
            context.errors.push({
                attempt: context.attempts,
                error: error.message,
                timestamp: new Date(),
                category: this.categorizeError(error)
            });
            
            // Update circuit breaker
            this.updateCircuitBreaker(context, error);
            
            // Log error
            this.logError(context, error);
        },
        
        /**
         * Update circuit breaker state
         */
        updateCircuitBreaker: function(context, error) {
            if (!this.config.circuitBreaker.enabled) return;
            
            const errorCategory = this.categorizeError(error);
            
            // Only count certain types of errors towards circuit breaker
            if (!this.shouldCountForCircuitBreaker(errorCategory)) return;
            
            const key = context.circuitBreakerKey;
            const state = this.circuitBreakerStates.get(key) || {
                state: 'closed',
                failures: 0,
                lastFailure: null,
                nextAttempt: null
            };
            
            state.failures++;
            state.lastFailure = Date.now();
            
            // Check if we should open the circuit
            if (state.failures >= this.config.circuitBreaker.failureThreshold) {
                state.state = 'open';
                state.nextAttempt = Date.now() + this.config.circuitBreaker.recoveryTimeout;
                
                gs.warn(`Circuit breaker opened for ${key} after ${state.failures} failures`);
            }
            
            this.circuitBreakerStates.set(key, state);
        },
        
        /**
         * Determine if error should be retried
         */
        shouldRetry: function(context, error) {
            if (!this.config.retry.enabled) return false;
            
            // Check max attempts
            if (context.attempts >= this.config.retry.maxAttempts) return false;
            
            // Check if error type is retryable
            const errorCategory = this.categorizeError(error);
            const categoryConfig = this.errorCategories[errorCategory];
            
            return categoryConfig ? categoryConfig.retryable : false;
        },
        
        /**
         * Calculate retry delay with exponential backoff and jitter
         */
        calculateRetryDelay: function(attempt) {
            const baseDelay = this.config.retry.baseDelay;
            const exponentialDelay = baseDelay * Math.pow(this.config.retry.exponentialBase, attempt - 1);
            const cappedDelay = Math.min(exponentialDelay, this.config.retry.maxDelay);
            
            // Add jitter to avoid thundering herd
            const jitterRange = cappedDelay * (this.config.retry.jitterPercent / 100);
            const jitter = (Math.random() * 2 - 1) * jitterRange;
            
            return Math.max(100, cappedDelay + jitter); // Minimum 100ms delay
        },
        
        /**
         * Execute business logic (placeholder)
         */
        executeBusinessLogic: function(context) {
            // This would contain the actual API business logic
            // For demo purposes, we'll simulate different scenarios
            
            const operation = context.operation;
            const random = Math.random();
            
            // Simulate different failure scenarios for testing
            if (random < 0.1) {
                throw new Error('DATABASE_ERROR: Connection timeout');
            } else if (random < 0.15) {
                throw new Error('EXTERNAL_API_ERROR: Service unavailable');
            } else if (random < 0.2) {
                throw new Error('TIMEOUT_ERROR: Request timeout');
            }
            
            // Simulate successful operation
            return {
                success: true,
                operation: operation,
                requestId: context.requestId,
                timestamp: new Date().toISOString(),
                data: { message: 'Operation completed successfully' }
            };
        },
        
        /**
         * Handle final error (no more retries)
         */
        handleFinalError: function(context, error) {
            const errorCategory = this.categorizeError(error);
            
            // Try graceful degradation
            if (this.config.gracefulDegradation.enabled) {
                const fallbackResult = this.tryGracefulDegradation(context, error);
                if (fallbackResult) {
                    this.sendDegradedResponse(context, fallbackResult);
                    return;
                }
            }
            
            // Send error response
            this.sendErrorResponse(context, error, errorCategory);
        },
        
        /**
         * Try graceful degradation
         */
        tryGracefulDegradation: function(context, error) {
            const operation = context.operation;
            
            // Example degradation strategies
            switch (operation) {
                case 'get_user_profile':
                    // Return cached profile or basic info
                    return this.getCachedUserProfile(context);
                    
                case 'search_incidents':
                    // Return recent incidents from cache
                    return this.getCachedIncidents(context);
                    
                case 'get_catalog_items':
                    // Return popular items from cache
                    return this.getCachedCatalogItems(context);
                    
                default:
                    return null;
            }
        },
        
        /**
         * Handle health check requests
         */
        handleHealthCheck: function(context) {
            if (this.config.healthCheck.enabled) {
                const healthStatus = this.performHealthCheck();
                
                const statusCode = healthStatus.overall === 'healthy' ? 200 : 503;
                context.response.setStatus(statusCode);
                context.response.setBody(healthStatus);
            } else {
                context.response.setStatus(200);
                context.response.setBody({ status: 'ok', timestamp: new Date().toISOString() });
            }
        },
        
        /**
         * Perform comprehensive health check
         */
        performHealthCheck: function() {
            const now = new Date();
            const checks = {};
            let overallHealthy = true;
            
            // Check each dependency
            this.config.healthCheck.dependencies.forEach(dependency => {
                try {
                    const status = this.checkDependencyHealth(dependency);
                    checks[dependency] = status;
                    
                    if (!status.healthy) {
                        overallHealthy = false;
                    }
                } catch (error) {
                    checks[dependency] = {
                        healthy: false,
                        error: error.message,
                        timestamp: now.toISOString()
                    };
                    overallHealthy = false;
                }
            });
            
            // Update health status
            this.healthStatus = {
                overall: overallHealthy ? 'healthy' : 'unhealthy',
                dependencies: checks,
                lastCheck: now.toISOString(),
                uptime: this.getUptime(),
                version: '1.0.0'
            };
            
            return this.healthStatus;
        },
        
        /**
         * Check individual dependency health
         */
        checkDependencyHealth: function(dependency) {
            const checkStart = Date.now();
            
            try {
                switch (dependency) {
                    case 'database':
                        return this.checkDatabaseHealth(checkStart);
                    case 'external_api':
                        return this.checkExternalAPIHealth(checkStart);
                    case 'cache':
                        return this.checkCacheHealth(checkStart);
                    default:
                        return { healthy: true, message: 'Unknown dependency' };
                }
            } catch (error) {
                return {
                    healthy: false,
                    error: error.message,
                    responseTime: Date.now() - checkStart
                };
            }
        },
        
        /**
         * Check database health
         */
        checkDatabaseHealth: function(startTime) {
            try {
                // Perform a simple database query
                const gr = new GlideRecord('sys_properties');
                gr.addQuery('name', 'instance.name');
                gr.setLimit(1);
                gr.query();
                
                const responseTime = Date.now() - startTime;
                
                return {
                    healthy: true,
                    responseTime: responseTime,
                    message: 'Database connection successful'
                };
            } catch (error) {
                return {
                    healthy: false,
                    error: error.message,
                    responseTime: Date.now() - startTime
                };
            }
        },
        
        /**
         * Check external API health
         */
        checkExternalAPIHealth: function(startTime) {
            // Simplified external API check
            const responseTime = Date.now() - startTime;
            
            // In real implementation, would make actual external API call
            return {
                healthy: true,
                responseTime: responseTime,
                message: 'External API accessible'
            };
        },
        
        /**
         * Check cache health
         */
        checkCacheHealth: function(startTime) {
            const responseTime = Date.now() - startTime;
            
            // In real implementation, would test cache operations
            return {
                healthy: true,
                responseTime: responseTime,
                message: 'Cache operational'
            };
        },
        
        /**
         * Utility methods
         */
        
        categorizeError: function(error) {
            const message = error.message || error.toString();
            
            // Match error patterns to categories
            if (message.includes('VALIDATION_ERROR') || message.includes('Invalid')) {
                return 'VALIDATION_ERROR';
            } else if (message.includes('AUTH') || message.includes('Unauthorized')) {
                return 'AUTHENTICATION_ERROR';
            } else if (message.includes('FORBIDDEN') || message.includes('Access denied')) {
                return 'AUTHORIZATION_ERROR';
            } else if (message.includes('NOT_FOUND') || message.includes('not found')) {
                return 'NOT_FOUND_ERROR';
            } else if (message.includes('RATE_LIMIT') || message.includes('Too many')) {
                return 'RATE_LIMIT_ERROR';
            } else if (message.includes('DATABASE_ERROR') || message.includes('Connection')) {
                return 'DATABASE_ERROR';
            } else if (message.includes('EXTERNAL_API_ERROR') || message.includes('Service unavailable')) {
                return 'EXTERNAL_API_ERROR';
            } else if (message.includes('TIMEOUT_ERROR') || message.includes('timeout')) {
                return 'TIMEOUT_ERROR';
            } else {
                return 'INTERNAL_ERROR';
            }
        },
        
        shouldCountForCircuitBreaker: function(errorCategory) {
            // Only count service-level errors, not client errors
            const serviceErrors = ['DATABASE_ERROR', 'EXTERNAL_API_ERROR', 'TIMEOUT_ERROR', 'INTERNAL_ERROR'];
            return serviceErrors.includes(errorCategory);
        },
        
        isHealthCheckRequest: function(request) {
            return request.pathInfo.includes('/health') || request.pathInfo.includes('/status');
        },
        
        extractOperation: function(request) {
            // Extract operation from path
            const pathParts = request.pathInfo.split('/').filter(p => p.length > 0);
            return pathParts[pathParts.length - 1] || 'unknown';
        },
        
        getCircuitBreakerKey: function(request) {
            // Create a key for circuit breaker based on operation
            const operation = this.extractOperation(request);
            return `circuit_breaker_${operation}`;
        },
        
        generateRequestId: function() {
            return 'req_' + gs.generateGUID();
        },
        
        getUptime: function() {
            // Simplified uptime calculation
            const startTime = gs.getProperty('system.started', new Date().getTime());
            return Date.now() - parseInt(startTime);
        },
        
        // Response methods
        
        sendSuccessResponse: function(context, result) {
            context.response.setStatus(200);
            context.response.setHeader('X-Request-ID', context.requestId);
            context.response.setBody(result);
            
            this.logSuccess(context);
        },
        
        sendErrorResponse: function(context, error, errorCategory) {
            const categoryConfig = this.errorCategories[errorCategory] || this.errorCategories['INTERNAL_ERROR'];
            
            const errorResponse = {
                error: {
                    code: errorCategory,
                    message: categoryConfig.userMessage,
                    requestId: context.requestId,
                    timestamp: new Date().toISOString(),
                    attempts: context.attempts
                }
            };
            
            // Add retry information if applicable
            if (categoryConfig.retryable && context.attempts >= this.config.retry.maxAttempts) {
                errorResponse.error.retryAfter = this.calculateRetryDelay(1);
            }
            
            context.response.setStatus(categoryConfig.statusCode);
            context.response.setHeader('X-Request-ID', context.requestId);
            context.response.setBody(errorResponse);
        },
        
        sendCircuitBreakerError: function(context) {
            const errorResponse = {
                error: {
                    code: 'SERVICE_UNAVAILABLE',
                    message: 'Service temporarily unavailable due to circuit breaker',
                    requestId: context.requestId,
                    timestamp: new Date().toISOString()
                }
            };
            
            context.response.setStatus(503);
            context.response.setHeader('X-Request-ID', context.requestId);
            context.response.setBody(errorResponse);
        },
        
        sendDegradedResponse: function(context, fallbackResult) {
            fallbackResult.degraded = true;
            fallbackResult.requestId = context.requestId;
            
            context.response.setStatus(200);
            context.response.setHeader('X-Request-ID', context.requestId);
            context.response.setHeader('X-Service-Degraded', 'true');
            context.response.setBody(fallbackResult);
        },
        
        handleUnexpectedError: function(response, error) {
            gs.error('ResilienceFramework: Unexpected error: ' + error.message);
            
            const errorResponse = {
                error: {
                    code: 'UNEXPECTED_ERROR',
                    message: 'An unexpected error occurred',
                    timestamp: new Date().toISOString()
                }
            };
            
            response.setStatus(500);
            response.setBody(errorResponse);
        },
        
        // Logging methods
        
        logError: function(context, error) {
            if (!this.config.monitoring.logErrors) return;
            
            const logEntry = {
                requestId: context.requestId,
                operation: context.operation,
                attempt: context.attempts,
                error: error.message,
                category: this.categorizeError(error),
                timestamp: new Date().toISOString()
            };
            
            gs.error('ResilienceFramework: ' + JSON.stringify(logEntry));
        },
        
        logSuccess: function(context) {
            if (!this.config.monitoring.enabled) return;
            
            const duration = Date.now() - context.startTime.getTime();
            
            const logEntry = {
                requestId: context.requestId,
                operation: context.operation,
                attempts: context.attempts,
                duration: duration,
                timestamp: new Date().toISOString()
            };
            
            gs.info('ResilienceFramework: Success - ' + JSON.stringify(logEntry));
        },
        
        // Graceful degradation helpers (mock implementations)
        
        getCachedUserProfile: function(context) {
            return {
                success: true,
                data: { name: 'Cached User', email: 'user@example.com' },
                source: 'cache',
                timestamp: new Date().toISOString()
            };
        },
        
        getCachedIncidents: function(context) {
            return {
                success: true,
                data: [{ number: 'INC0000001', description: 'Cached incident' }],
                source: 'cache',
                timestamp: new Date().toISOString()
            };
        },
        
        getCachedCatalogItems: function(context) {
            return {
                success: true,
                data: [{ name: 'Popular Item', category: 'Hardware' }],
                source: 'cache',
                timestamp: new Date().toISOString()
            };
        }
    };
    
    // Process the request through the resilience framework
    ResilienceFramework.process(request, response);
    
})(request, response);
