/**
 * Indexed Field Query Optimization
 * 
 * This snippet demonstrates how to leverage database indexes for optimal query performance
 * in ServiceNow GlideRecord operations.
 * 
 * Use Case: High-performance queries on large tables
 * Performance Benefits: Faster query execution, reduced database load
 * 
 * @author ServiceNow Community
 * @version 1.0
 */

// Method 1: Using Indexed Fields for Optimal Performance
function queryWithIndexedFields() {
    var gr = new GlideRecord('incident');
    
    // GOOD: Query on indexed fields (state, priority, assignment_group are typically indexed)
    gr.addQuery('state', 'IN', '2,3'); // Work in Progress, On Hold
    gr.addQuery('priority', '<=', '3'); // High priority and above
    gr.addQuery('assignment_group', '!=', ''); // Has assignment group
    
    // GOOD: Use sys_created_on for date ranges (indexed timestamp)
    gr.addQuery('sys_created_on', '>=', gs.daysAgoStart(7));
    gr.addQuery('sys_created_on', '<=', gs.daysAgoEnd(1));
    
    // GOOD: Order by indexed field
    gr.orderBy('sys_created_on');
    
    gr.query();
    
    var results = [];
    while (gr.next()) {
        results.push({
            number: gr.getDisplayValue('number'),
            state: gr.getDisplayValue('state'),
            priority: gr.getDisplayValue('priority')
        });
    }
    
    return results;
}

// Method 2: Avoiding Non-Indexed Field Queries
function avoidNonIndexedQueries() {
    // BAD EXAMPLE - Don't do this on large tables
    function badQueryExample() {
        var gr = new GlideRecord('incident');
        
        // BAD: Contains query on non-indexed text field
        gr.addQuery('description', 'CONTAINS', 'network issue');
        
        // BAD: Complex wildcard search
        gr.addQuery('short_description', 'STARTSWITH', 'Unable');
        
        gr.query();
        return gr.getRowCount(); // Also bad on large tables
    }
    
    // GOOD ALTERNATIVE - Use indexed fields and full-text search
    function goodQueryAlternative() {
        var gr = new GlideRecord('incident');
        
        // GOOD: Use category/subcategory (often indexed)
        gr.addQuery('category', 'network');
        
        // GOOD: Use indexed fields first to narrow results
        gr.addQuery('state', 'IN', '1,2,3');
        gr.addQuery('sys_created_on', '>=', gs.daysAgoStart(30));
        
        // Then filter on text if needed (smaller result set)
        gr.addQuery('short_description', 'CONTAINS', 'unable');
        
        gr.query();
        
        var results = [];
        while (gr.next()) {
            results.push(gr.getUniqueValue());
        }
        
        return results;
    }
    
    return goodQueryAlternative();
}

// Method 3: Compound Index Optimization
function optimizeCompoundIndexes() {
    var gr = new GlideRecord('task');
    
    // GOOD: Query fields in order that matches compound indexes
    // Many tables have compound indexes on (table, state, assigned_to)
    gr.addQuery('state', '!=', '7'); // Not closed
    gr.addQuery('assigned_to', '!=', ''); // Has assignee
    
    // Add additional filters after indexed ones
    gr.addQuery('priority', '<=', '3');
    
    // Order by indexed field for better performance
    gr.orderBy('sys_updated_on');
    
    gr.query();
    
    return gr.getRowCount();
}

// Method 4: Reference Field Optimization
function optimizeReferenceQueries() {
    // GOOD: Query reference fields by sys_id (indexed)
    function queryByReferenceId() {
        var groupSysId = getAssignmentGroupSysId('Hardware');
        
        var gr = new GlideRecord('incident');
        gr.addQuery('assignment_group', groupSysId); // Uses index
        gr.addQuery('state', '!=', '7'); // Not closed
        gr.query();
        
        return gr.getRowCount();
    }
    
    // LESS OPTIMAL: Query by reference field display value
    function queryByDisplayValue() {
        var gr = new GlideRecord('incident');
        gr.addQuery('assignment_group.name', 'Hardware'); // Less efficient
        gr.addQuery('state', '!=', '7');
        gr.query();
        
        return gr.getRowCount();
    }
    
    // BEST: Combine both approaches
    function optimizedReferenceQuery() {
        // First get the sys_id using indexed query
        var groupGR = new GlideRecord('sys_user_group');
        groupGR.addQuery('name', 'Hardware');
        groupGR.query();
        
        if (groupGR.next()) {
            var groupSysId = groupGR.getUniqueValue();
            
            // Then use sys_id in main query (indexed)
            var gr = new GlideRecord('incident');
            gr.addQuery('assignment_group', groupSysId);
            gr.addQuery('state', '!=', '7');
            gr.query();
            
            return gr.getRowCount();
        }
        
        return 0;
    }
    
    return optimizedReferenceQuery();
}

