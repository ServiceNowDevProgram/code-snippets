/**
 * Data Versioning and Audit Trail Business Rule
 * 
 * This business rule implements comprehensive data versioning and audit
 * trail functionality with field-level change tracking, metadata capture,
 * and compliance reporting capabilities.
 * 
 * Table: Any table requiring audit trail (configure in audit_config)
 * When: after insert, after update, after delete
 * Order: 1000 (run late to capture all changes)
 * 
 * @author: ServiceNow Community
 * @version: 1.0
 * @category: Data Integrity/Audit
 */

(function executeRule(current, previous) {
    
    // Initialize the data versioning manager
    var versionManager = new DataVersioningManager(current, previous);
    
    // Configure versioning based on table and compliance requirements
    versionManager.configureVersioning();
    
    // Process data versioning and audit trail
    versionManager.processVersioning();
    
})(current, previous);

/**
 * Data Versioning and Audit Trail Manager
 */
var DataVersioningManager = Class.create();
DataVersioningManager.prototype = {
    
    initialize: function(current, previous) {
        this.current = current;
        this.previous = previous;
        this.tableName = current.getTableName();
        this.versioningConfig = {};
        this.auditMetadata = {};
        
        this.context = {
            operation: this._getOperation(),
            user: gs.getUserID(),
            userAgent: gs.getSession().getClientData('user-agent') || '',
            ipAddress: gs.getSession().getClientIP(),
            timestamp: new GlideDateTime(),
            sessionId: gs.getSessionID(),
            transactionId: this._generateTransactionId()
        };
    },
    
    /**
     * Configure versioning rules based on table and compliance requirements
     */
    configureVersioning: function() {
        
        // Load table-specific versioning configuration
        this._loadTableVersioningConfig();
        
        // Load compliance-specific requirements
        this._loadComplianceRequirements();
        
        // Configure field-level tracking
        this._configureFieldTracking();
    },
    
    /**
     * Process data versioning and audit trail creation
     */
    processVersioning: function() {
        try {
            var config = this.versioningConfig;
            
            if (!config.enabled) {
                return;
            }
            
            switch (this.context.operation) {
                case 'insert':
                    this._processInsertVersioning();
                    break;
                case 'update':
                    this._processUpdateVersioning();
                    break;
                case 'delete':
                    this._processDeleteVersioning();
                    break;
            }
            
            // Create audit trail entry
            this._createAuditTrailEntry();
            
            // Process compliance reporting
            this._processComplianceReporting();
            
        } catch (e) {
            gs.error('DataVersioningManager: Error processing versioning: ' + e.message);
        }
    },
    
    /**
     * Load table-specific versioning configuration
     * @private
     */
    _loadTableVersioningConfig: function() {
        
        // Default configuration
        this.versioningConfig = {
            enabled: true,
            maxVersions: 100,
            retentionDays: 2555, // 7 years
            trackAllFields: false,
            compressVersions: true,
            encryptSensitive: true,
            auditLevel: 'standard' // minimal, standard, comprehensive
        };
        
        // Table-specific configurations
        switch (this.tableName) {
            case 'incident':
                this._configureIncidentVersioning();
                break;
            case 'change_request':
                this._configureChangeVersioning();
                break;
            case 'sys_user':
                this._configureUserVersioning();
                break;
            case 'cmdb_ci':
                this._configureCIVersioning();
                break;
            case 'contract':
                this._configureContractVersioning();
                break;
            default:
                this._configureDefaultVersioning();
                break;
        }
        
        // Load custom configuration from system properties or custom table
        this._loadCustomVersioningConfig();
    },
    
    /**
     * Configure incident versioning
     * @private
     */
    _configureIncidentVersioning: function() {
        this.versioningConfig.auditLevel = 'comprehensive';
        this.versioningConfig.trackedFields = [
            'state', 'priority', 'impact', 'urgency', 'assignment_group', 
            'assigned_to', 'resolution_code', 'close_notes', 'work_notes'
        ];
        this.versioningConfig.sensitiveFields = ['caller_id', 'work_notes', 'close_notes'];
        this.versioningConfig.businessContextFields = ['category', 'subcategory', 'u_service'];
    },
    
    /**
     * Configure change request versioning
     * @private
     */
    _configureChangeVersioning: function() {
        this.versioningConfig.auditLevel = 'comprehensive';
        this.versioningConfig.trackedFields = [
            'state', 'type', 'risk', 'impact', 'implementation_plan',
            'test_plan', 'backout_plan', 'start_date', 'end_date'
        ];
        this.versioningConfig.requireApprovalAudit = true;
        this.versioningConfig.businessContextFields = ['cmdb_ci', 'business_service'];
    },
    
    /**
     * Configure user versioning
     * @private
     */
    _configureUserVersioning: function() {
        this.versioningConfig.auditLevel = 'comprehensive';
        this.versioningConfig.trackedFields = [
            'active', 'locked_out', 'failed_attempts', 'roles', 'groups',
            'department', 'location', 'manager', 'title'
        ];
        this.versioningConfig.sensitiveFields = [
            'user_password', 'internal_integration_user', 'password_needs_reset'
        ];
        this.versioningConfig.encryptSensitive = true;
        this.versioningConfig.retentionDays = 3650; // 10 years for user data
    },
    
    /**
     * Process insert operation versioning
     * @private
     */
    _processInsertVersioning: function() {
        var versionData = {
            operation: 'INSERT',
            recordId: this.current.getValue('sys_id'),
            versionNumber: 1,
            recordData: this._captureRecordData(this.current),
            metadata: this._captureMetadata(),
            checksum: this._calculateChecksum(this.current)
        };
        
        this._storeVersion(versionData);
        
        // Initialize version tracking on the main record
        if (this.current.isValidField('u_version_number')) {
            this.current.setValue('u_version_number', '1');
        }
    },
    
    /**
     * Process update operation versioning
     * @private
     */
    _processUpdateVersioning: function() {
        if (!this.previous) {
            return;
        }
        
        var changes = this._analyzeFieldChanges();
        
        if (changes.length === 0) {
            return; // No tracked changes
        }
        
        var previousVersionNumber = this._getCurrentVersionNumber();
        var newVersionNumber = previousVersionNumber + 1;
        
        var versionData = {
            operation: 'UPDATE',
            recordId: this.current.getValue('sys_id'),
            versionNumber: newVersionNumber,
            previousVersion: previousVersionNumber,
            recordData: this._captureRecordData(this.current),
            changes: changes,
            metadata: this._captureMetadata(),
            checksum: this._calculateChecksum(this.current)
        };
        
        this._storeVersion(versionData);
        
        // Update version number on main record
        if (this.current.isValidField('u_version_number')) {
            this.current.setValue('u_version_number', newVersionNumber.toString());
        }
    },
    
    /**
     * Process delete operation versioning
     * @private
     */
    _processDeleteVersioning: function() {
        var versionData = {
            operation: 'DELETE',
            recordId: this.current.getValue('sys_id'),
            versionNumber: this._getCurrentVersionNumber() + 1,
            recordData: this._captureRecordData(this.current),
            metadata: this._captureMetadata(),
            checksum: this._calculateChecksum(this.current),
            deletedAt: this.context.timestamp
        };
        
        this._storeVersion(versionData);
    },
    
    /**
     * Analyze field changes between previous and current
     * @returns {Array} Array of field changes
     * @private
     */
    _analyzeFieldChanges: function() {
        var changes = [];
        var config = this.versioningConfig;
        var trackedFields = config.trackAllFields ? 
            this._getAllTableFields() : (config.trackedFields || []);
        
        for (var i = 0; i < trackedFields.length; i++) {
            var fieldName = trackedFields[i];
            
            if (!this.current.isValidField(fieldName)) {
                continue;
            }
            
            var currentValue = this.current.getValue(fieldName);
            var previousValue = this.previous.getValue(fieldName);
            
            if (currentValue !== previousValue) {
                var change = {
                    field: fieldName,
                    fieldLabel: this._getFieldLabel(fieldName),
                    oldValue: previousValue,
                    newValue: currentValue,
                    oldDisplayValue: this.previous.getDisplayValue(fieldName),
                    newDisplayValue: this.current.getDisplayValue(fieldName),
                    dataType: this._getFieldDataType(fieldName),
                    timestamp: this.context.timestamp,
                    changeReason: this._determineChangeReason(fieldName, previousValue, currentValue)
                };
                
                // Encrypt sensitive field values
                if (config.sensitiveFields && config.sensitiveFields.indexOf(fieldName) !== -1) {
                    change.encrypted = true;
                    change.oldValue = this._encryptValue(change.oldValue);
                    change.newValue = this._encryptValue(change.newValue);
                }
                
                changes.push(change);
            }
        }
        
        return changes;
    },
    
    /**
     * Capture comprehensive record data
     * @param {GlideRecord} record - Record to capture
     * @returns {Object} Record data
     * @private
     */
    _captureRecordData: function(record) {
        var recordData = {
            fields: {},
            references: {},
            metadata: {
                table: record.getTableName(),
                displayValue: record.getDisplayValue(),
                createdBy: record.getValue('sys_created_by'),
                createdOn: record.getValue('sys_created_on'),
                updatedBy: record.getValue('sys_updated_by'),
                updatedOn: record.getValue('sys_updated_on')
            }
        };
        
        var config = this.versioningConfig;
        var fieldsToCapture = config.trackAllFields ? 
            this._getAllTableFields() : (config.trackedFields || []);
        
        for (var i = 0; i < fieldsToCapture.length; i++) {
            var fieldName = fieldsToCapture[i];
            
            if (record.isValidField(fieldName)) {
                var fieldValue = record.getValue(fieldName);
                var displayValue = record.getDisplayValue(fieldName);
                
                // Encrypt sensitive fields
                if (config.sensitiveFields && config.sensitiveFields.indexOf(fieldName) !== -1) {
                    fieldValue = this._encryptValue(fieldValue);
                    displayValue = '[ENCRYPTED]';
                }
                
                recordData.fields[fieldName] = {
                    value: fieldValue,
                    displayValue: displayValue,
                    dataType: this._getFieldDataType(fieldName)
                };
                
                // Capture reference field details
                if (this._isReferenceField(fieldName)) {
                    recordData.references[fieldName] = this._captureReferenceDetails(record, fieldName);
                }
            }
        }
        
        return recordData;
    },
    
    /**
     * Capture audit metadata
     * @returns {Object} Audit metadata
     * @private
     */
    _captureMetadata: function() {
        return {
            user: {
                id: this.context.user,
                name: gs.getUserDisplayName(),
                roles: this._getUserRoles(),
                impersonating: gs.isImpersonating()
            },
            session: {
                id: this.context.sessionId,
                ipAddress: this.context.ipAddress,
                userAgent: this.context.userAgent
            },
            system: {
                instance: gs.getProperty('instance_name'),
                node: gs.getNodeName(),
                version: gs.getProperty('glide.war.version')
            },
            business: this._captureBusinessContext(),
            compliance: this._captureComplianceContext()
        };
    },
    
    /**
     * Store version data
     * @param {Object} versionData - Version data to store
     * @private
     */
    _storeVersion: function(versionData) {
        try {
            var versionGr = new GlideRecord('u_data_version');
            versionGr.initialize();
            
            versionGr.setValue('u_source_table', this.tableName);
            versionGr.setValue('u_source_id', versionData.recordId);
            versionGr.setValue('u_version_number', versionData.versionNumber);
            versionGr.setValue('u_operation', versionData.operation);
            versionGr.setValue('u_user', this.context.user);
            versionGr.setValue('u_timestamp', this.context.timestamp);
            versionGr.setValue('u_transaction_id', this.context.transactionId);
            
            // Store compressed version data
            var compressedData = this.versioningConfig.compressVersions ?
                this._compressData(versionData) : JSON.stringify(versionData);
            
            versionGr.setValue('u_version_data', compressedData);
            versionGr.setValue('u_compressed', this.versioningConfig.compressVersions);
            versionGr.setValue('u_checksum', versionData.checksum);
            
            var versionId = versionGr.insert();
            
            if (versionId) {
                gs.info('DataVersioningManager: Created version ' + versionData.versionNumber + 
                       ' for ' + this.tableName + ':' + versionData.recordId);
            }
            
            // Cleanup old versions if needed
            this._cleanupOldVersions(versionData.recordId);
            
        } catch (e) {
            gs.error('DataVersioningManager: Error storing version: ' + e.message);
        }
    },
    
    /**
     * Create audit trail entry
     * @private
     */
    _createAuditTrailEntry: function() {
        try {
            var auditGr = new GlideRecord('u_audit_trail');
            auditGr.initialize();
            
            auditGr.setValue('u_table', this.tableName);
            auditGr.setValue('u_record_id', this.current.getValue('sys_id'));
            auditGr.setValue('u_operation', this.context.operation);
            auditGr.setValue('u_user', this.context.user);
            auditGr.setValue('u_timestamp', this.context.timestamp);
            auditGr.setValue('u_transaction_id', this.context.transactionId);
            auditGr.setValue('u_metadata', JSON.stringify(this.auditMetadata));
            
            if (this.context.operation === 'update') {
                var changes = this._analyzeFieldChanges();
                auditGr.setValue('u_changes_count', changes.length);
                auditGr.setValue('u_changes_summary', this._summarizeChanges(changes));
            }
            
            auditGr.insert();
            
        } catch (e) {
            gs.error('DataVersioningManager: Error creating audit trail: ' + e.message);
        }
    },
    
    /**
     * Calculate checksum for data integrity
     * @param {GlideRecord} record - Record to checksum
     * @returns {string} Checksum value
     * @private
     */
    _calculateChecksum: function(record) {
        var checksum = new GlideChecksum();
        var data = JSON.stringify(this._captureRecordData(record));
        checksum.update(data);
        return checksum.getMD5();
    },
    
    /**
     * Get current version number for record
     * @returns {number} Current version number
     * @private
     */
    _getCurrentVersionNumber: function() {
        var versionGr = new GlideRecord('u_data_version');
        versionGr.addQuery('u_source_table', this.tableName);
        versionGr.addQuery('u_source_id', this.current.getValue('sys_id'));
        versionGr.orderByDesc('u_version_number');
        versionGr.setLimit(1);
        versionGr.query();
        
        if (versionGr.next()) {
            return parseInt(versionGr.getValue('u_version_number'));
        }
        
        return 0;
    },
    
    /**
     * Encrypt sensitive value
     * @param {string} value - Value to encrypt
     * @returns {string} Encrypted value
     * @private
     */
    _encryptValue: function(value) {
        if (!value) return value;
        
        try {
            var encryption = new GlideEncrypter();
            return encryption.encrypt(value.toString());
        } catch (e) {
            gs.error('DataVersioningManager: Error encrypting value: ' + e.message);
            return '[ENCRYPTION_ERROR]';
        }
    },
    
    /**
     * Compress data for storage efficiency
     * @param {Object} data - Data to compress
     * @returns {string} Compressed data
     * @private
     */
    _compressData: function(data) {
        // Placeholder for compression implementation
        // In a real implementation, you might use GZip compression
        return JSON.stringify(data);
    },
    
    /**
     * Generate unique transaction ID
     * @returns {string} Transaction ID
     * @private
     */
    _generateTransactionId: function() {
        return gs.generateGUID();
    },
    
    /**
     * Get current operation type
     * @returns {string} Operation type
     * @private
     */
    _getOperation: function() {
        if (this.current.operation() === 'insert') {
            return 'insert';
        } else if (this.current.operation() === 'update') {
            return 'update';
        } else if (this.current.operation() === 'delete') {
            return 'delete';
        }
        return 'unknown';
    },
    
    type: 'DataVersioningManager'
};
