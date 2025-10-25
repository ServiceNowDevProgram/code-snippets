
var CostOptimizationAnalyzer = Class.create();
CostOptimizationAnalyzer.prototype = {
    
    analyze: function() {
        try {
            var results = {
                unusedLicenses: this.findUnusedLicenses(),
                redundantIntegrations: this.findRedundantIntegrations(),
                oversizedTables: this.findOversizedTables(),
                analysisDate: new GlideDateTime().getDisplayValue(),
                totalPotentialSavings: 0
            };
            
            results.totalPotentialSavings = this.calculatePotentialSavings(results);
            this.logResults(results);
            return results;
            
        } catch (e) {
            gs.error('Cost Analyzer Error: ' + e.message);
            return null;
        }
    },
    
    findUnusedLicenses: function() {
        var unusedLicenses = [];
        var threshold = gs.getProperty('cost.analyzer.license.threshold', '90');
        var cutoffDate = gs.daysAgoStart(parseInt(threshold));
        
        var userGr = new GlideRecord('sys_user');
        userGr.addQuery('active', true);
        userGr.addQuery('last_login_time', '<', cutoffDate);
        userGr.addNotNullQuery('last_login_time');
        userGr.query();
        
        while (userGr.next()) {
            var roles = this.getExpensiveRoles(userGr.sys_id.toString());
            if (roles.length > 0) {
                unusedLicenses.push({
                    user: userGr.user_name.toString(),
                    name: userGr.name.toString(),
                    lastLogin: userGr.last_login_time.getDisplayValue(),
                    expensiveRoles: roles,
                    estimatedMonthlyCost: roles.length * 100 // Estimate $100 per role
                });
            }
        }
        
        return unusedLicenses;
    },
    
    getExpensiveRoles: function(userId) {
        var expensiveRoles = ['itil', 'itil_admin', 'admin', 'security_admin', 'asset'];
        var userRoles = [];
        
        var roleGr = new GlideRecord('sys_user_has_role');
        roleGr.addQuery('user', userId);
        roleGr.query();
        
        while (roleGr.next()) {
            var roleName = roleGr.role.name.toString();
            if (expensiveRoles.indexOf(roleName) !== -1) {
                userRoles.push(roleName);
            }
        }
        
        return userRoles;
    },
    
    findRedundantIntegrations: function() {
        var redundantIntegrations = [];
        var threshold = gs.getProperty('cost.analyzer.integration.threshold', '30');
        var cutoffDate = gs.daysAgoStart(parseInt(threshold));
        
        // Check REST Messages
        var restGr = new GlideRecord('sys_rest_message');
        restGr.query();
        
        while (restGr.next()) {
            var lastUsed = this.getIntegrationLastUsed(restGr.sys_id.toString(), 'rest');
            if (lastUsed && lastUsed < cutoffDate) {
                redundantIntegrations.push({
                    name: restGr.name.toString(),
                    type: 'REST',
                    endpoint: restGr.endpoint.toString(),
                    lastUsed: lastUsed,
                    status: 'Potentially Unused'
                });
            }
        }
        
        // Check for duplicate endpoints
        var duplicates = this.findDuplicateEndpoints();
        redundantIntegrations = redundantIntegrations.concat(duplicates);
        
        return redundantIntegrations;
    },
    
    getIntegrationLastUsed: function(integrationId, type) {
        var logGr = new GlideRecord('syslog');
        logGr.addQuery('message', 'CONTAINS', integrationId);
        logGr.orderByDesc('sys_created_on');
        logGr.setLimit(1);
        logGr.query();
        
        if (logGr.next()) {
            return logGr.sys_created_on.getDisplayValue();
        }
        return null;
    },
    
    findDuplicateEndpoints: function() {
        var duplicates = [];
        var endpoints = {};
        
        var restGr = new GlideRecord('sys_rest_message');
        restGr.query();
        
        while (restGr.next()) {
            var endpoint = restGr.endpoint.toString();
            if (endpoints[endpoint]) {
                duplicates.push({
                    name: restGr.name.toString(),
                    type: 'REST',
                    endpoint: endpoint,
                    status: 'Duplicate Endpoint',
                    duplicateOf: endpoints[endpoint]
                });
            } else {
                endpoints[endpoint] = restGr.name.toString();
            }
        }
        
        return duplicates;
    },
    
    findOversizedTables: function() {
        var oversizedTables = [];
        var threshold = gs.getProperty('cost.analyzer.table.size.threshold', '1000000');
        
        var tableGr = new GlideRecord('sys_db_object');
        tableGr.addQuery('name', 'STARTSWITH', 'u_'); // Custom tables
        tableGr.query();
        
        while (tableGr.next()) {
            var tableName = tableGr.name.toString();
            var recordCount = this.getTableRecordCount(tableName);
            
            if (recordCount > parseInt(threshold)) {
                var sizeInfo = this.estimateTableSize(tableName, recordCount);
                oversizedTables.push({
                    table: tableName,
                    recordCount: recordCount,
                    estimatedSizeGB: sizeInfo.sizeGB,
                    recommendation: sizeInfo.recommendation
                });
            }
        }
        
        // Check system tables that commonly grow large
        var systemTables = ['sys_audit', 'sys_email', 'syslog', 'sys_attachment'];
        systemTables.forEach(function(tableName) {
            var recordCount = this.getTableRecordCount(tableName);
            if (recordCount > parseInt(threshold)) {
                var sizeInfo = this.estimateTableSize(tableName, recordCount);
                oversizedTables.push({
                    table: tableName,
                    recordCount: recordCount,
                    estimatedSizeGB: sizeInfo.sizeGB,
                    recommendation: sizeInfo.recommendation
                });
            }
        }.bind(this));
        
        return oversizedTables;
    },
    
    getTableRecordCount: function(tableName) {
        try {
            var countGr = new GlideAggregate(tableName);
            countGr.addAggregate('COUNT');
            countGr.query();
            
            if (countGr.next()) {
                return parseInt(countGr.getAggregate('COUNT'));
            }
        } catch (e) {
            gs.debug('Cannot count records for table: ' + tableName);
        }
        return 0;
    },
    
    estimateTableSize: function(tableName, recordCount) {
        var avgRecordSize = 2; // KB per record (estimate)
        var sizeGB = (recordCount * avgRecordSize) / (1024 * 1024);
        
        var recommendation = 'Consider archiving old records';
        if (tableName === 'sys_audit') {
            recommendation = 'Configure audit retention policy';
        } else if (tableName === 'sys_email') {
            recommendation = 'Clean up old email records';
        } else if (tableName === 'syslog') {
            recommendation = 'Reduce log retention period';
        }
        
        return {
            sizeGB: Math.round(sizeGB * 100) / 100,
            recommendation: recommendation
        };
    },
    
    calculatePotentialSavings: function(results) {
        var totalSavings = 0;
        
        // License savings
        results.unusedLicenses.forEach(function(license) {
            totalSavings += license.estimatedMonthlyCost || 0;
        });
        
        // Storage savings (estimate $10 per GB per month)
        results.oversizedTables.forEach(function(table) {
            totalSavings += (table.estimatedSizeGB * 10);
        });
        
        return '$' + totalSavings.toLocaleString() + '/month';
    },
    
    logResults: function(results) {
        gs.info('=== Cost Optimization Analysis Results ===');
        gs.info('Unused Licenses Found: ' + results.unusedLicenses.length);
        gs.info('Redundant Integrations: ' + results.redundantIntegrations.length);
        gs.info('Oversized Tables: ' + results.oversizedTables.length);
        gs.info('Potential Monthly Savings: ' + results.totalPotentialSavings);
        gs.info('========================================');
    },
    
    type: 'CostOptimizationAnalyzer'
};
