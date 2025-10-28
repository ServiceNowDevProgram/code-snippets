(function analyzeCMDBDataQuality() {
    var config = {
        table: 'cmdb_ci',
        keyFields: [
            'name',
            'ci_class',
            'operational_status',
            'install_status', 
            'location',
            'assigned_to',
            'manufacturer',
            'serial_number',
            'discovery_source',
            'last_discovered'
        ],
        thresholds: {
            minNameLength: 5,
            maxDataAge: 90, // days since last discovered
            maxAge: 365, // days to look back for analysis
            targetCompleteness: 75,
            duplicateThreshold: 3 // max CIs with same serial
        },
        operationalStates: {
            active: ['1', '6'], // In Use, Available
            inactive: ['2', '3', '4', '5', '7', '8', '100'] // Non-operational, Repair, Retired, etc.
        },
        sampleSize: 1000
    };

    gs.info('========================================');
    gs.info('PI Training Data Quality Analysis (CMDB CI)');
    gs.info('========================================');

    // Identify available operational states
    var actualStates = identifyOperationalStates();
    gs.info('Operational states found: ' + Object.keys(actualStates).length);
    
    // Get overall statistics
    var stats = getOverallStats(config);
    gs.info('');
    gs.info('=== STEP 1: Overall Statistics ===');
    gs.info('Total Configuration Items: ' + stats.total);
    gs.info('Active/Operational CIs: ' + stats.active);
    gs.info('Inactive/Non-operational CIs: ' + stats.inactive);
    gs.info('Recent 90 Days: ' + stats.recent90);
    gs.info('Recent 365 Days: ' + stats.recent365);
    gs.info('Unique CI Classes: ' + stats.uniqueClasses);
    gs.info('');

    if (stats.total < 100) {
        gs.warn('⚠️ Low number of CIs - may not be sufficient for comprehensive analysis');
        gs.info('Current: ' + stats.total);
    } else {
        gs.info('✅ Sufficient CIs for analysis');
    }

    // Field completeness analysis
    gs.info('');
    gs.info('=== STEP 2: Field Completeness Analysis ===');
    var completeness = analyzeFieldCompleteness(config);
    gs.info('Field Completeness Scores:');
    for (var field in completeness) {
        var pct = completeness[field].percentage;
        var icon = pct >= 80 ? '✅' : pct >= 50 ? '⚠️' : '❌';
        gs.info(icon + ' ' + field + ': ' + pct.toFixed(1) + '% (' + 
                completeness[field].filled + '/' + completeness[field].total + ')');
    }

    // Data freshness analysis
    gs.info('');
    gs.info('=== STEP 3: Data Freshness Analysis ===');
    var freshnessAnalysis = analyzeDataFreshness(config);
    gs.info('Discovery Data Freshness:');
    gs.info('  Recent (< 30 days): ' + freshnessAnalysis.recent + ' (' + freshnessAnalysis.recentPct.toFixed(1) + '%)');
    gs.info('  Stale (> 90 days): ' + freshnessAnalysis.stale + ' (' + freshnessAnalysis.stalePct.toFixed(1) + '%)');
    gs.info('  Never discovered: ' + freshnessAnalysis.neverDiscovered + ' (' + freshnessAnalysis.neverDiscoveredPct.toFixed(1) + '%)');
    gs.info('  Average age: ' + freshnessAnalysis.avgAge.toFixed(0) + ' days');

    // Duplicate detection
    gs.info('');
    gs.info('=== STEP 4: Duplicate Detection ===');
    var duplicates = analyzeDuplicates(config);
    gs.info('Potential Duplicates:');
    gs.info('  Serial Number Duplicates: ' + duplicates.serialDuplicates + ' groups');
    gs.info('  Name Similarity Issues: ' + duplicates.nameDuplicates + ' potential groups');
    gs.info('  Total Affected CIs: ' + duplicates.totalAffected);

    // CI Class distribution
    gs.info('');
    gs.info('=== STEP 5: CI Class Distribution ===');
    var classDist = analyzeCIClassDistribution(config);
    gs.info('Top 10 CI Classes:');
    for (var i = 0; i < Math.min(10, classDist.length); i++) {
        var cls = classDist[i];
        gs.info('  ' + (i+1) + '. ' + (cls.ci_class || '(empty)') + ': ' + cls.count + ' CIs');
    }

    // Naming quality analysis  
    gs.info('');
    gs.info('=== STEP 6: Naming Quality Analysis ===');
    var namingQuality = analyzeNamingQuality(config);
    gs.info('CI Naming Quality:');
    gs.info('  Average name length: ' + namingQuality.avgLength.toFixed(0) + ' characters');
    gs.info('  Too short names (<5 chars): ' + namingQuality.tooShort + ' (' + namingQuality.tooShortPct.toFixed(1) + '%)');
    gs.info('  Good quality names: ' + namingQuality.goodQuality + ' (' + namingQuality.goodQualityPct.toFixed(1) + '%)');
    gs.info('  Generic/Default names: ' + namingQuality.genericNames + ' (' + namingQuality.genericNamesPct.toFixed(1) + '%)');

    // Overall score
    var overallScore = calculateOverallScore(completeness, freshnessAnalysis, duplicates, namingQuality);
    gs.info('');
    gs.info('=== OVERALL CMDB QUALITY SCORE ===');
    var scoreIcon = overallScore >= 80 ? '✅' : overallScore >= 60 ? '⚠️' : '❌';
    gs.info(scoreIcon + ' Score: ' + overallScore.toFixed(0) + '/100');
    
    if (overallScore >= 80) {
        gs.info('✅ EXCELLENT - CMDB data is high quality');
    } else if (overallScore >= 60) {
        gs.info('⚠️ FAIR - CMDB has some quality issues to address');
    } else {
        gs.info('❌ POOR - Significant CMDB quality issues exist');
    }

    gs.info('');
    gs.info('========================================');
    gs.info('CMDB Analysis Complete');
    gs.info('========================================');

    // Helper functions
    function identifyOperationalStates() {
        var stateGr = new GlideAggregate('cmdb_ci');
        stateGr.groupBy('operational_status');
        stateGr.addAggregate('COUNT');
        stateGr.query();
        
        var states = {};
        while (stateGr.next()) {
            var state = stateGr.getValue('operational_status');
            var count = stateGr.getAggregate('COUNT');
            states[state] = parseInt(count);
            gs.info('Operational status ' + state + ': ' + count + ' CIs');
        }
        
        return states;
    }

    function getOverallStats(config) {
        var result = {total: 0, active: 0, inactive: 0, recent90: 0, recent365: 0, uniqueClasses: 0};
        
        // Total CIs
        var totalGr = new GlideAggregate('cmdb_ci');
        totalGr.addAggregate('COUNT');
        totalGr.query();
        if (totalGr.next()) {
            result.total = parseInt(totalGr.getAggregate('COUNT'));
        }
        
        // Active CIs (operational status 1 = In Use, 6 = Available)
        var activeGr = new GlideAggregate('cmdb_ci');
        activeGr.addQuery('operational_status', 'IN', config.operationalStates.active.join(','));
        activeGr.addAggregate('COUNT');
        activeGr.query();
        if (activeGr.next()) {
            result.active = parseInt(activeGr.getAggregate('COUNT'));
        }
        
        // Inactive CIs
        var inactiveGr = new GlideAggregate('cmdb_ci');
        inactiveGr.addQuery('operational_status', 'IN', config.operationalStates.inactive.join(','));
        inactiveGr.addAggregate('COUNT');
        inactiveGr.query();
        if (inactiveGr.next()) {
            result.inactive = parseInt(inactiveGr.getAggregate('COUNT'));
        }
        
        // Recent counts
        var recent365Gr = new GlideAggregate('cmdb_ci');
        recent365Gr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(365)');
        recent365Gr.addAggregate('COUNT');
        recent365Gr.query();
        if (recent365Gr.next()) {
            result.recent365 = parseInt(recent365Gr.getAggregate('COUNT'));
        }
        
        var recent90Gr = new GlideAggregate('cmdb_ci');
        recent90Gr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(90)');
        recent90Gr.addAggregate('COUNT');
        recent90Gr.query();
        if (recent90Gr.next()) {
            result.recent90 = parseInt(recent90Gr.getAggregate('COUNT'));
        }
        
        // Unique CI classes
        var classGr = new GlideAggregate('cmdb_ci');
        classGr.groupBy('ci_class');
        classGr.addAggregate('COUNT');
        classGr.query();
        while (classGr.next()) {
            result.uniqueClasses++;
        }
        
        return result;
    }

    function analyzeFieldCompleteness(config) {
        var results = {};
        
        // Get total count
        var totalGr = new GlideAggregate('cmdb_ci');
        totalGr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(' + config.thresholds.maxAge + ')');
        totalGr.addAggregate('COUNT');
        totalGr.query();
        
        var total = 0;
        if (totalGr.next()) {
            total = parseInt(totalGr.getAggregate('COUNT'));
        }
        
        gs.info('Analyzing ' + total + ' CIs for field completeness...');
        
        for (var f = 0; f < config.keyFields.length; f++) {
            var fieldName = config.keyFields[f];
            var testGr = new GlideRecord('cmdb_ci');
            if (!testGr.isValidField(fieldName)) {
                gs.warn('Field ' + fieldName + ' not found, skipping');
                continue;
            }
            
            var filledGr = new GlideAggregate('cmdb_ci');
            filledGr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(' + config.thresholds.maxAge + ')');
            filledGr.addQuery(fieldName, '!=', '');
            filledGr.addNotNullQuery(fieldName);
            filledGr.addAggregate('COUNT');
            filledGr.query();
            
            var filled = 0;
            if (filledGr.next()) {
                filled = parseInt(filledGr.getAggregate('COUNT'));
            }
            
            results[fieldName] = {
                total: total,
                filled: filled,
                percentage: total > 0 ? (filled / total * 100) : 0
            };
        }
        
        return results;
    }

    function analyzeDataFreshness(config) {
        var gr = new GlideRecord('cmdb_ci');
        gr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(' + config.thresholds.maxAge + ')');
        gr.setLimit(config.sampleSize);
        gr.query();

        var stats = {
            total: 0,
            recent: 0,
            stale: 0,
            neverDiscovered: 0,
            totalAge: 0,
            ageCount: 0
        };

        var now = new GlideDateTime();
        
        while (gr.next()) {
            stats.total++;
            var lastDiscovered = gr.getValue('last_discovered');
            
            if (!lastDiscovered) {
                stats.neverDiscovered++;
            } else {
                var discoveryDate = new GlideDateTime(lastDiscovered);
                var diffMs = now.getNumericValue() - discoveryDate.getNumericValue();
                var ageDays = diffMs / (1000 * 60 * 60 * 24);
                
                stats.totalAge += ageDays;
                stats.ageCount++;
                
                if (ageDays <= 30) {
                    stats.recent++;
                } else if (ageDays > config.thresholds.maxDataAge) {
                    stats.stale++;
                }
            }
        }

        return {
            recent: stats.recent,
            recentPct: stats.total > 0 ? (stats.recent / stats.total * 100) : 0,
            stale: stats.stale,
            stalePct: stats.total > 0 ? (stats.stale / stats.total * 100) : 0,
            neverDiscovered: stats.neverDiscovered,
            neverDiscoveredPct: stats.total > 0 ? (stats.neverDiscovered / stats.total * 100) : 0,
            avgAge: stats.ageCount > 0 ? (stats.totalAge / stats.ageCount) : 0
        };
    }

    function analyzeDuplicates(config) {
        var results = {
            serialDuplicates: 0,
            nameDuplicates: 0,
            totalAffected: 0
        };

        // Check for serial number duplicates
        var serialGr = new GlideAggregate('cmdb_ci');
        serialGr.addQuery('serial_number', '!=', '');
        serialGr.addNotNullQuery('serial_number');
        serialGr.groupBy('serial_number');
        serialGr.addAggregate('COUNT');
        serialGr.addHaving('COUNT', '>', '1');
        serialGr.query();
        
        while (serialGr.next()) {
            var count = parseInt(serialGr.getAggregate('COUNT'));
            if (count > 1) {
                results.serialDuplicates++;
                results.totalAffected += count;
            }
        }

        // Simple name similarity check (same name with different cases/spaces)
        var nameGr = new GlideAggregate('cmdb_ci');
        nameGr.addQuery('name', '!=', '');
        nameGr.groupBy('name');
        nameGr.addAggregate('COUNT');
        nameGr.addHaving('COUNT', '>', '1');
        nameGr.query();
        
        while (nameGr.next()) {
            var count = parseInt(nameGr.getAggregate('COUNT'));
            if (count > 1) {
                results.nameDuplicates++;
            }
        }

        return results;
    }

    function analyzeCIClassDistribution(config) {
        var classGr = new GlideAggregate('cmdb_ci');
        classGr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(' + config.thresholds.maxAge + ')');
        classGr.groupBy('ci_class');
        classGr.addAggregate('COUNT');
        classGr.query();

        var classes = [];
        while (classGr.next()) {
            classes.push({
                ci_class: classGr.getDisplayValue('ci_class'),
                count: parseInt(classGr.getAggregate('COUNT'))
            });
        }

        classes.sort(function(a, b) { return b.count - a.count; });
        return classes;
    }

    function analyzeNamingQuality(config) {
        var gr = new GlideRecord('cmdb_ci');
        gr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(' + config.thresholds.maxAge + ')');
        gr.setLimit(config.sampleSize);
        gr.query();

        var stats = {
            totalLength: 0,
            count: 0,
            tooShort: 0,
            goodQuality: 0,
            genericNames: 0
        };

        var genericPatterns = ['server', 'computer', 'device', 'unknown', 'default', 'test', 'temp'];

        while (gr.next()) {
            var name = gr.getValue('name') || '';
            if (name) {
                stats.count++;
                stats.totalLength += name.length;
                
                if (name.length < config.thresholds.minNameLength) {
                    stats.tooShort++;
                } else {
                    stats.goodQuality++;
                }

                // Check for generic names
                var lowerName = name.toLowerCase();
                for (var p = 0; p < genericPatterns.length; p++) {
                    if (lowerName.indexOf(genericPatterns[p]) >= 0) {
                        stats.genericNames++;
                        break;
                    }
                }
            }
        }

        return {
            avgLength: stats.count > 0 ? stats.totalLength / stats.count : 0,
            tooShort: stats.tooShort,
            tooShortPct: stats.count > 0 ? (stats.tooShort / stats.count * 100) : 0,
            goodQuality: stats.goodQuality,
            goodQualityPct: stats.count > 0 ? (stats.goodQuality / stats.count * 100) : 0,
            genericNames: stats.genericNames,
            genericNamesPct: stats.count > 0 ? (stats.genericNames / stats.count * 100) : 0
        };
    }

    function calculateOverallScore(completeness, freshness, duplicates, naming) {
        var score = 0;
        var weights = {
            completeness: 30,
            freshness: 25,
            duplicates: 25,
            naming: 20
        };

        // Completeness score
        var compTotal = 0, compCount = 0;
        for (var field in completeness) {
            compTotal += completeness[field].percentage;
            compCount++;
        }
        var compScore = compCount > 0 ? (compTotal / compCount) : 0;
        score += (compScore / 100) * weights.completeness;

        // Freshness score (higher is better)
        var freshnessScore = Math.max(0, 100 - freshness.stalePct - (freshness.neverDiscoveredPct * 0.5));
        score += (freshnessScore / 100) * weights.freshness;

        // Duplicate score (lower duplicates = higher score)
        var duplicateScore = duplicates.totalAffected > 0 ? Math.max(0, 100 - (duplicates.totalAffected / 10)) : 100;
        score += (duplicateScore / 100) * weights.duplicates;

        // Naming score
        var namingScore = naming.goodQualityPct - (naming.genericNamesPct * 0.5);
        score += (namingScore / 100) * weights.naming;

        return Math.min(100, Math.max(0, score));
    }

})();