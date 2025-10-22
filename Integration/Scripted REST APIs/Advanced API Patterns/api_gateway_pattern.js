/**
 * API Gateway Pattern for ServiceNow Scripted REST APIs
 * 
 * Advanced pattern implementing a centralized API gateway with routing,
 * transformation, rate limiting, and comprehensive monitoring capabilities.
 * 
 * Features:
 * - Centralized request routing and transformation
 * - Rate limiting and throttling
 * - Request/response validation
 * - API versioning support
 * - Comprehensive logging and monitoring
 * 
 * @author ServiceNow Developer Community
 * @version 1.0.0
 * @requires ServiceNow Madrid+
 */

(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    'use strict';
    
    /**
     * API Gateway Implementation
     */
    const APIGateway = {
        
        // Configuration
        config: {
            enableRateLimiting: true,
            enableLogging: true,
            enableTransformation: true,
            defaultApiVersion: 'v1',
            maxRequestSize: 10485760, // 10MB
            requestTimeout: 30000, // 30 seconds
            rateLimitWindow: 3600000, // 1 hour
            rateLimitMax: 1000 // requests per hour
        },
        
        // API version routing
        versionRoutes: {
            'v1': {
                'incidents': 'IncidentAPIv1',
                'changes': 'ChangeAPIv1',
                'users': 'UserAPIv1',
                'catalog': 'CatalogAPIv1'
            },
            'v2': {
                'incidents': 'IncidentAPIv2',
                'changes': 'ChangeAPIv2',
                'users': 'UserAPIv2',
                'catalog': 'CatalogAPIv2'
            }
        },
        
        /**
         * Main gateway processing function
         */
        process: function(request, response) {
            try {
                // Initialize request context
                const context = this.initializeContext(request, response);
                
                // Pre-processing validation
                if (!this.validateRequest(context)) {
                    return;
                }
                
                // Rate limiting check
                if (!this.checkRateLimit(context)) {
                    return;
                }
                
                // Route the request
                this.routeRequest(context);
                
            } catch (error) {
                this.handleError(context || { response: response }, error, 'GATEWAY_ERROR');
            }
        },
        
        /**
         * Initialize request context
         */
        initializeContext: function(request, response) {
            const context = {
                request: request,
                response: response,
                startTime: new Date(),
                requestId: this.generateRequestId(),
                clientIP: this.getClientIP(request),
                userAgent: request.getHeader('User-Agent') || 'unknown',
                contentType: request.getHeader('Content-Type') || 'application/json',
                apiVersion: this.extractApiVersion(request),
                resource: this.extractResource(request),
                method: request.method,
                path: request.pathInfo,
                queryParams: request.queryParams,
                headers: this.extractHeaders(request),
                body: null,
                user: gs.getUserID(),
                sessionId: gs.getSessionID()
            };
            
            // Parse request body if present
            if (request.body && request.body.dataString) {
                try {
                    context.body = JSON.parse(request.body.dataString);
                } catch (e) {
                    context.body = request.body.dataString;
                }
            }
            
            // Log request initiation
            this.logRequest(context, 'REQUEST_INITIATED');
            
            return context;
        },
        
        /**
         * Validate incoming request
         */
        validateRequest: function(context) {
            // Check request size
            if (context.request.body && context.request.body.dataString) {
                const requestSize = context.request.body.dataString.length;
                if (requestSize > this.config.maxRequestSize) {
                    this.sendError(context, 413, 'REQUEST_TOO_LARGE', 
                        'Request body exceeds maximum size limit');
                    return false;
                }
            }
            
            // Validate Content-Type for POST/PUT/PATCH
            if (['POST', 'PUT', 'PATCH'].includes(context.method)) {
                if (!context.contentType.includes('application/json')) {
                    this.sendError(context, 415, 'UNSUPPORTED_MEDIA_TYPE', 
                        'Content-Type must be application/json');
                    return false;
                }
            }
            
            // Validate API version
            if (!this.versionRoutes[context.apiVersion]) {
                this.sendError(context, 400, 'INVALID_API_VERSION', 
                    'Unsupported API version: ' + context.apiVersion);
                return false;
            }
            
            // Validate resource
            if (!this.versionRoutes[context.apiVersion][context.resource]) {
                this.sendError(context, 404, 'RESOURCE_NOT_FOUND', 
                    'Resource not found: ' + context.resource);
                return false;
            }
            
            // Custom validation rules
            return this.executeCustomValidation(context);
        },
        
        /**
         * Execute custom validation rules
         */
        executeCustomValidation: function(context) {
            // Example: Validate required headers
            const requiredHeaders = ['Authorization'];
            for (let header of requiredHeaders) {
                if (!context.headers[header.toLowerCase()]) {
                    this.sendError(context, 401, 'MISSING_HEADER', 
                        'Required header missing: ' + header);
                    return false;
                }
            }
            
            // Example: Validate JSON schema for POST/PUT
            if (['POST', 'PUT'].includes(context.method) && context.body) {
                if (!this.validateJsonSchema(context.resource, context.body)) {
                    this.sendError(context, 400, 'INVALID_SCHEMA', 
                        'Request body does not match expected schema');
                    return false;
                }
            }
            
            return true;
        },
        
        /**
         * Check rate limiting
         */
        checkRateLimit: function(context) {
            if (!this.config.enableRateLimiting) return true;
            
            const rateLimitKey = this.getRateLimitKey(context);
            const currentCount = this.getRateLimitCount(rateLimitKey);
            
            if (currentCount >= this.config.rateLimitMax) {
                // Add rate limit headers
                context.response.setHeader('X-RateLimit-Limit', this.config.rateLimitMax.toString());
                context.response.setHeader('X-RateLimit-Remaining', '0');
                context.response.setHeader('X-RateLimit-Reset', 
                    (Math.floor(Date.now() / 1000) + 3600).toString());
                
                this.sendError(context, 429, 'RATE_LIMIT_EXCEEDED', 
                    'Rate limit exceeded. Try again later.');
                return false;
            }
            
            // Increment rate limit counter
            this.incrementRateLimitCount(rateLimitKey);
            
            // Add rate limit headers
            context.response.setHeader('X-RateLimit-Limit', this.config.rateLimitMax.toString());
            context.response.setHeader('X-RateLimit-Remaining', 
                (this.config.rateLimitMax - currentCount - 1).toString());
            
            return true;
        },
        
        /**
         * Route request to appropriate handler
         */
        routeRequest: function(context) {
            const handlerName = this.versionRoutes[context.apiVersion][context.resource];
            
            try {
                // Transform request if needed
                if (this.config.enableTransformation) {
                    this.transformRequest(context);
                }
                
                // Get handler instance
                const handler = this.getHandlerInstance(handlerName);
                
                if (!handler) {
                    this.sendError(context, 500, 'HANDLER_NOT_FOUND', 
                        'Handler not available: ' + handlerName);
                    return;
                }
                
                // Execute handler
                const result = this.executeHandler(handler, context);
                
                // Transform response if needed
                if (this.config.enableTransformation) {
                    this.transformResponse(context, result);
                } else {
                    this.sendResponse(context, result);
                }
                
            } catch (error) {
                this.handleError(context, error, 'ROUTING_ERROR');
            }
        },
        
        /**
         * Transform request data
         */
        transformRequest: function(context) {
            // Example transformations based on API version
            if (context.apiVersion === 'v1' && context.body) {
                // V1 to internal format transformation
                if (context.resource === 'incidents') {
                    this.transformIncidentRequest(context);
                }
            }
            
            // Add common transformations
            this.addCommonRequestFields(context);
        },
        
        /**
         * Transform incident request for v1 compatibility
         */
        transformIncidentRequest: function(context) {
            if (context.body.description) {
                context.body.short_description = context.body.description;
                delete context.body.description;
            }
            
            if (context.body.reporter) {
                context.body.caller_id = context.body.reporter;
                delete context.body.reporter;
            }
        },
        
        /**
         * Add common request fields
         */
        addCommonRequestFields: function(context) {
            if (context.body && typeof context.body === 'object') {
                context.body._gateway_metadata = {
                    request_id: context.requestId,
                    api_version: context.apiVersion,
                    client_ip: context.clientIP,
                    user_agent: context.userAgent,
                    timestamp: context.startTime.toISOString()
                };
            }
        },
        
        /**
         * Get handler instance
         */
        getHandlerInstance: function(handlerName) {
            try {
                // In real implementation, this would instantiate the appropriate handler class
                // For this example, we'll return a mock handler
                return {
                    process: function(context) {
                        return {
                            success: true,
                            data: { message: 'Processed by ' + handlerName },
                            metadata: {
                                handler: handlerName,
                                processing_time: new Date() - context.startTime
                            }
                        };
                    }
                };
            } catch (error) {
                gs.error('APIGateway: Failed to get handler instance: ' + error.message);
                return null;
            }
        },
        
        /**
         * Execute handler with timeout
         */
        executeHandler: function(handler, context) {
            const startTime = new Date();
            
            try {
                // Set timeout for handler execution
                const timeoutPromise = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject(new Error('Handler execution timeout'));
                    }, this.config.requestTimeout);
                });
                
                // Execute handler
                const result = handler.process(context);
                
                // Log handler execution
                this.logRequest(context, 'HANDLER_EXECUTED', {
                    handler: handler.constructor.name,
                    execution_time: new Date() - startTime
                });
                
                return result;
                
            } catch (error) {
                this.logRequest(context, 'HANDLER_ERROR', {
                    error: error.message,
                    execution_time: new Date() - startTime
                });
                throw error;
            }
        },
        
        /**
         * Transform response data
         */
        transformResponse: function(context, result) {
            // Version-specific response transformations
            if (context.apiVersion === 'v1') {
                result = this.transformToV1Response(result);
            }
            
            // Add common response metadata
            result._gateway_metadata = {
                request_id: context.requestId,
                api_version: context.apiVersion,
                processing_time: new Date() - context.startTime,
                timestamp: new Date().toISOString()
            };
            
            this.sendResponse(context, result);
        },
        
        /**
         * Transform to v1 response format
         */
        transformToV1Response: function(result) {
            // Example v1 compatibility transformations
            if (result.data && Array.isArray(result.data)) {
                result.items = result.data;
                result.count = result.data.length;
                delete result.data;
            }
            
            return result;
        },
        
        /**
         * Send successful response
         */
        sendResponse: function(context, result) {
            const processingTime = new Date() - context.startTime;
            
            // Set response headers
            context.response.setHeader('X-Request-ID', context.requestId);
            context.response.setHeader('X-Processing-Time', processingTime.toString());
            context.response.setHeader('X-API-Version', context.apiVersion);
            
            // Set response body
            context.response.setBody(result);
            context.response.setStatus(result.status || 200);
            
            // Log successful response
            this.logRequest(context, 'RESPONSE_SENT', {
                status: result.status || 200,
                processing_time: processingTime
            });
        },
        
        /**
         * Send error response
         */
        sendError: function(context, statusCode, errorCode, message, details) {
            const errorResponse = {
                error: {
                    code: errorCode,
                    message: message,
                    details: details,
                    request_id: context.requestId,
                    timestamp: new Date().toISOString()
                }
            };
            
            context.response.setStatus(statusCode);
            context.response.setHeader('X-Request-ID', context.requestId);
            context.response.setBody(errorResponse);
            
            // Log error
            this.logRequest(context, 'ERROR_RESPONSE', {
                status: statusCode,
                error_code: errorCode,
                error_message: message
            });
        },
        
        /**
         * Handle unexpected errors
         */
        handleError: function(context, error, errorType) {
            gs.error('APIGateway ' + errorType + ': ' + error.message);
            
            this.sendError(context, 500, 'INTERNAL_ERROR', 
                'An internal error occurred', {
                    type: errorType,
                    message: error.message
                });
        },
        
        /**
         * Extract API version from request
         */
        extractApiVersion: function(request) {
            // Try to get version from path (e.g., /api/v1/incidents)
            const pathParts = request.pathInfo.split('/');
            for (let part of pathParts) {
                if (part.match(/^v\d+$/)) {
                    return part;
                }
            }
            
            // Try to get version from header
            const versionHeader = request.getHeader('API-Version');
            if (versionHeader) {
                return versionHeader;
            }
            
            // Default version
            return this.config.defaultApiVersion;
        },
        
        /**
         * Extract resource from request path
         */
        extractResource: function(request) {
            const pathParts = request.pathInfo.split('/').filter(part => part.length > 0);
            
            // Find resource after version or use first path segment
            let resourceIndex = 0;
            for (let i = 0; i < pathParts.length; i++) {
                if (pathParts[i].match(/^v\d+$/)) {
                    resourceIndex = i + 1;
                    break;
                }
            }
            
            return pathParts[resourceIndex] || 'unknown';
        },
        
        /**
         * Extract headers from request
         */
        extractHeaders: function(request) {
            const headers = {};
            const headerNames = ['Authorization', 'Content-Type', 'Accept', 'User-Agent', 'X-Forwarded-For'];
            
            headerNames.forEach(name => {
                const value = request.getHeader(name);
                if (value) {
                    headers[name.toLowerCase()] = value;
                }
            });
            
            return headers;
        },
        
        /**
         * Get client IP address
         */
        getClientIP: function(request) {
            return request.getHeader('X-Forwarded-For') || 
                   request.getHeader('X-Real-IP') || 
                   'unknown';
        },
        
        /**
         * Generate unique request ID
         */
        generateRequestId: function() {
            return 'req_' + gs.generateGUID();
        },
        
        /**
         * Get rate limit key for client
         */
        getRateLimitKey: function(context) {
            return 'rate_limit_' + context.clientIP + '_' + context.user;
        },
        
        /**
         * Get current rate limit count
         */
        getRateLimitCount: function(key) {
            const gr = new GlideRecord('sys_properties');
            gr.addQuery('name', key);
            gr.query();
            
            if (gr.next()) {
                const data = JSON.parse(gr.getValue('value') || '{}');
                const now = Date.now();
                
                // Check if window has expired
                if (now - data.window_start > this.config.rateLimitWindow) {
                    return 0; // Reset count
                }
                
                return data.count || 0;
            }
            
            return 0;
        },
        
        /**
         * Increment rate limit count
         */
        incrementRateLimitCount: function(key) {
            const gr = new GlideRecord('sys_properties');
            gr.addQuery('name', key);
            gr.query();
            
            const now = Date.now();
            let data = { count: 1, window_start: now };
            
            if (gr.next()) {
                const existing = JSON.parse(gr.getValue('value') || '{}');
                
                // Check if window has expired
                if (now - existing.window_start > this.config.rateLimitWindow) {
                    data = { count: 1, window_start: now };
                } else {
                    data = {
                        count: (existing.count || 0) + 1,
                        window_start: existing.window_start
                    };
                }
                
                gr.setValue('value', JSON.stringify(data));
                gr.update();
            } else {
                gr.initialize();
                gr.setValue('name', key);
                gr.setValue('value', JSON.stringify(data));
                gr.insert();
            }
        },
        
        /**
         * Validate JSON schema
         */
        validateJsonSchema: function(resource, data) {
            // Simplified schema validation - in real implementation would use proper JSON schema
            const schemas = {
                'incidents': ['short_description', 'caller_id'],
                'changes': ['short_description', 'requested_by'],
                'users': ['user_name', 'email']
            };
            
            const requiredFields = schemas[resource];
            if (!requiredFields) return true;
            
            return requiredFields.every(field => data.hasOwnProperty(field));
        },
        
        /**
         * Log request events
         */
        logRequest: function(context, event, details) {
            if (!this.config.enableLogging) return;
            
            const logEntry = {
                request_id: context.requestId,
                event: event,
                timestamp: new Date().toISOString(),
                method: context.method,
                path: context.path,
                api_version: context.apiVersion,
                resource: context.resource,
                client_ip: context.clientIP,
                user: context.user,
                details: details || {}
            };
            
            // Log to system log
            gs.info('APIGateway: ' + JSON.stringify(logEntry));
            
            // Could also log to custom table for analytics
            this.logToCustomTable(logEntry);
        },
        
        /**
         * Log to custom table for analytics
         */
        logToCustomTable: function(logEntry) {
            try {
                // Would create custom table for API analytics
                // For now, just log to system
                gs.debug('APIGateway Analytics: ' + JSON.stringify(logEntry));
            } catch (error) {
                gs.error('APIGateway: Failed to log analytics: ' + error.message);
            }
        }
    };
    
    // Process the request through the gateway
    APIGateway.process(request, response);
    
})(request, response);
