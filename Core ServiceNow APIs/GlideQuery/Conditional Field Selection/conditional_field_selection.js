// Conditional Field Selection with GlideQuery
// Demonstrates dynamically selecting different fields based on runtime conditions

/**
 * Example 1: Role-based Field Selection
 * Select different incident fields based on user's role
 */
function getIncidentsByRole(userRole, assignedTo) {
    // Define base fields that everyone can see
    let baseFields = ['number', 'short_description', 'state', 'priority', 'sys_created_on'];

    // Define additional fields based on role
    let additionalFields = [];

    if (userRole === 'admin' || userRole === 'security_admin') {
        additionalFields = ['caller_id', 'assigned_to', 'assignment_group', 'work_notes', 'comments'];
    } else if (userRole === 'itil') {
        additionalFields = ['caller_id', 'assigned_to', 'assignment_group'];
    } else if (userRole === 'agent') {
        additionalFields = ['assigned_to', 'assignment_group'];
    }

    // Combine base and additional fields
    let fieldsToSelect = baseFields.concat(additionalFields);

    return new GlideQuery('incident')
        .where('assigned_to', assignedTo)
        .where('state', '!=', 7) // Not closed
        .select(fieldsToSelect)
        .orderByDesc('sys_created_on')
        .toArray(50);
}

/**
 * Example 2: Performance-optimized Field Selection
 * Only include expensive fields when specifically requested
 */
function getTasksWithOptionalFields(options) {
    options = options || {};

    // Always include these lightweight fields
    let fields = ['sys_id', 'number', 'short_description', 'state'];

    // Conditionally add more expensive fields
    if (options.includeUserDetails) {
        fields.push('caller_id.name', 'caller_id.email', 'assigned_to.name');
    }

    if (options.includeTimeTracking) {
        fields.push('work_start', 'work_end', 'business_duration');
    }

    if (options.includeApprovalInfo) {
        fields.push('approval', 'approval_history');
    }

    if (options.includeRelatedRecords) {
        fields.push('parent.number', 'caused_by.number');
    }

    let query = new GlideQuery('task')
        .where('active', true)
        .select(fields);

    if (options.assignmentGroup) {
        query.where('assignment_group', options.assignmentGroup);
    }

    return query.toArray(100);
}

/**
 * Example 3: Dynamic Field Array Building
 * Build field selection based on table structure and permissions
 */
function getDynamicFieldSelection(tableName, userPermissions, includeMetadata) {
    let fields = [];

    // Always include sys_id
    fields.push('sys_id');

    // Add fields based on table type
    if (tableName === 'incident' || tableName === 'sc_request') {
        fields.push('number', 'short_description', 'state', 'priority');

        if (userPermissions.canViewCaller) {
            fields.push('caller_id');
        }

        if (userPermissions.canViewAssignment) {
            fields.push('assigned_to', 'assignment_group');
        }
    } else if (tableName === 'cmdb_ci') {
        fields.push('name', 'operational_status', 'install_status');

        if (userPermissions.canViewConfiguration) {
            fields.push('ip_address', 'fqdn', 'serial_number');
        }
    }

    // Add metadata fields if requested
    if (includeMetadata) {
        fields.push('sys_created_on', 'sys_created_by', 'sys_updated_on', 'sys_updated_by');
    }

    return new GlideQuery(tableName)
        .select(fields)
        .limit(100)
        .toArray();
}

/**
 * Example 4: Chained Conditional Selection with Method Chaining
 * Demonstrate building complex queries with multiple conditions
 */
function getConditionalIncidentData(filters) {
    let query = new GlideQuery('incident');

    // Build base field list
    let fields = ['sys_id', 'number', 'short_description', 'state'];

    // Apply filters and modify field selection accordingly
    if (filters.priority && filters.priority.length > 0) {
        query.where('priority', 'IN', filters.priority);
        fields.push('priority'); // Include priority field when filtering by it
    }

    if (filters.assignmentGroup) {
        query.where('assignment_group', filters.assignmentGroup);
        fields.push('assignment_group', 'assigned_to'); // Include assignment fields
    }

    if (filters.dateRange) {
        query.where('sys_created_on', '>=', filters.dateRange.start)
             .where('sys_created_on', '<=', filters.dateRange.end);
        fields.push('sys_created_on'); // Include date when filtering by it
    }

    if (filters.includeComments) {
        fields.push('comments', 'work_notes');
    }

    if (filters.includeResolution) {
        fields.push('close_code', 'close_notes', 'resolved_by');
    }

    return query.select(fields)
                .orderByDesc('sys_created_on')
                .toArray(filters.limit || 50);
}

/**
 * Example 5: Security-conscious Field Selection
 * Exclude sensitive fields based on user context
 */
function getSecureUserData(requestingUser, targetUserId) {
    let baseFields = ['sys_id', 'name', 'user_name', 'active'];

    // Check if requesting user can see additional details
    if (gs.hasRole('user_admin') || requestingUser === targetUserId) {
        // Full access - include all standard fields
        return new GlideQuery('sys_user')
            .where('sys_id', targetUserId)
            .select(['sys_id', 'name', 'user_name', 'email', 'phone', 'department', 'title', 'manager', 'active'])
            .toArray(1);
    } else if (gs.hasRole('hr_admin')) {
        // HR access - include HR-relevant fields but not IT details
        return new GlideQuery('sys_user')
            .where('sys_id', targetUserId)
            .select(['sys_id', 'name', 'user_name', 'department', 'title', 'manager', 'active'])
            .toArray(1);
    } else {
        // Limited access - only public information
        return new GlideQuery('sys_user')
            .where('sys_id', targetUserId)
            .select(baseFields)
            .toArray(1);
    }
}

// Usage Examples:

// Role-based selection
var adminIncidents = getIncidentsByRole('admin', gs.getUserID());

// Performance-optimized query
var tasksWithDetails = getTasksWithOptionalFields({
    includeUserDetails: true,
    includeTimeTracking: false,
    assignmentGroup: 'hardware'
});

// Dynamic field building
var dynamicData = getDynamicFieldSelection('incident', {
    canViewCaller: true,
    canViewAssignment: false
}, true);

// Complex conditional query
var filteredIncidents = getConditionalIncidentData({
    priority: [1, 2],
    assignmentGroup: 'network',
    includeComments: true,
    limit: 25
});