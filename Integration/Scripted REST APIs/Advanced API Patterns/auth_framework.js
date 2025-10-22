/**
 * Authentication & Authorization Framework for ServiceNow Scripted REST APIs
 * 
 * Comprehensive framework implementing multiple authentication strategies,
 * role-based access control, and security audit logging.
 * 
 * Features:
 * - Multiple authentication strategies (OAuth2, JWT, API Keys)
 * - Role-based access control (RBAC)
 * - Resource-level permissions
 * - Token validation and refresh
 * - Security audit logging
 * 
 * @author ServiceNow Developer Community
 * @version 1.0.0
 * @requires ServiceNow Madrid+
 */

(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    'use strict';
    
    /**
     * Authentication & Authorization Framework
     */
    const AuthFramework = {
        
        // Configuration
        config: {
            enableJWT: true,
            enableOAuth2: true,
            enableAPIKey: true,
            jwtSecret: gs.getProperty('api.jwt.secret', 'default-secret-change-me'),
            jwtExpiration: 3600, // 1 hour
            apiKeyExpiration: 86400, // 24 hours
            maxLoginAttempts: 5,
            lockoutDuration: 1800, // 30 minutes
            enableAuditLogging: true,
            requireHTTPS: true
        },
        
        // Supported authentication methods
        authMethods: {
            'bearer': 'validateBearerToken',
            'basic': 'validateBasicAuth',
            'apikey': 'validateAPIKey',
            'oauth': 'validateOAuth2Token'
        },
        
        // Resource permissions matrix
        permissions: {
            'incidents': {
                'read': ['incident_manager', 'itil', 'admin'],
                'write': ['incident_manager', 'admin'],
                'delete': ['admin']
            },
            'changes': {
                'read': ['change_manager', 'itil', 'admin'],
                'write': ['change_manager', 'admin'],
                'delete': ['admin']
            },
            'users': {
                'read': ['user_admin', 'admin'],
                'write': ['user_admin', 'admin'],
                'delete': ['admin']
            },
            'catalog': {
                'read': ['catalog_admin', 'itil', 'admin'],
                'write': ['catalog_admin', 'admin'],
                'delete': ['admin']
            }
        },
        
        /**
         * Main authentication and authorization processor
         */
        process: function(request, response) {
            try {
                // Security checks
                if (!this.performSecurityChecks(request, response)) {
                    return false;
                }
                
                // Extract authentication info
                const authInfo = this.extractAuthInfo(request);
                if (!authInfo) {
                    this.sendAuthError(response, 'MISSING_AUTH', 'Authentication required');
                    return false;
                }
                
                // Authenticate user
                const authResult = this.authenticateUser(authInfo);
                if (!authResult.success) {
                    this.sendAuthError(response, authResult.error, authResult.message);
                    return false;
                }
                
                // Check authorization
                const authzResult = this.authorizeRequest(request, authResult.user);
                if (!authzResult.success) {
                    this.sendAuthError(response, authzResult.error, authzResult.message, 403);
                    return false;
                }
                
                // Log successful authentication
                this.logSecurityEvent('AUTH_SUCCESS', authResult.user, request);
                
                // Add user context to request
                request.user = authResult.user;
                request.permissions = authzResult.permissions;
                
                return true;
                
            } catch (error) {
                this.logSecurityEvent('AUTH_ERROR', null, request, { error: error.message });
                this.sendAuthError(response, 'INTERNAL_ERROR', 'Authentication system error');
                return false;
            }
        },
        
        /**
         * Perform initial security checks
         */
        performSecurityChecks: function(request, response) {
            // Check HTTPS requirement
            if (this.config.requireHTTPS && !this.isHTTPS(request)) {
                this.sendAuthError(response, 'HTTPS_REQUIRED', 'HTTPS connection required');
                return false;
            }
            
            // Check for suspicious patterns
            if (this.detectSuspiciousActivity(request)) {
                this.sendAuthError(response, 'SUSPICIOUS_ACTIVITY', 'Request blocked due to suspicious activity');
                return false;
            }
            
            // Rate limiting for authentication attempts
            if (!this.checkAuthRateLimit(request)) {
                this.sendAuthError(response, 'RATE_LIMITED', 'Too many authentication attempts', 429);
                return false;
            }
            
            return true;
        },
        
        /**
         * Extract authentication information from request
         */
        extractAuthInfo: function(request) {
            const authHeader = request.getHeader('Authorization');
            const apiKeyHeader = request.getHeader('X-API-Key');
            const sessionToken = request.getHeader('X-Session-Token');
            
            if (authHeader) {
                const parts = authHeader.split(' ');
                if (parts.length === 2) {
                    return {
                        method: parts[0].toLowerCase(),
                        credentials: parts[1]
                    };
                }
            }
            
            if (apiKeyHeader) {
                return {
                    method: 'apikey',
                    credentials: apiKeyHeader
                };
            }
            
            if (sessionToken) {
                return {
                    method: 'session',
                    credentials: sessionToken
                };
            }
            
            return null;
        },
        
        /**
         * Authenticate user based on method
         */
        authenticateUser: function(authInfo) {
            const methodHandler = this.authMethods[authInfo.method];
            if (!methodHandler || !this[methodHandler]) {
                return {
                    success: false,
                    error: 'UNSUPPORTED_AUTH_METHOD',
                    message: 'Unsupported authentication method: ' + authInfo.method
                };
            }
            
            try {
                return this[methodHandler](authInfo.credentials);
            } catch (error) {
                return {
                    success: false,
                    error: 'AUTH_PROCESSING_ERROR',
                    message: 'Error processing authentication: ' + error.message
                };
            }
        },
        
        /**
         * Validate Bearer Token (JWT)
         */
        validateBearerToken: function(token) {
            if (!this.config.enableJWT) {
                return {
                    success: false,
                    error: 'JWT_DISABLED',
                    message: 'JWT authentication is disabled'
                };
            }
            
            try {
                // Decode and validate JWT
                const decoded = this.decodeJWT(token);
                if (!decoded) {
                    return {
                        success: false,
                        error: 'INVALID_TOKEN',
                        message: 'Invalid or expired token'
                    };
                }
                
                // Check token expiration
                if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
                    return {
                        success: false,
                        error: 'TOKEN_EXPIRED',
                        message: 'Token has expired'
                    };
                }
                
                // Get user information
                const user = this.getUserInfo(decoded.sub || decoded.user_id);
                if (!user) {
                    return {
                        success: false,
                        error: 'USER_NOT_FOUND',
                        message: 'User not found or inactive'
                    };
                }
                
                return {
                    success: true,
                    user: user,
                    tokenData: decoded
                };
                
            } catch (error) {
                return {
                    success: false,
                    error: 'TOKEN_VALIDATION_ERROR',
                    message: 'Error validating token: ' + error.message
                };
            }
        },
        
        /**
         * Validate Basic Authentication
         */
        validateBasicAuth: function(credentials) {
            try {
                // Decode base64 credentials
                const decoded = GlideStringUtil.base64Decode(credentials);
                const parts = decoded.split(':');
                
                if (parts.length !== 2) {
                    return {
                        success: false,
                        error: 'INVALID_CREDENTIALS_FORMAT',
                        message: 'Invalid credentials format'
                    };
                }
                
                const username = parts[0];
                const password = parts[1];
                
                // Check account lockout
                if (this.isAccountLocked(username)) {
                    return {
                        success: false,
                        error: 'ACCOUNT_LOCKED',
                        message: 'Account is temporarily locked due to failed login attempts'
                    };
                }
                
                // Validate credentials
                const user = this.validateUserCredentials(username, password);
                if (!user) {
                    this.recordFailedLogin(username);
                    return {
                        success: false,
                        error: 'INVALID_CREDENTIALS',
                        message: 'Invalid username or password'
                    };
                }
                
                // Reset failed login attempts on successful login
                this.clearFailedLogins(username);
                
                return {
                    success: true,
                    user: user
                };
                
            } catch (error) {
                return {
                    success: false,
                    error: 'BASIC_AUTH_ERROR',
                    message: 'Error processing basic authentication: ' + error.message
                };
            }
        },
        
        /**
         * Validate API Key
         */
        validateAPIKey: function(apiKey) {
            if (!this.config.enableAPIKey) {
                return {
                    success: false,
                    error: 'API_KEY_DISABLED',
                    message: 'API Key authentication is disabled'
                };
            }
            
            try {
                // Look up API key in database
                const keyRecord = this.getAPIKeyRecord(apiKey);
                if (!keyRecord) {
                    return {
                        success: false,
                        error: 'INVALID_API_KEY',
                        message: 'Invalid API key'
                    };
                }
                
                // Check if key is active
                if (!keyRecord.active) {
                    return {
                        success: false,
                        error: 'API_KEY_INACTIVE',
                        message: 'API key is inactive'
                    };
                }
                
                // Check expiration
                if (keyRecord.expires_on && new GlideDateTime(keyRecord.expires_on).before(new GlideDateTime())) {
                    return {
                        success: false,
                        error: 'API_KEY_EXPIRED',
                        message: 'API key has expired'
                    };
                }
                
                // Update last used timestamp
                this.updateAPIKeyUsage(keyRecord.sys_id);
                
                // Get associated user
                const user = this.getUserInfo(keyRecord.user_id);
                if (!user) {
                    return {
                        success: false,
                        error: 'USER_NOT_FOUND',
                        message: 'Associated user not found or inactive'
                    };
                }
                
                return {
                    success: true,
                    user: user,
                    apiKeyRecord: keyRecord
                };
                
            } catch (error) {
                return {
                    success: false,
                    error: 'API_KEY_VALIDATION_ERROR',
                    message: 'Error validating API key: ' + error.message
                };
            }
        },
        
        /**
         * Validate OAuth2 Token
         */
        validateOAuth2Token: function(token) {
            if (!this.config.enableOAuth2) {
                return {
                    success: false,
                    error: 'OAUTH2_DISABLED',
                    message: 'OAuth2 authentication is disabled'
                };
            }
            
            try {
                // Validate token with OAuth2 provider
                const tokenInfo = this.validateOAuth2TokenWithProvider(token);
                if (!tokenInfo) {
                    return {
                        success: false,
                        error: 'INVALID_OAUTH_TOKEN',
                        message: 'Invalid OAuth2 token'
                    };
                }
                
                // Get user information from token
                const user = this.getUserInfo(tokenInfo.user_id);
                if (!user) {
                    return {
                        success: false,
                        error: 'USER_NOT_FOUND',
                        message: 'User not found or inactive'
                    };
                }
                
                return {
                    success: true,
                    user: user,
                    tokenInfo: tokenInfo
                };
                
            } catch (error) {
                return {
                    success: false,
                    error: 'OAUTH2_VALIDATION_ERROR',
                    message: 'Error validating OAuth2 token: ' + error.message
                };
            }
        },
        
        /**
         * Authorize request based on user permissions
         */
        authorizeRequest: function(request, user) {
            try {
                const resource = this.extractResource(request.pathInfo);
                const action = this.mapMethodToAction(request.method);
                
                // Check if resource has permission requirements
                if (!this.permissions[resource]) {
                    // No specific permissions defined - allow if authenticated
                    return {
                        success: true,
                        permissions: ['authenticated']
                    };
                }
                
                // Get required roles for the action
                const requiredRoles = this.permissions[resource][action];
                if (!requiredRoles || requiredRoles.length === 0) {
                    return {
                        success: false,
                        error: 'ACTION_NOT_ALLOWED',
                        message: `Action '${action}' not allowed on resource '${resource}'`
                    };
                }
                
                // Check if user has any of the required roles
                const userRoles = this.getUserRoles(user.sys_id);
                const hasPermission = requiredRoles.some(role => userRoles.includes(role));
                
                if (!hasPermission) {
                    return {
                        success: false,
                        error: 'INSUFFICIENT_PERMISSIONS',
                        message: `Insufficient permissions for action '${action}' on resource '${resource}'`
                    };
                }
                
                // Additional resource-level checks
                if (!this.checkResourceLevelPermissions(request, user, resource, action)) {
                    return {
                        success: false,
                        error: 'RESOURCE_ACCESS_DENIED',
                        message: 'Access denied to specific resource instance'
                    };
                }
                
                return {
                    success: true,
                    permissions: requiredRoles.filter(role => userRoles.includes(role))
                };
                
            } catch (error) {
                return {
                    success: false,
                    error: 'AUTHORIZATION_ERROR',
                    message: 'Error during authorization: ' + error.message
                };
            }
        },
        
        /**
         * Check resource-level permissions
         */
        checkResourceLevelPermissions: function(request, user, resource, action) {
            // Extract resource ID from path if present
            const pathParts = request.pathInfo.split('/');
            const resourceId = pathParts[pathParts.length - 1];
            
            // If no specific resource ID, allow (list operations)
            if (!resourceId || resourceId === resource) {
                return true;
            }
            
            // Check ACLs for specific record access
            return this.checkRecordACL(user, resource, resourceId, action);
        },
        
        /**
         * Check record-level ACL
         */
        checkRecordACL: function(user, tableName, recordId, action) {
            try {
                // Use ServiceNow's built-in security to check record access
                const gr = new GlideRecord(tableName);
                if (gr.get(recordId)) {
                    // Check if user can read the record
                    if (action === 'read') {
                        return gr.canRead();
                    } else if (action === 'write') {
                        return gr.canWrite();
                    } else if (action === 'delete') {
                        return gr.canDelete();
                    }
                }
                return false;
            } catch (error) {
                gs.error('AuthFramework: Error checking record ACL: ' + error.message);
                return false;
            }
        },
        
        /**
         * Utility methods
         */
        
        isHTTPS: function(request) {
            const proto = request.getHeader('X-Forwarded-Proto') || 
                         request.getHeader('X-Forwarded-Protocol') ||
                         'http';
            return proto.toLowerCase() === 'https';
        },
        
        detectSuspiciousActivity: function(request) {
            // Implement suspicious activity detection logic
            const userAgent = request.getHeader('User-Agent') || '';
            const suspiciousPatterns = ['bot', 'crawler', 'scan', 'hack'];
            
            return suspiciousPatterns.some(pattern => 
                userAgent.toLowerCase().includes(pattern));
        },
        
        checkAuthRateLimit: function(request) {
            // Implement rate limiting for authentication attempts
            const clientIP = this.getClientIP(request);
            const key = 'auth_rate_limit_' + clientIP;
            
            // Simple rate limiting - would be more sophisticated in production
            const attempts = parseInt(gs.getProperty(key, '0'));
            if (attempts >= this.config.maxLoginAttempts) {
                return false;
            }
            
            return true;
        },
        
        getClientIP: function(request) {
            return request.getHeader('X-Forwarded-For') || 
                   request.getHeader('X-Real-IP') || 
                   'unknown';
        },
        
        decodeJWT: function(token) {
            // Simplified JWT decoding - would use proper JWT library in production
            try {
                const parts = token.split('.');
                if (parts.length !== 3) return null;
                
                const payload = GlideStringUtil.base64Decode(parts[1]);
                return JSON.parse(payload);
            } catch (error) {
                return null;
            }
        },
        
        getUserInfo: function(userId) {
            const user = new GlideRecord('sys_user');
            if (user.get(userId) && user.active) {
                return {
                    sys_id: user.getUniqueValue(),
                    user_name: user.getValue('user_name'),
                    email: user.getValue('email'),
                    first_name: user.getValue('first_name'),
                    last_name: user.getValue('last_name'),
                    active: user.getValue('active') === 'true'
                };
            }
            return null;
        },
        
        getUserRoles: function(userId) {
            const roles = [];
            const gr = new GlideRecord('sys_user_has_role');
            gr.addQuery('user', userId);
            gr.addQuery('role.active', true);
            gr.query();
            
            while (gr.next()) {
                const role = gr.getDisplayValue('role');
                if (role) roles.push(role);
            }
            
            return roles;
        },
        
        validateUserCredentials: function(username, password) {
            // This would integrate with ServiceNow's authentication system
            // For security reasons, this is a simplified example
            const user = new GlideRecord('sys_user');
            user.addQuery('user_name', username);
            user.addQuery('active', true);
            user.query();
            
            if (user.next()) {
                // In real implementation, would validate password hash
                return this.getUserInfo(user.getUniqueValue());
            }
            
            return null;
        },
        
        extractResource: function(pathInfo) {
            const parts = pathInfo.split('/').filter(p => p.length > 0);
            // Assuming format: /api/v1/resource or /resource
            return parts[parts.length - 1] || parts[parts.length - 2] || 'unknown';
        },
        
        mapMethodToAction: function(method) {
            const mapping = {
                'GET': 'read',
                'POST': 'write',
                'PUT': 'write',
                'PATCH': 'write',
                'DELETE': 'delete'
            };
            return mapping[method.toUpperCase()] || 'read';
        },
        
        sendAuthError: function(response, errorCode, message, statusCode) {
            statusCode = statusCode || 401;
            
            const errorResponse = {
                error: {
                    code: errorCode,
                    message: message,
                    timestamp: new Date().toISOString()
                }
            };
            
            response.setStatus(statusCode);
            response.setHeader('WWW-Authenticate', 'Bearer realm="ServiceNow API"');
            response.setBody(errorResponse);
        },
        
        logSecurityEvent: function(eventType, user, request, details) {
            if (!this.config.enableAuditLogging) return;
            
            const logEntry = {
                event_type: eventType,
                timestamp: new Date().toISOString(),
                user_id: user ? user.sys_id : null,
                user_name: user ? user.user_name : null,
                client_ip: this.getClientIP(request),
                user_agent: request.getHeader('User-Agent'),
                method: request.method,
                path: request.pathInfo,
                details: details || {}
            };
            
            // Log to security audit table
            this.writeSecurityAuditLog(logEntry);
        },
        
        writeSecurityAuditLog: function(logEntry) {
            try {
                // Would write to custom security audit table
                gs.info('SecurityAudit: ' + JSON.stringify(logEntry));
            } catch (error) {
                gs.error('AuthFramework: Failed to write security audit log: ' + error.message);
            }
        }
    };
    
    // Process authentication and authorization
    return AuthFramework.process(request, response);
    
})(request, response);
