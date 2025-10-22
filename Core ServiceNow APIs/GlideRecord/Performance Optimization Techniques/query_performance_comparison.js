/**
 * Query Performance Comparison and Analysis
 * 
 * This snippet provides tools to compare different query approaches and measure their performance
 * to help developers choose the most efficient methods.
 * 
 * Use Case: Performance testing, query optimization, development best practices
 * Performance Benefits: Data-driven optimization decisions, performance monitoring
 * 
 * @author ServiceNow Community
 * @version 1.0
 */

// Performance Testing Framework
var QueryPerformanceTester = Class.create();
QueryPerformanceTester.prototype = {
    
    initialize: function(tableName) {
        this.tableName = tableName || 'incident';
        this.results = [];
    },
    
    // Method to test different query approaches
    testQuery: function(testName, queryFunction, iterations) {
        iterations = iterations || 1;
        var times = [];
        var results = [];
        
        gs.log('Starting performance test: ' + testName);
        
        for (var i = 0; i < iterations; i++) {
            var startTime = new Date().getTime();
            
            try {
                var result = queryFunction();
                var endTime = new Date().getTime();
                var executionTime = endTime - startTime;
                
                times.push(executionTime);
                results.push(result);
                
            } catch (error) {
                gs.error('Error in test "' + testName + '", iteration ' + (i + 1) + ': ' + error.message);
                return null;
            }
        }
        
        var avgTime = times.reduce(function(a, b) { return a + b; }) / times.length;
        var minTime = Math.min.apply(null, times);
        var maxTime = Math.max.apply(null, times);
        
        var testResult = {
            name: testName,
            iterations: iterations,
            averageTime: avgTime,
            minimumTime: minTime,
            maximumTime: maxTime,
            resultCount: results[0] || 0,
            allTimes: times
        };
        
        this.results.push(testResult);
        
        gs.log('Test completed: ' + testName);
        gs.log('Average time: ' + avgTime + 'ms');
        gs.log('Result count: ' + (results[0] || 0));
        
        return testResult;
    },
    
    // Compare multiple query approaches
    compareQueries: function(queryTests, iterations) {
        iterations = iterations || 3;
        
        gs.log('Starting query performance comparison with ' + iterations + ' iterations each');
        
        var self = this;
        queryTests.forEach(function(test) {
            self.testQuery(test.name, test.query, iterations);
        });
        
        this.printComparison();
        return this.results;
    },
    
    // Print comparison results
    printComparison: function() {
        if (this.results.length === 0) {
            gs.log('No test results to compare');
            return;
        }
        
        gs.log('\n=== Query Performance Comparison Results ===');
        
        // Sort by average time
        var sortedResults = this.results.slice().sort(function(a, b) {
            return a.averageTime - b.averageTime;
        });
        
        sortedResults.forEach(function(result, index) {
            var rank = index + 1;
            var performance = rank === 1 ? 'BEST' : rank === sortedResults.length ? 'WORST' : 'GOOD';
            
            gs.log('\nRank #' + rank + ' (' + performance + '): ' + result.name);
            gs.log('  Average Time: ' + result.averageTime.toFixed(2) + 'ms');
            gs.log('  Min/Max Time: ' + result.minimumTime + 'ms / ' + result.maximumTime + 'ms');
            gs.log('  Result Count: ' + result.resultCount);
            
            if (index > 0) {
                var percentSlower = ((result.averageTime - sortedResults[0].averageTime) / sortedResults[0].averageTime * 100);
                gs.log('  Performance: ' + percentSlower.toFixed(1) + '% slower than best');
            }
        });
        
        gs.log('\n=== Recommendations ===');
        gs.log('Use "' + sortedResults[0].name + '" for best performance');
        if (sortedResults.length > 1) {
            gs.log('Avoid "' + sortedResults[sortedResults.length - 1].name + '" if possible');
        }
    }
};