// Method 5: Date Range Optimization
function optimizeDateRangeQueries() {
    // GOOD: Use built-in date functions with indexed timestamps
    function efficientDateQuery() {
        var gr = new GlideRecord('incident');
        
        // Use sys_created_on (indexed) with built-in functions
        gr.addQuery('sys_created_on', '>=', gs.daysAgoStart(30));
        gr.addQuery('sys_created_on', '<=', gs.daysAgoEnd(1));
        
        // Add other indexed filters
        gr.addQuery('state', '!=', '7');
        
        gr.query();
        return gr.getRowCount();
    }
    
    // LESS OPTIMAL: Complex date calculations
    function lessOptimalDateQuery() {
        var gr = new GlideRecord('incident');
        
        // Complex date calculation (harder to optimize)
        var thirtyDaysAgo = new GlideDateTime();
        thirtyDaysAgo.addDaysUTC(-30);
        
        gr.addQuery('sys_created_on', '>=', thirtyDaysAgo);
        gr.query();
        
        return gr.getRowCount();
    }
    
    return efficientDateQuery();
}

// Method 6: Query Performance Analysis
function analyzeQueryPerformance() {
    var queries = [
        {
            name: 'Indexed Query',
            query: function() {
                var gr = new GlideRecord('incident');
                gr.addQuery('state', '2');
                gr.addQuery('priority', '1');
                gr.setLimit(100);
                gr.query();
                return gr.getRowCount();
            }
        },
        {
            name: 'Non-Indexed Query',
            query: function() {
                var gr = new GlideRecord('incident');
                gr.addQuery('description', 'CONTAINS', 'test');
                gr.setLimit(100);
                gr.query();
                return gr.getRowCount();
            }
        }
    ];
    
    queries.forEach(function(queryTest) {
        var startTime = new Date().getTime();
        var result = queryTest.query();
        var endTime = new Date().getTime();
        var executionTime = endTime - startTime;
        
        gs.log(queryTest.name + ':');
        gs.log('  Execution time: ' + executionTime + 'ms');
        gs.log('  Result count: ' + result);
        gs.log('  Performance rating: ' + (executionTime < 100 ? 'Good' : executionTime < 500 ? 'Fair' : 'Poor'));
    });
}

// Helper function
function getAssignmentGroupSysId(groupName) {
    var gr = new GlideRecord('sys_user_group');
    gr.addQuery('name', groupName);
    gr.query();
    
    if (gr.next()) {
        return gr.getUniqueValue();
    }
    
    return '';
}

// Method 7: Index-Aware Pagination
function indexAwarePagination(pageSize, pageNumber) {
    pageSize = pageSize || 50;
    pageNumber = pageNumber || 0;
    
    var gr = new GlideRecord('incident');
    
    // Use indexed fields for filtering
    gr.addQuery('state', 'IN', '1,2,3');
    gr.addQuery('sys_created_on', '>=', gs.daysAgoStart(90));
    
    // Order by indexed field for consistent pagination
    gr.orderBy('sys_created_on');
    gr.orderByDesc('sys_id'); // Secondary sort for tie-breaking
    
    // Use chooseWindow for efficient pagination
    gr.chooseWindow(pageNumber * pageSize, (pageNumber + 1) * pageSize);
    
    gr.query();
    
    var results = [];
    while (gr.next()) {
        results.push({
            sys_id: gr.getUniqueValue(),
            number: gr.getDisplayValue('number'),
            short_description: gr.getDisplayValue('short_description'),
            state: gr.getDisplayValue('state')
        });
    }
    
    return {
        data: results,
        page: pageNumber,
        pageSize: pageSize,
        hasMore: results.length === pageSize
    };
}
