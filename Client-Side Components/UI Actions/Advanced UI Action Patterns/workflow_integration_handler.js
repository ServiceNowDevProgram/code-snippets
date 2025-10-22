/**
 * Workflow Integration Handler
 * 
 * Advanced UI Action pattern for seamless workflow integration with context
 * preservation, parameter passing, and asynchronous monitoring capabilities.
 * 
 * Features:
 * - Seamless workflow triggering from UI actions
 * - Context preservation and parameter passing
 * - Asynchronous workflow monitoring
 * - Status feedback and error handling
 * - Dynamic workflow selection
 * 
 * @author ServiceNow Developer Community
 * @version 1.0.0
 * @requires ServiceNow Madrid+
 */

function executeWorkflowIntegration() {
    'use strict';
    
    /**
     * Workflow Integration Handler
     */
    const WorkflowIntegrationHandler = {
        
        // Configuration
        config: {
            pollInterval: 2000,
            maxPollAttempts: 150, // 5 minutes at 2-second intervals
            workflowTimeout: 300000, // 5 minutes
            preserveContext: true
        },
        
        // Workflow state tracking
        state: {
            activeWorkflows: new Map(),
            workflowHistory: [],
            currentExecution: null,
            isMonitoring: false
        },
        
        /**
         * Initialize workflow integration
         */
        initialize: function() {
            try {
                this.setupWorkflowRegistry();
                this.createWorkflowSelector();
                this.setupMonitoringInterface();
                return true;
            } catch (error) {
                this.handleError('Workflow integration initialization failed', error);
                return false;
            }
        },
        
        /**
         * Setup workflow registry
         */
        setupWorkflowRegistry: function() {
            const tableName = g_form.getTableName();
            
            this.workflowRegistry = {
                // Standard approval workflows
                'approval_workflow': {
                    name: 'Standard Approval Process',
                    description: 'Route record through standard approval chain',
                    requiredFields: ['short_description', 'requested_for'],
                    supportedTables: ['sc_req_item', 'change_request', 'incident'],
                    parameters: {
                        'approval_type': 'normal',
                        'skip_approvals': false,
                        'due_date_offset': 2
                    }
                },
                
                // Emergency change workflow
                'emergency_change': {
                    name: 'Emergency Change Process',
                    description: 'Expedited approval for emergency changes',
                    requiredFields: ['short_description', 'justification', 'risk_impact_analysis'],
                    supportedTables: ['change_request'],
                    parameters: {
                        'approval_type': 'emergency',
                        'notification_groups': ['change_advisory_board', 'it_management'],
                        'expedite': true
                    }
                },
                
                // Incident escalation workflow
                'incident_escalation': {
                    name: 'Incident Escalation Process',
                    description: 'Escalate incident through management chain',
                    requiredFields: ['short_description', 'escalation_reason'],
                    supportedTables: ['incident'],
                    parameters: {
                        'escalation_level': 1,
                        'notify_management': true,
                        'create_task': true
                    }
                },
                
                // Asset provisioning workflow
                'asset_provisioning': {
                    name: 'Asset Provisioning Workflow',
                    description: 'Automated asset provisioning and configuration',
                    requiredFields: ['requested_for', 'asset_type', 'configuration'],
                    supportedTables: ['sc_req_item'],
                    parameters: {
                        'auto_assign': true,
                        'provision_immediately': false,
                        'send_notifications': true
                    }
                }
            };
        },
        
        /**
         * Create workflow selector dialog
         */
        createWorkflowSelector: function() {
            const tableName = g_form.getTableName();
            const availableWorkflows = this.getAvailableWorkflows(tableName);
            
            if (availableWorkflows.length === 0) {
                g_form.addErrorMessage('No workflows available for this record type');
                return;
            }
            
            if (availableWorkflows.length === 1) {
                // Auto-select if only one workflow available
                this.startWorkflow(availableWorkflows[0].id);
            } else {
                // Show selection dialog
                this.showWorkflowSelectionDialog(availableWorkflows);
            }
        },
        
        /**
         * Get available workflows for table
         */
        getAvailableWorkflows: function(tableName) {
            const available = [];
            
            Object.keys(this.workflowRegistry).forEach(workflowId => {
                const workflow = this.workflowRegistry[workflowId];
                if (workflow.supportedTables.includes(tableName)) {
                    available.push({
                        id: workflowId,
                        ...workflow
                    });
                }
            });
            
            return available;
        },
        
        /**
         * Show workflow selection dialog
         */
        showWorkflowSelectionDialog: function(workflows) {
            let dialogHtml = '<div class="workflow-selection-dialog">';
            dialogHtml += '<h3>Select Workflow to Execute</h3>';
            dialogHtml += '<div class="workflow-list">';
            
            workflows.forEach(workflow => {
                dialogHtml += `
                    <div class="workflow-option" onclick="WorkflowIntegrationHandler.selectWorkflow('${workflow.id}')">
                        <div class="workflow-name">${workflow.name}</div>
                        <div class="workflow-description">${workflow.description}</div>
                        <div class="workflow-requirements">
                            Required fields: ${workflow.requiredFields.join(', ')}
                        </div>
                    </div>
                `;
            });
            
            dialogHtml += '</div>';
            dialogHtml += '<button onclick="WorkflowIntegrationHandler.cancelWorkflowSelection()">Cancel</button>';
            dialogHtml += '</div>';
            
            // Show dialog (simplified - would typically use GlideDialogWindow)
            this.showDialog('Workflow Selection', dialogHtml);
        },
        
        /**
         * Select workflow from dialog
         */
        selectWorkflow: function(workflowId) {
            this.closeDialog();
            this.startWorkflow(workflowId);
        },
        
        /**
         * Start workflow execution
         */
        startWorkflow: function(workflowId) {
            const workflow = this.workflowRegistry[workflowId];
            if (!workflow) {
                this.handleError('Unknown workflow', new Error('Workflow not found: ' + workflowId));
                return;
            }
            
            try {
                // Validate prerequisites
                if (!this.validateWorkflowPrerequisites(workflow)) {
                    return;
                }
                
                // Collect workflow parameters
                const parameters = this.collectWorkflowParameters(workflow);
                
                // Execute workflow
                this.executeWorkflow(workflowId, parameters);
                
            } catch (error) {
                this.handleError('Failed to start workflow', error);
            }
        },
        
        /**
         * Validate workflow prerequisites
         */
        validateWorkflowPrerequisites: function(workflow) {
            // Check required fields
            for (let field of workflow.requiredFields) {
                const value = g_form.getValue(field);
                if (!value || value.trim() === '') {
                    g_form.showFieldMsg(field, 'This field is required for the workflow', 'error');
                    g_form.flash(field, '#ff0000', 0);
                    return false;
                }
            }
            
            // Check record state
            if (g_form.isNewRecord()) {
                g_form.addErrorMessage('Record must be saved before starting workflow');
                return false;
            }
            
            // Check user permissions
            if (!this.hasWorkflowPermissions(workflow)) {
                g_form.addErrorMessage('You do not have permission to execute this workflow');
                return false;
            }
            
            return true;
        },
        
        /**
         * Check workflow permissions
         */
        hasWorkflowPermissions: function(workflow) {
            // Basic role check - would be more sophisticated in real implementation
            return g_user.hasRole('workflow_admin') || g_user.hasRole('admin');
        },
        
        /**
         * Collect workflow parameters
         */
        collectWorkflowParameters: function(workflow) {
            const parameters = {
                // Base parameters
                record_id: g_form.getUniqueValue(),
                table_name: g_form.getTableName(),
                initiated_by: g_user.userID,
                initiated_at: new Date().toISOString(),
                
                // Workflow-specific parameters
                ...workflow.parameters
            };
            
            // Add form context if enabled
            if (this.config.preserveContext) {
                parameters.form_context = this.captureFormContext();
            }
            
            // Add user-provided parameters
            const userParams = this.getUserParameters(workflow);
            Object.assign(parameters, userParams);
            
            return parameters;
        },
        
        /**
         * Capture current form context
         */
        captureFormContext: function() {
            const context = {
                form_values: {},
                field_states: {},
                user_info: {
                    user_id: g_user.userID,
                    user_name: g_user.userName,
                    roles: g_user.roles
                },
                timestamp: new Date().toISOString()
            };
            
            // Capture current field values
            const fields = g_form.getFieldNames();
            fields.forEach(field => {
                context.form_values[field] = g_form.getValue(field);
                context.field_states[field] = {
                    visible: g_form.isVisible(field),
                    mandatory: g_form.isMandatory(field),
                    readonly: g_form.isReadOnly(field)
                };
            });
            
            return context;
        },
        
        /**
         * Get user-provided parameters
         */
        getUserParameters: function(workflow) {
            // This would typically show a parameter collection dialog
            // For now, returning default parameters
            return {
                user_comments: g_form.getValue('work_notes') || '',
                priority_override: false,
                send_notifications: true
            };
        },
        
        /**
         * Execute workflow
         */
        executeWorkflow: function(workflowId, parameters) {
            g_form.addInfoMessage('Starting workflow execution...');
            
            // Create execution tracking
            const executionId = this.generateExecutionId();
            const execution = {
                id: executionId,
                workflow_id: workflowId,
                parameters: parameters,
                status: 'starting',
                start_time: new Date(),
                progress: 0,
                steps_completed: 0,
                total_steps: 0
            };
            
            this.state.activeWorkflows.set(executionId, execution);
            this.state.currentExecution = executionId;
            
            // Make server call to start workflow
            this.callWorkflowServer(workflowId, parameters, executionId);
            
            // Start monitoring
            this.startWorkflowMonitoring(executionId);
        },
        
        /**
         * Call server-side workflow execution
         */
        callWorkflowServer: function(workflowId, parameters, executionId) {
            const ga = new GlideAjax('WorkflowIntegrationProcessor');
            ga.addParam('sysparm_name', 'executeWorkflow');
            ga.addParam('sysparm_workflow_id', workflowId);
            ga.addParam('sysparm_parameters', JSON.stringify(parameters));
            ga.addParam('sysparm_execution_id', executionId);
            
            ga.getXMLAnswer((response) => {
                try {
                    const result = JSON.parse(response);
                    this.handleWorkflowResponse(executionId, result);
                } catch (error) {
                    this.handleWorkflowError(executionId, error);
                }
            });
        },
        
        /**
         * Handle workflow response
         */
        handleWorkflowResponse: function(executionId, result) {
            const execution = this.state.activeWorkflows.get(executionId);
            if (!execution) return;
            
            if (result.success) {
                execution.status = 'running';
                execution.workflow_context_id = result.workflow_context_id;
                execution.total_steps = result.total_steps || 0;
                
                g_form.addInfoMessage('Workflow started successfully');
                this.updateWorkflowStatus(executionId);
            } else {
                this.handleWorkflowError(executionId, new Error(result.error || 'Unknown workflow error'));
            }
        },
        
        /**
         * Handle workflow error
         */
        handleWorkflowError: function(executionId, error) {
            const execution = this.state.activeWorkflows.get(executionId);
            if (execution) {
                execution.status = 'error';
                execution.error = error.message;
                execution.end_time = new Date();
            }
            
            this.stopWorkflowMonitoring(executionId);
            g_form.addErrorMessage('Workflow execution failed: ' + error.message);
        },
        
        /**
         * Start workflow monitoring
         */
        startWorkflowMonitoring: function(executionId) {
            if (this.state.isMonitoring) return;
            
            this.state.isMonitoring = true;
            this.showMonitoringInterface();
            
            const monitor = () => {
                if (!this.state.isMonitoring) return;
                
                this.checkWorkflowStatus(executionId)
                    .then((status) => {
                        this.updateWorkflowStatus(executionId, status);
                        
                        if (status.is_complete) {
                            this.completeWorkflowMonitoring(executionId, status);
                        } else {
                            setTimeout(monitor, this.config.pollInterval);
                        }
                    })
                    .catch((error) => {
                        this.handleWorkflowError(executionId, error);
                    });
            };
            
            // Start monitoring
            setTimeout(monitor, this.config.pollInterval);
        },
        
        /**
         * Check workflow status
         */
        checkWorkflowStatus: function(executionId) {
            return new Promise((resolve, reject) => {
                const execution = this.state.activeWorkflows.get(executionId);
                if (!execution || !execution.workflow_context_id) {
                    reject(new Error('Invalid execution context'));
                    return;
                }
                
                const ga = new GlideAjax('WorkflowIntegrationProcessor');
                ga.addParam('sysparm_name', 'checkWorkflowStatus');
                ga.addParam('sysparm_workflow_context_id', execution.workflow_context_id);
                
                ga.getXMLAnswer((response) => {
                    try {
                        const status = JSON.parse(response);
                        resolve(status);
                    } catch (error) {
                        reject(error);
                    }
                });
            });
        },
        
        /**
         * Update workflow status
         */
        updateWorkflowStatus: function(executionId, status) {
            const execution = this.state.activeWorkflows.get(executionId);
            if (!execution) return;
            
            if (status) {
                execution.status = status.state || execution.status;
                execution.progress = status.progress || 0;
                execution.steps_completed = status.steps_completed || 0;
                execution.current_step = status.current_step;
                execution.last_update = new Date();
            }
            
            this.updateMonitoringDisplay(execution);
        },
        
        /**
         * Complete workflow monitoring
         */
        completeWorkflowMonitoring: function(executionId, finalStatus) {
            const execution = this.state.activeWorkflows.get(executionId);
            if (execution) {
                execution.status = finalStatus.state;
                execution.end_time = new Date();
                execution.result = finalStatus.result;
                
                // Move to history
                this.state.workflowHistory.push(execution);
                this.state.activeWorkflows.delete(executionId);
            }
            
            this.stopWorkflowMonitoring(executionId);
            
            // Show completion message
            const duration = Math.round((execution.end_time - execution.start_time) / 1000);
            g_form.addInfoMessage(`Workflow completed in ${duration} seconds`);
            
            // Refresh form if needed
            if (finalStatus.refresh_form) {
                g_form.reload();
            }
        },
        
        /**
         * Stop workflow monitoring
         */
        stopWorkflowMonitoring: function(executionId) {
            this.state.isMonitoring = false;
            this.hideMonitoringInterface();
        },
        
        /**
         * Setup monitoring interface
         */
        setupMonitoringInterface: function() {
            // Create monitoring container
            const monitoringContainer = document.createElement('div');
            monitoringContainer.id = 'workflow-monitoring';
            monitoringContainer.style.display = 'none';
            monitoringContainer.innerHTML = `
                <div class="monitoring-header">
                    <h4>Workflow Execution Status</h4>
                    <button onclick="WorkflowIntegrationHandler.cancelWorkflow()">Cancel</button>
                </div>
                <div class="monitoring-content">
                    <div class="progress-container">
                        <div class="progress-bar" id="workflow-progress-bar"></div>
                        <div class="progress-text" id="workflow-progress-text">0%</div>
                    </div>
                    <div class="status-info">
                        <div id="workflow-current-step">Initializing...</div>
                        <div id="workflow-step-counter">Step 0 of 0</div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(monitoringContainer);
        },
        
        /**
         * Show monitoring interface
         */
        showMonitoringInterface: function() {
            const container = document.getElementById('workflow-monitoring');
            if (container) {
                container.style.display = 'block';
            }
        },
        
        /**
         * Hide monitoring interface
         */
        hideMonitoringInterface: function() {
            const container = document.getElementById('workflow-monitoring');
            if (container) {
                container.style.display = 'none';
            }
        },
        
        /**
         * Update monitoring display
         */
        updateMonitoringDisplay: function(execution) {
            const progressBar = document.getElementById('workflow-progress-bar');
            const progressText = document.getElementById('workflow-progress-text');
            const currentStep = document.getElementById('workflow-current-step');
            const stepCounter = document.getElementById('workflow-step-counter');
            
            if (progressBar && progressText) {
                progressBar.style.width = execution.progress + '%';
                progressText.textContent = Math.round(execution.progress) + '%';
            }
            
            if (currentStep && execution.current_step) {
                currentStep.textContent = execution.current_step;
            }
            
            if (stepCounter) {
                stepCounter.textContent = `Step ${execution.steps_completed} of ${execution.total_steps}`;
            }
        },
        
        /**
         * Cancel workflow
         */
        cancelWorkflow: function() {
            if (confirm('Are you sure you want to cancel the workflow execution?')) {
                const executionId = this.state.currentExecution;
                if (executionId) {
                    this.stopWorkflowMonitoring(executionId);
                    // Would also call server to cancel workflow
                }
            }
        },
        
        /**
         * Generate unique execution ID
         */
        generateExecutionId: function() {
            return 'wf_exec_' + new Date().getTime() + '_' + Math.random().toString(36).substr(2, 9);
        },
        
        /**
         * Show dialog (simplified implementation)
         */
        showDialog: function(title, content) {
            // Simplified dialog - would use GlideDialogWindow in real implementation
            const dialog = document.createElement('div');
            dialog.className = 'workflow-dialog';
            dialog.innerHTML = `
                <div class="dialog-overlay">
                    <div class="dialog-content">
                        <h3>${title}</h3>
                        ${content}
                    </div>
                </div>
            `;
            document.body.appendChild(dialog);
        },
        
        /**
         * Close dialog
         */
        closeDialog: function() {
            const dialog = document.querySelector('.workflow-dialog');
            if (dialog) {
                dialog.remove();
            }
        },
        
        /**
         * Cancel workflow selection
         */
        cancelWorkflowSelection: function() {
            this.closeDialog();
        },
        
        /**
         * Handle errors
         */
        handleError: function(message, error) {
            const errorMsg = `${message}: ${error.message || error}`;
            g_form.addErrorMessage(errorMsg);
            console.error('WorkflowIntegrationHandler:', errorMsg);
        }
    };
    
    // Initialize workflow integration
    WorkflowIntegrationHandler.initialize();
    
    // Make handler globally accessible
    window.WorkflowIntegrationHandler = WorkflowIntegrationHandler;
}
