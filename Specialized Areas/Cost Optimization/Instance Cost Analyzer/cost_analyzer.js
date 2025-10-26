
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
        
        // Check IntegrationHub Spoke usage
        var unusedSpokes = this.findUnusedSpokes(cutoffDate);
        redundantIntegrations = redundantIntegrations.concat(unusedSpokes);
        
        // Check SOAP Web Services
        var unusedSoap = this.findUnusedSoapServices(cutoffDate);
        redundantIntegrations = redundantIntegrations.concat(unusedSoap);
        
        // Check for duplicate endpoints (still valuable)
        var duplicates = this.findDuplicateEndpoints();
        redundantIntegrations = redundantIntegrations.concat(duplicates);
        
        return redundantIntegrations;
    },
    
    findUnusedSpokes: function(cutoffDate) {
        var unusedSpokes = [];
        
        // Get all installed spokes
        var spokeGr = new GlideRecord('sys_app');
        spokeGr.addQuery('source', 'sn_app_store');
        spokeGr.addQuery('name', 'CONTAINS', 'spoke');
        spokeGr.query();
        
        while (spokeGr.next()) {
            var spokeId = spokeGr.sys_id.toString();
            var spokeName = spokeGr.name.toString();
            
            // Check usage in ua_ih_usage table
            var usageGr = new GlideRecord('ua_ih_usage');
            usageGr.addQuery('spoke', spokeId);
            usageGr.addQuery('sys_created_on', '>=', cutoffDate);
            usageGr.setLimit(1);
            usageGr.query();
            
            if (!usageGr.hasNext()) {
                // No recent usage found
                var lastUsage = this.getLastSpokeUsage(spokeId);
                unusedSpokes.push({
                    name: spokeName,
                    type: 'IntegrationHub Spoke',
                    spokeId: spokeId,
                    lastUsed: lastUsage,
                    status: 'Potentially Unused'
                });
            }
        }
        
        return unusedSpokes;
    },
    
    getLastSpokeUsage: function(spokeId) {
        var usageGr = new GlideRecord('ua_ih_usage');
        usageGr.addQuery('spoke', spokeId);
        usageGr.orderByDesc('sys_created_on');
        usageGr.setLimit(1);
        usageGr.query();
        
        if (usageGr.next()) {
            return usageGr.sys_created_on.getDisplayValue();
        }
        return 'Never used';
    },
    
    findUnusedSoapServices: function(cutoffDate) {
        var unusedSoap = [];
        
        var soapGr = new GlideRecord('sys_web_service');
        soapGr.query();
        
        while (soapGr.next()) {
            var soapId = soapGr.sys_id.toString();
            var soapName = soapGr.name.toString();
            
            // Check if SOAP service has been used recently
            var usageCount = this.getSoapUsageCount(soapId, cutoffDate);
            if (usageCount === 0) {
                unusedSoap.push({
                    name: soapName,
                    type: 'SOAP Web Service',
                    endpoint: soapGr.endpoint.toString(),
                    lastUsed: this.getLastSoapUsage(soapId),
                    status: 'Potentially Unused'
                });
            }
        }
        
        return unusedSoap;
    },
    
    getSoapUsageCount: function(soapId, cutoffDate) {
        var usageGr = new GlideAggregate('sys_soap_log');
        usageGr.addQuery('web_service', soapId);
        usageGr.addQuery('sys_created_on', '>=', cutoffDate);
        usageGr.addAggregate('COUNT');
        usageGr.query();
        
        if (usageGr.next()) {
            return parseInt(usageGr.getAggregate('COUNT'));
        }
        return 0;
    },
    
    getLastSoapUsage: function(soapId) {
        var logGr = new GlideRecord('sys_soap_log');
        logGr.addQuery('web_service', soapId);
        logGr.orderByDesc('sys_created_on');
        logGr.setLimit(1);
        logGr.query();
        
        if (logGr.next()) {
            return logGr.sys_created_on.getDisplayValue();
        }
        return 'Never used';
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
                var sizeInfo = this.getActualTableSize(tableName, recordCount);
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
                var sizeInfo = this.getActualTableSize(tableName, recordCount);
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
    
    getActualTableSize: function(tableName, recordCount) {
        var sizeGB = 0;
        
        // Get actual table size from sys_physical_table_stats
        var statsGr = new GlideRecord('sys_physical_table_stats');
        statsGr.addQuery('table_name', tableName);
        statsGr.orderByDesc('sys_created_on');
        statsGr.setLimit(1);
        statsGr.query();
        
        if (statsGr.next()) {
            // Convert bytes to GB
            var sizeBytes = parseInt(statsGr.size_bytes || 0);
            sizeGB = sizeBytes / (1024 * 1024 * 1024);
        } else {
            // Fallback to estimate if stats not available
            var avgRecordSize = 2; // KB per record (estimate)
            sizeGB = (recordCount * avgRecordSize) / (1024 * 1024);
        }
        
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
}
