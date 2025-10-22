/**
 * Data Transformation Pipeline for ServiceNow Scripted REST APIs
 * 
 * Flexible data transformation framework with input/output mapping,
 * schema validation, data sanitization, and batch processing capabilities.
 * 
 * Features:
 * - Flexible input/output data mapping
 * - Schema validation and transformation
 * - Data sanitization and normalization
 * - Custom field processors
 * - Batch processing capabilities
 * 
 * @author ServiceNow Developer Community
 * @version 1.0.0
 * @requires ServiceNow Madrid+
 */

(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    'use strict';
    
    /**
     * Data Transformation Pipeline
     */
    const DataTransformationPipeline = {
        
        // Configuration
        config: {
            enableValidation: true,
            enableSanitization: true,
            enableTransformation: true,
            maxBatchSize: 1000,
            enableFieldMapping: true,
            strictMode: false,
            preserveUnknownFields: false
        },
        
        // Field mapping configurations
        fieldMappings: {
            'v1_to_internal': {
                'description': 'short_description',
                'reporter': 'caller_id',
                'category_name': 'category',
                'priority_level': 'priority',
                'created_date': 'sys_created_on',
                'updated_date': 'sys_updated_on'
            },
            'internal_to_v1': {
                'short_description': 'description',
                'caller_id': 'reporter',
                'category': 'category_name',
                'priority': 'priority_level',
                'sys_created_on': 'created_date',
                'sys_updated_on': 'updated_date'
            }
        },
        
        // Data type transformers
        typeTransformers: {
            'string': {
                sanitize: function(value) {
                    if (typeof value !== 'string') return String(value || '');
                    return value.trim().replace(/[<>\"'&]/g, '');
                },
                validate: function(value, constraints) {
                    if (constraints.maxLength && value.length > constraints.maxLength) {
                        throw new Error(`String too long: ${value.length} > ${constraints.maxLength}`);
                    }
                    if (constraints.pattern && !constraints.pattern.test(value)) {
                        throw new Error(`String does not match pattern: ${constraints.pattern}`);
                    }
                    return true;
                }
            },
            'number': {
                sanitize: function(value) {
                    const num = parseFloat(value);
                    return isNaN(num) ? 0 : num;
                },
                validate: function(value, constraints) {
                    if (constraints.min !== undefined && value < constraints.min) {
                        throw new Error(`Number too small: ${value} < ${constraints.min}`);
                    }
                    if (constraints.max !== undefined && value > constraints.max) {
                        throw new Error(`Number too large: ${value} > ${constraints.max}`);
                    }
                    return true;
                }
            },
            'datetime': {
                sanitize: function(value) {
                    if (!value) return '';
                    const date = new GlideDateTime(value);
                    return date.isValid() ? date.getValue() : '';
                },
                validate: function(value, constraints) {
                    const date = new GlideDateTime(value);
                    if (!date.isValid()) {
                        throw new Error(`Invalid datetime: ${value}`);
                    }
                    return true;
                }
            },
            'email': {
                sanitize: function(value) {
                    if (typeof value !== 'string') return '';
                    return value.trim().toLowerCase();
                },
                validate: function(value, constraints) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(value)) {
                        throw new Error(`Invalid email format: ${value}`);
                    }
                    return true;
                }
            }
        },
        
        // Schema definitions
        schemas: {
            'incident': {
                'short_description': { type: 'string', required: true, maxLength: 160 },
                'description': { type: 'string', maxLength: 4000 },
                'caller_id': { type: 'reference', table: 'sys_user', required: true },
                'category': { type: 'string', required: true },
                'priority': { type: 'number', min: 1, max: 5 },
                'state': { type: 'number', min: 1, max: 8 },
                'assigned_to': { type: 'reference', table: 'sys_user' },
                'assignment_group': { type: 'reference', table: 'sys_user_group' }
            },
            'change_request': {
                'short_description': { type: 'string', required: true, maxLength: 160 },
                'description': { type: 'string', maxLength: 4000 },
                'requested_by': { type: 'reference', table: 'sys_user', required: true },
                'category': { type: 'string', required: true },
                'priority': { type: 'number', min: 1, max: 5 },
                'risk': { type: 'number', min: 1, max: 4 },
                'impact': { type: 'number', min: 1, max: 3 },
                'start_date': { type: 'datetime' },
                'end_date': { type: 'datetime' }
            },
            'user': {
                'user_name': { type: 'string', required: true, maxLength: 40 },
                'first_name': { type: 'string', required: true, maxLength: 40 },
                'last_name': { type: 'string', required: true, maxLength: 40 },
                'email': { type: 'email', required: true },
                'phone': { type: 'string', pattern: /^\+?[\d\s\-\(\)\.]+$/ },
                'department': { type: 'reference', table: 'cmn_department' }
            }
        },
        
        /**
         * Main transformation pipeline processor
         */
        process: function(request, response) {
            try {
                const context = this.initializeContext(request, response);
                
                // Process request based on method
                if (request.method === 'GET') {
                    return this.processRead(context);
                } else if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
                    return this.processWrite(context);
                } else {
                    this.sendError(context, 405, 'METHOD_NOT_ALLOWED', 'Method not supported');
                    return;
                }
                
            } catch (error) {
                this.handleError(context || { response: response }, error);
            }
        },
        
        /**
         * Initialize transformation context
         */
        initializeContext: function(request, response) {
            return {
                request: request,
                response: response,
                tableName: this.extractTableName(request.pathInfo),
                operation: this.mapMethodToOperation(request.method),
                apiVersion: this.extractApiVersion(request),
                requestData: this.parseRequestData(request),
                transformationRules: [],
                validationErrors: [],
                transformedData: null
            };
        },
        
        /**
         * Process read operations (GET)
         */
        processRead: function(context) {
            // Get data from ServiceNow
            const rawData = this.fetchData(context);
            
            // Transform for output
            const transformedData = this.transformForOutput(context, rawData);
            
            // Send response
            this.sendSuccessResponse(context, transformedData);
        },
        
        /**
         * Process write operations (POST, PUT, PATCH)
         */
        processWrite: function(context) {
            // Validate input data
            if (!this.validateInput(context)) {
                return;
            }
            
            // Transform input data
            const transformedData = this.transformForInput(context);
            if (!transformedData) {
                return;
            }
            
            // Process batch if applicable
            if (Array.isArray(transformedData)) {
                return this.processBatch(context, transformedData);
            }
            
            // Process single record
            const result = this.processRecord(context, transformedData);
            
            // Transform output
            const outputData = this.transformForOutput(context, result);
            
            // Send response
            this.sendSuccessResponse(context, outputData);
        },
        
        /**
         * Validate input data
         */
        validateInput: function(context) {
            if (!this.config.enableValidation) return true;
            
            const schema = this.schemas[context.tableName];
            if (!schema) {
                if (this.config.strictMode) {
                    this.sendError(context, 400, 'SCHEMA_NOT_FOUND', 
                        'No schema defined for table: ' + context.tableName);
                    return false;
                }
                return true; // Allow if no schema in non-strict mode
            }
            
            try {
                if (Array.isArray(context.requestData)) {
                    // Validate each item in batch
                    for (let i = 0; i < context.requestData.length; i++) {
                        this.validateRecord(context.requestData[i], schema, `[${i}]`);
                    }
                } else {
                    // Validate single record
                    this.validateRecord(context.requestData, schema);
                }
                
                // Check for validation errors
                if (context.validationErrors.length > 0) {
                    this.sendValidationError(context);
                    return false;
                }
                
                return true;
                
            } catch (error) {
                this.sendError(context, 400, 'VALIDATION_ERROR', 
                    'Validation failed: ' + error.message);
                return false;
            }
        },
        
        /**
         * Validate individual record
         */
        validateRecord: function(record, schema, prefix) {
            prefix = prefix || '';
            
            // Check required fields
            Object.keys(schema).forEach(fieldName => {
                const fieldSchema = schema[fieldName];
                const value = record[fieldName];
                
                // Required field check
                if (fieldSchema.required && (value === undefined || value === null || value === '')) {
                    this.addValidationError(prefix + fieldName, 'Field is required');
                    return;
                }
                
                // Skip validation if field is not present and not required
                if (value === undefined || value === null) return;
                
                // Type-specific validation
                try {
                    const transformer = this.typeTransformers[fieldSchema.type];
                    if (transformer && transformer.validate) {
                        transformer.validate(value, fieldSchema);
                    }
                } catch (error) {
                    this.addValidationError(prefix + fieldName, error.message);
                }
            });
            
            // Check for unknown fields in strict mode
            if (this.config.strictMode && !this.config.preserveUnknownFields) {
                Object.keys(record).forEach(fieldName => {
                    if (!schema[fieldName] && !fieldName.startsWith('_')) {
                        this.addValidationError(prefix + fieldName, 'Unknown field');
                    }
                });
            }
        },
        
        /**
         * Add validation error
         */
        addValidationError: function(field, message) {
            this.validationErrors = this.validationErrors || [];
            this.validationErrors.push({
                field: field,
                message: message
            });
        },
        
        /**
         * Transform data for input (API to ServiceNow)
         */
        transformForInput: function(context) {
            try {
                if (Array.isArray(context.requestData)) {
                    return context.requestData.map(item => this.transformRecord(item, context, 'input'));
                } else {
                    return this.transformRecord(context.requestData, context, 'input');
                }
            } catch (error) {
                this.sendError(context, 400, 'TRANSFORMATION_ERROR', 
                    'Input transformation failed: ' + error.message);
                return null;
            }
        },
        
        /**
         * Transform data for output (ServiceNow to API)
         */
        transformForOutput: function(context, data) {
            try {
                if (Array.isArray(data)) {
                    return data.map(item => this.transformRecord(item, context, 'output'));
                } else {
                    return this.transformRecord(data, context, 'output');
                }
            } catch (error) {
                gs.error('DataTransformationPipeline: Output transformation error: ' + error.message);
                return data; // Return original data if transformation fails
            }
        },
        
        /**
         * Transform individual record
         */
        transformRecord: function(record, context, direction) {
            if (!record || typeof record !== 'object') return record;
            
            let transformed = {};
            
            // Apply field mappings
            if (this.config.enableFieldMapping) {
                transformed = this.applyFieldMapping(record, context, direction);
            } else {
                transformed = Object.assign({}, record);
            }
            
            // Apply sanitization
            if (this.config.enableSanitization) {
                transformed = this.sanitizeRecord(transformed, context);
            }
            
            // Apply custom transformations
            transformed = this.applyCustomTransformations(transformed, context, direction);
            
            return transformed;
        },
        
        /**
         * Apply field mapping
         */
        applyFieldMapping: function(record, context, direction) {
            const mappingKey = direction === 'input' ? 
                context.apiVersion + '_to_internal' : 
                'internal_to_' + context.apiVersion;
            
            const mapping = this.fieldMappings[mappingKey];
            if (!mapping) return record;
            
            const transformed = {};
            
            // Apply mappings
            Object.keys(record).forEach(sourceField => {
                const targetField = mapping[sourceField] || sourceField;
                transformed[targetField] = record[sourceField];
            });
            
            // Preserve unmapped fields if configured
            if (this.config.preserveUnknownFields) {
                Object.keys(record).forEach(field => {
                    if (!mapping[field] && !transformed[field]) {
                        transformed[field] = record[field];
                    }
                });
            }
            
            return transformed;
        },
        
        /**
         * Sanitize record data
         */
        sanitizeRecord: function(record, context) {
            const schema = this.schemas[context.tableName];
            if (!schema) return record;
            
            const sanitized = {};
            
            Object.keys(record).forEach(fieldName => {
                const value = record[fieldName];
                const fieldSchema = schema[fieldName];
                
                if (fieldSchema && this.typeTransformers[fieldSchema.type]) {
                    const transformer = this.typeTransformers[fieldSchema.type];
                    sanitized[fieldName] = transformer.sanitize ? 
                        transformer.sanitize(value) : value;
                } else {
                    sanitized[fieldName] = value;
                }
            });
            
            return sanitized;
        },
        
        /**
         * Apply custom transformations
         */
        applyCustomTransformations: function(record, context, direction) {
            // Example custom transformations
            
            // Add audit fields for input
            if (direction === 'input') {
                if (context.operation === 'create') {
                    record.sys_created_by = gs.getUserID();
                    record.sys_created_on = new GlideDateTime().getValue();
                }
                record.sys_updated_by = gs.getUserID();
                record.sys_updated_on = new GlideDateTime().getValue();
            }
            
            // Format display values for output
            if (direction === 'output') {
                // Convert reference fields to display values
                this.addDisplayValues(record, context);
                
                // Format dates
                this.formatDates(record);
                
                // Add computed fields
                this.addComputedFields(record, context);
            }
            
            return record;
        },
        
        /**
         * Add display values for reference fields
         */
        addDisplayValues: function(record, context) {
            const schema = this.schemas[context.tableName];
            if (!schema) return;
            
            Object.keys(schema).forEach(fieldName => {
                const fieldSchema = schema[fieldName];
                if (fieldSchema.type === 'reference' && record[fieldName]) {
                    // Add display value
                    const displayValue = this.getDisplayValue(fieldSchema.table, record[fieldName]);
                    if (displayValue) {
                        record[fieldName + '_display'] = displayValue;
                    }
                }
            });
        },
        
        /**
         * Get display value for reference field
         */
        getDisplayValue: function(tableName, sysId) {
            try {
                const gr = new GlideRecord(tableName);
                if (gr.get(sysId)) {
                    return gr.getDisplayValue();
                }
            } catch (error) {
                gs.debug('DataTransformationPipeline: Error getting display value: ' + error.message);
            }
            return null;
        },
        
        /**
         * Format date fields
         */
        formatDates: function(record) {
            Object.keys(record).forEach(fieldName => {
                const value = record[fieldName];
                if (typeof value === 'string' && this.isDateField(fieldName)) {
                    const date = new GlideDateTime(value);
                    if (date.isValid()) {
                        record[fieldName + '_formatted'] = date.getDisplayValue();
                    }
                }
            });
        },
        
        /**
         * Check if field is a date field
         */
        isDateField: function(fieldName) {
            const dateFields = ['sys_created_on', 'sys_updated_on', 'start_date', 'end_date', 'due_date'];
            return dateFields.includes(fieldName) || fieldName.includes('date') || fieldName.includes('time');
        },
        
        /**
         * Add computed fields
         */
        addComputedFields: function(record, context) {
            // Example computed fields
            if (context.tableName === 'incident') {
                // Add age in days
                if (record.sys_created_on) {
                    const created = new GlideDateTime(record.sys_created_on);
                    const now = new GlideDateTime();
                    const diffInDays = gs.dateDiff(created.getValue(), now.getValue(), true) / (1000 * 60 * 60 * 24);
                    record.age_days = Math.floor(diffInDays);
                }
                
                // Add urgency indicator
                if (record.priority && record.impact) {
                    record.urgency_indicator = this.calculateUrgency(record.priority, record.impact);
                }
            }
        },
        
        /**
         * Process batch operations
         */
        processBatch: function(context, batchData) {
            if (batchData.length > this.config.maxBatchSize) {
                this.sendError(context, 400, 'BATCH_TOO_LARGE', 
                    `Batch size ${batchData.length} exceeds maximum ${this.config.maxBatchSize}`);
                return;
            }
            
            const results = [];
            const errors = [];
            
            batchData.forEach((record, index) => {
                try {
                    const result = this.processRecord(context, record);
                    results.push(result);
                } catch (error) {
                    errors.push({
                        index: index,
                        error: error.message,
                        record: record
                    });
                }
            });
            
            const response = {
                success: true,
                processed: results.length,
                errors: errors.length,
                results: results
            };
            
            if (errors.length > 0) {
                response.errors_detail = errors;
            }
            
            this.sendSuccessResponse(context, response);
        },
        
        /**
         * Process individual record
         */
        processRecord: function(context, record) {
            // This would interact with ServiceNow tables
            // For demo purposes, returning mock result
            return {
                sys_id: gs.generateGUID(),
                operation: context.operation,
                table: context.tableName,
                ...record,
                sys_updated_on: new GlideDateTime().getValue()
            };
        },
        
        /**
         * Utility methods
         */
        
        extractTableName: function(pathInfo) {
            const parts = pathInfo.split('/').filter(p => p.length > 0);
            return parts[parts.length - 1] || 'unknown';
        },
        
        mapMethodToOperation: function(method) {
            const mapping = {
                'POST': 'create',
                'PUT': 'update',
                'PATCH': 'update',
                'GET': 'read',
                'DELETE': 'delete'
            };
            return mapping[method.toUpperCase()] || 'unknown';
        },
        
        extractApiVersion: function(request) {
            // Extract from path or default to v1
            const pathParts = request.pathInfo.split('/');
            for (let part of pathParts) {
                if (part.match(/^v\d+$/)) {
                    return part;
                }
            }
            return 'v1';
        },
        
        parseRequestData: function(request) {
            if (!request.body || !request.body.dataString) {
                return {};
            }
            
            try {
                return JSON.parse(request.body.dataString);
            } catch (error) {
                throw new Error('Invalid JSON in request body');
            }
        },
        
        fetchData: function(context) {
            // Mock data fetching - would query actual ServiceNow tables
            return {
                sys_id: gs.generateGUID(),
                short_description: 'Sample incident',
                state: '1',
                priority: '3',
                sys_created_on: new GlideDateTime().getValue()
            };
        },
        
        calculateUrgency: function(priority, impact) {
            // Simple urgency calculation
            const p = parseInt(priority) || 3;
            const i = parseInt(impact) || 3;
            return (p + i) <= 4 ? 'high' : 'normal';
        },
        
        sendSuccessResponse: function(context, data) {
            context.response.setStatus(200);
            context.response.setBody(data);
        },
        
        sendError: function(context, statusCode, errorCode, message) {
            const errorResponse = {
                error: {
                    code: errorCode,
                    message: message,
                    timestamp: new Date().toISOString()
                }
            };
            
            context.response.setStatus(statusCode);
            context.response.setBody(errorResponse);
        },
        
        sendValidationError: function(context) {
            const errorResponse = {
                error: {
                    code: 'VALIDATION_FAILED',
                    message: 'Input validation failed',
                    validation_errors: context.validationErrors,
                    timestamp: new Date().toISOString()
                }
            };
            
            context.response.setStatus(400);
            context.response.setBody(errorResponse);
        },
        
        handleError: function(context, error) {
            gs.error('DataTransformationPipeline: ' + error.message);
            this.sendError(context, 500, 'INTERNAL_ERROR', 'Internal processing error');
        }
    };
    
    // Process the request through the transformation pipeline
    DataTransformationPipeline.process(request, response);
    
})(request, response);