// Example 1: Comparing Different Query Approaches
function compareBasicQueryMethods() {
    var tester = new QueryPerformanceTester('incident');
    
    var queryTests = [
        {
            name: 'Indexed Field Query (Optimal)',
            query: function() {
                var gr = new GlideRecord('incident');
                gr.addQuery('state', '2'); // Work in Progress (indexed)
                gr.addQuery('priority', '1'); // Critical (indexed)
                gr.setLimit(100);
                gr.query();
                return gr.getRowCount();
            }
        },
        {
            name: 'Multiple OR Conditions',
            query: function() {
                var gr = new GlideRecord('incident');
                gr.addQuery('state', 'IN', '1,2,3'); // Multiple states
                gr.addQuery('priority', 'IN', '1,2'); // High priorities
                gr.setLimit(100);
                gr.query();
                return gr.getRowCount();
            }
        },
        {
            name: 'Text Search (Non-Indexed)',
            query: function() {
                var gr = new GlideRecord('incident');
                gr.addQuery('short_description', 'CONTAINS', 'network'); // Text search
                gr.setLimit(100);
                gr.query();
                return gr.getRowCount();
            }
        },
        {
            name: 'Reference Field Display Value',
            query: function() {
                var gr = new GlideRecord('incident');
                gr.addQuery('caller_id.name', 'CONTAINS', 'John'); // Reference display value
                gr.setLimit(100);
                gr.query();
                return gr.getRowCount();
            }
        }
    ];
    
    return tester.compareQueries(queryTests, 3);
}

// Example 2: Date Query Performance Comparison
function compareDateQueryMethods() {
    var tester = new QueryPerformanceTester('incident');
    
    var queryTests = [
        {
            name: 'Built-in Date Functions (Optimal)',
            query: function() {
                var gr = new GlideRecord('incident');
                gr.addQuery('sys_created_on', '>=', gs.daysAgoStart(30));
                gr.addQuery('sys_created_on', '<=', gs.daysAgoEnd(1));
                gr.setLimit(100);
                gr.query();
                return gr.getRowCount();
            }
        },
        {
            name: 'GlideDateTime Calculations',
            query: function() {
                var gr = new GlideRecord('incident');
                var thirtyDaysAgo = new GlideDateTime();
                thirtyDaysAgo.addDaysUTC(-30);
                var oneDayAgo = new GlideDateTime();
                oneDayAgo.addDaysUTC(-1);
                
                gr.addQuery('sys_created_on', '>=', thirtyDaysAgo);
                gr.addQuery('sys_created_on', '<=', oneDayAgo);
                gr.setLimit(100);
                gr.query();
                return gr.getRowCount();
            }
        },
        {
            name: 'String Date Comparison',
            query: function() {
                var gr = new GlideRecord('incident');
                var today = new Date();
                var thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
                
                gr.addQuery('sys_created_on', '>=', thirtyDaysAgo.toISOString());
                gr.setLimit(100);
                gr.query();
                return gr.getRowCount();
            }
        }
    ];
    
    return tester.compareQueries(queryTests, 5);
}

// Example 3: Pagination Method Comparison
function comparePaginationMethods() {
    var tester = new QueryPerformanceTester('incident');
    var pageSize = 50;
    var pageNumber = 2;
    
    var queryTests = [
        {
            name: 'chooseWindow() Method (Optimal)',
            query: function() {
                var gr = new GlideRecord('incident');
                gr.addQuery('state', '!=', '7');
                gr.orderBy('sys_created_on');
                gr.chooseWindow(pageNumber * pageSize, (pageNumber + 1) * pageSize);
                gr.query();
                
                var count = 0;
                while (gr.next()) { count++; }
                return count;
            }
        },
        {
            name: 'setLimit() with Offset Simulation',
            query: function() {
                var gr = new GlideRecord('incident');
                gr.addQuery('state', '!=', '7');
                gr.orderBy('sys_created_on');
                gr.setLimit(pageSize * (pageNumber + 1));
                gr.query();
                
                var count = 0;
                var skip = pageSize * pageNumber;
                while (gr.next()) {
                    if (skip > 0) {
                        skip--;
                        continue;
                    }
                    count++;
                }
                return count;
            }
        }
    ];
    
    return tester.compareQueries(queryTests, 3);
}

