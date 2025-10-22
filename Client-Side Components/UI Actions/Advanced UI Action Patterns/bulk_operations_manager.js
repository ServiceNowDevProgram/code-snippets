/**
 * Bulk Operations Manager
 * 
 * Advanced UI Action pattern for handling bulk operations on large datasets
 * with progress tracking, transaction management, and performance optimization.
 * 
 * Features:
 * - Efficient batch processing
 * - Progress tracking and user feedback
 * - Transaction management and rollback
 * - Memory-optimized record handling
 * - Error handling and recovery
 * 
 * @author ServiceNow Developer Community
 * @version 1.0.0
 * @requires ServiceNow Madrid+
 */

// Client Script for Bulk Operations UI Action
function executeBulkOperation() {
    'use strict';
    
    /**
     * Bulk Operations Manager
     */
    const BulkOperationsManager = {
        
        // Configuration
        config: {
            batchSize: 100,
            maxConcurrentBatches: 3,
            progressUpdateInterval: 1000,
            timeoutDuration: 300000 // 5 minutes
        },
        
        // Operation state
        state: {
            totalRecords: 0,
            processedRecords: 0,
            failedRecords: 0,
            currentBatch: 0,
            isRunning: false,
            startTime: null,
            operations: []
        },
        
        /**
         * Initialize bulk operation
         */
        initialize: function() {
            try {
                this.showOperationDialog();
                this.setupProgressTracking();
                return true;
            } catch (error) {
                this.handleError('Initialization failed', error);
                return false;
            }
        },
        
        /**
         * Show operation selection dialog
         */
        showOperationDialog: function() {
            const dialog = new GlideDialogWindow('bulk_operation_dialog');
            dialog.setTitle('Bulk Operation Manager');
            dialog.setPreference('sysparm_operation_types', this.getAvailableOperations());
            dialog.setPreference('sysparm_record_count', this.getSelectedRecordCount());
            dialog.render();
        },
        
        /**
         * Get available operations based on table and user permissions
         */
        getAvailableOperations: function() {
            const tableName = g_form.getTableName();
            const operations = [];
            
            // Standard operations
            if (g_user.hasRole('admin') || g_user.hasRole(tableName + '_admin')) {
                operations.push({
                    id: 'bulk_update',
                    name: 'Bulk Update Fields',
                    description: 'Update multiple fields across selected records'
                });
                
                operations.push({
                    id: 'bulk_assign',
                    name: 'Bulk Assignment',
                    description: 'Assign multiple records to users or groups'
                });
                
                operations.push({
                    id: 'bulk_state_change',
                    name: 'Bulk State Change',
                    description: 'Change state of multiple records'
                });
            }
            
            // Table-specific operations
            if (tableName === 'incident') {
                operations.push({
                    id: 'bulk_resolve',
                    name: 'Bulk Resolve',
                    description: 'Resolve multiple incidents with standard resolution'
                });
            }
            
            return operations;
        },
        
        /**
         * Get count of selected records
         */
        getSelectedRecordCount: function() {
            // This would typically come from a list view selection
            // For demo purposes, using a mock count
            return 150;
        },
        
        /**
         * Setup progress tracking interface
         */
        setupProgressTracking: function() {
            // Create progress container
            const progressContainer = document.createElement('div');
            progressContainer.id = 'bulk_operation_progress';
            progressContainer.innerHTML = `
                <div class="progress-header">
                    <h3>Bulk Operation Progress</h3>
                    <button onclick="BulkOperationsManager.cancelOperation()">Cancel</button>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar" id="progress-bar"></div>
                    <div class="progress-text" id="progress-text">0%</div>
                </div>
                <div class="operation-stats">
                    <span id="processed-count">0</span> processed, 
                    <span id="failed-count">0</span> failed, 
                    <span id="remaining-count">0</span> remaining
                </div>
                <div class="operation-log" id="operation-log"></div>
            `;
            
            // Add to page (would typically be in a modal or dedicated area)
            document.body.appendChild(progressContainer);
        },
        
        /**
         * Start bulk operation
         */
        startOperation: function(operationType, targetRecords, operationParams) {
            if (this.state.isRunning) {
                this.showError('Another operation is already running');
                return false;
            }
            
            try {
                this.state.isRunning = true;
                this.state.startTime = new Date();
                this.state.totalRecords = targetRecords.length;
                this.state.processedRecords = 0;
                this.state.failedRecords = 0;
                
                this.logOperation('Starting bulk operation: ' + operationType);
                this.processBatches(operationType, targetRecords, operationParams);
                
                return true;
            } catch (error) {
                this.handleError('Failed to start operation', error);
                return false;
            }
        },
        
        /**
         * Process records in batches
         */
        processBatches: function(operationType, records, params) {
            const batches = this.createBatches(records);
            let completedBatches = 0;
            
            const processBatch = (batchIndex) => {
                if (batchIndex >= batches.length || !this.state.isRunning) {
                    this.completeOperation();
                    return;
                }
                
                const batch = batches[batchIndex];
                this.state.currentBatch = batchIndex + 1;
                
                this.logOperation(`Processing batch ${batchIndex + 1} of ${batches.length}`);
                
                // Process batch asynchronously
                this.processBatchAsync(operationType, batch, params)
                    .then((result) => {
                        this.handleBatchResult(result);
                        completedBatches++;
                        
                        // Process next batch with delay to prevent overwhelming server
                        setTimeout(() => processBatch(batchIndex + 1), 100);
                    })
                    .catch((error) => {
                        this.handleBatchError(batchIndex, error);
                        processBatch(batchIndex + 1); // Continue with next batch
                    });
            };
            
            // Start processing batches
            for (let i = 0; i < Math.min(this.config.maxConcurrentBatches, batches.length); i++) {
                processBatch(i);
            }
        },
        
        /**
         * Create batches from record array
         */
        createBatches: function(records) {
            const batches = [];
            const batchSize = this.config.batchSize;
            
            for (let i = 0; i < records.length; i += batchSize) {
                batches.push(records.slice(i, i + batchSize));
            }
            
            return batches;
        },
        
        /**
         * Process a single batch asynchronously
         */
        processBatchAsync: function(operationType, batch, params) {
            return new Promise((resolve, reject) => {
                const ga = new GlideAjax('BulkOperationProcessor');
                ga.addParam('sysparm_name', 'processBatch');
                ga.addParam('sysparm_operation_type', operationType);
                ga.addParam('sysparm_record_ids', JSON.stringify(batch.map(r => r.sys_id)));
                ga.addParam('sysparm_operation_params', JSON.stringify(params));
                
                ga.getXMLAnswer((response) => {
                    try {
                        const result = JSON.parse(response);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                });
                
                // Set timeout for batch processing
                setTimeout(() => {
                    reject(new Error('Batch processing timeout'));
                }, this.config.timeoutDuration);
            });
        },
        
        /**
         * Handle batch processing result
         */
        handleBatchResult: function(result) {
            this.state.processedRecords += result.processed || 0;
            this.state.failedRecords += result.failed || 0;
            
            this.updateProgress();
            
            if (result.errors && result.errors.length > 0) {
                result.errors.forEach(error => {
                    this.logOperation('Error: ' + error.message, 'error');
                });
            }
        },
        
        /**
         * Handle batch processing error
         */
        handleBatchError: function(batchIndex, error) {
            const batchSize = this.config.batchSize;
            this.state.failedRecords += batchSize;
            this.logOperation(`Batch ${batchIndex + 1} failed: ${error.message}`, 'error');
            this.updateProgress();
        },
        
        /**
         * Update progress display
         */
        updateProgress: function() {
            const progressPercent = Math.round((this.state.processedRecords / this.state.totalRecords) * 100);
            const progressBar = document.getElementById('progress-bar');
            const progressText = document.getElementById('progress-text');
            
            if (progressBar && progressText) {
                progressBar.style.width = progressPercent + '%';
                progressText.textContent = progressPercent + '%';
            }
            
            // Update stats
            this.updateStats();
        },
        
        /**
         * Update operation statistics
         */
        updateStats: function() {
            const processedEl = document.getElementById('processed-count');
            const failedEl = document.getElementById('failed-count');
            const remainingEl = document.getElementById('remaining-count');
            
            if (processedEl) processedEl.textContent = this.state.processedRecords;
            if (failedEl) failedEl.textContent = this.state.failedRecords;
            if (remainingEl) {
                remainingEl.textContent = this.state.totalRecords - this.state.processedRecords - this.state.failedRecords;
            }
        },
        
        /**
         * Log operation message
         */
        logOperation: function(message, type = 'info') {
            const timestamp = new Date().toLocaleTimeString();
            const logEntry = `[${timestamp}] ${message}`;
            
            const logContainer = document.getElementById('operation-log');
            if (logContainer) {
                const logLine = document.createElement('div');
                logLine.className = `log-entry log-${type}`;
                logLine.textContent = logEntry;
                logContainer.appendChild(logLine);
                logContainer.scrollTop = logContainer.scrollHeight;
            }
            
            // Also log to browser console
            console.log(logEntry);
        },
        
        /**
         * Complete operation
         */
        completeOperation: function() {
            this.state.isRunning = false;
            const endTime = new Date();
            const duration = Math.round((endTime - this.state.startTime) / 1000);
            
            this.logOperation(`Operation completed in ${duration} seconds`);
            this.logOperation(`Total: ${this.state.totalRecords}, Processed: ${this.state.processedRecords}, Failed: ${this.state.failedRecords}`);
            
            // Show completion message
            this.showCompletionDialog();
        },
        
        /**
         * Cancel operation
         */
        cancelOperation: function() {
            if (confirm('Are you sure you want to cancel the bulk operation?')) {
                this.state.isRunning = false;
                this.logOperation('Operation cancelled by user');
            }
        },
        
        /**
         * Show completion dialog
         */
        showCompletionDialog: function() {
            const message = `
                Bulk operation completed successfully!
                
                Total Records: ${this.state.totalRecords}
                Processed: ${this.state.processedRecords}
                Failed: ${this.state.failedRecords}
                
                Duration: ${Math.round((new Date() - this.state.startTime) / 1000)} seconds
            `;
            
            alert(message);
        },
        
        /**
         * Handle errors
         */
        handleError: function(message, error) {
            const errorMsg = `${message}: ${error.message || error}`;
            this.logOperation(errorMsg, 'error');
            g_form.addErrorMessage(errorMsg);
        },
        
        /**
         * Show error message
         */
        showError: function(message) {
            g_form.addErrorMessage(message);
            this.logOperation(message, 'error');
        }
    };
    
    // Initialize and start bulk operation
    if (BulkOperationsManager.initialize()) {
        // This would typically be called after user selects operation type and parameters
        // BulkOperationsManager.startOperation(operationType, targetRecords, params);
    }
    
    // Make manager globally accessible for dialog callbacks
    window.BulkOperationsManager = BulkOperationsManager;
}