// Example 4: Aggregate vs Manual Counting
function compareCountingMethods() {
    var tester = new QueryPerformanceTester('incident');
    
    var queryTests = [
        {
            name: 'GlideAggregate COUNT (Optimal)',
            query: function() {
                var ga = new GlideAggregate('incident');
                ga.addQuery('state', '!=', '7');
                ga.addAggregate('COUNT');
                ga.query();
                
                if (ga.next()) {
                    return parseInt(ga.getAggregate('COUNT'));
                }
                return 0;
            }
        },
        {
            name: 'GlideRecord getRowCount()',
            query: function() {
                var gr = new GlideRecord('incident');
                gr.addQuery('state', '!=', '7');
                gr.query();
                return gr.getRowCount();
            }
        },
        {
            name: 'Manual Counting with Loop',
            query: function() {
                var gr = new GlideRecord('incident');
                gr.addQuery('state', '!=', '7');
                gr.query();
                
                var count = 0;
                while (gr.next()) { count++; }
                return count;
            }
        }
    ];
    
    return tester.compareQueries(queryTests, 3);
}

// Example 5: Complex Query Optimization
function compareComplexQueries() {
    var tester = new QueryPerformanceTester('incident');
    
    var queryTests = [
        {
            name: 'Optimized Complex Query',
            query: function() {
                var gr = new GlideRecord('incident');
                
                // Start with most selective indexed fields
                gr.addQuery('state', 'IN', '1,2,3');
                gr.addQuery('priority', '<=', '3');
                gr.addQuery('sys_created_on', '>=', gs.daysAgoStart(30));
                
                // Add less selective filters after
                gr.addQuery('assignment_group', '!=', '');
                
                gr.orderBy('sys_created_on');
                gr.setLimit(100);
                gr.query();
                
                return gr.getRowCount();
            }
        },
        {
            name: 'Non-Optimized Complex Query',
            query: function() {
                var gr = new GlideRecord('incident');
                
                // Start with less selective fields
                gr.addQuery('short_description', 'CONTAINS', 'issue');
                gr.addQuery('assignment_group', '!=', '');
                gr.addQuery('state', 'IN', '1,2,3');
                gr.addQuery('priority', '<=', '3');
                
                gr.setLimit(100);
                gr.query();
                
                return gr.getRowCount();
            }
        }
    ];
    
    return tester.compareQueries(queryTests, 3);
}

// Comprehensive Performance Analysis
function runCompletePerformanceAnalysis() {
    gs.log('=== Starting Comprehensive Query Performance Analysis ===');
    
    var allResults = [];
    
    gs.log('\n1. Basic Query Methods Comparison:');
    allResults.push(compareBasicQueryMethods());
    
    gs.log('\n2. Date Query Methods Comparison:');
    allResults.push(compareDateQueryMethods());
    
    gs.log('\n3. Pagination Methods Comparison:');
    allResults.push(comparePaginationMethods());
    
    gs.log('\n4. Counting Methods Comparison:');
    allResults.push(compareCountingMethods());
    
    gs.log('\n5. Complex Query Optimization:');
    allResults.push(compareComplexQueries());
    
    gs.log('\n=== Performance Analysis Complete ===');
    
    return {
        basicQueries: allResults[0],
        dateQueries: allResults[1],
        pagination: allResults[2],
        counting: allResults[3],
        complexQueries: allResults[4]
    };
}

// Quick Performance Check for Development
function quickPerformanceCheck(tableName, testQuery) {
    var startTime = new Date().getTime();
    
    var gr = new GlideRecord(tableName);
    testQuery(gr); // Apply query function
    gr.query();
    
    var count = 0;
    while (gr.next()) { count++; }
    
    var endTime = new Date().getTime();
    var executionTime = endTime - startTime;
    
    var performance = {
        executionTime: executionTime,
        resultCount: count,
        performance: executionTime < 100 ? 'Excellent' : 
                    executionTime < 500 ? 'Good' : 
                    executionTime < 1000 ? 'Fair' : 'Poor'
    };
    
    gs.log('Quick Performance Check Results:');
    gs.log('- Execution Time: ' + executionTime + 'ms');
    gs.log('- Result Count: ' + count);
    gs.log('- Performance Rating: ' + performance.performance);
    
    return performance;
}
