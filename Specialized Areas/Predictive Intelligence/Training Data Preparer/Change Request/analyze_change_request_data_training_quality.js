// ========================================
// PI Training Data Quality Analyzer
// ========================================
// Purpose: Analyze change_request data quality for Predictive Intelligence training
// Use Case: Identify data quality issues before training ML models
// No Training Required: Analyzes existing data without ML
// ========================================

(function analyzeChangeRequestTrainingDataQuality() {
    // Print all fields that exist on the change_request table and its parents
    function printAllFields(tableName) {
        var tables = [tableName];
        var currentTable = tableName;
        while (currentTable) {
            var tableRec = new GlideRecord('sys_db_object');
            tableRec.addQuery('name', currentTable);
            tableRec.query();
            if (tableRec.next()) {
                var parentSysId = tableRec.getValue('super_class');
                if (parentSysId && parentSysId != '') {
                    var parentRec = new GlideRecord('sys_db_object');
                    if (parentRec.get(parentSysId)) {
                        var parentName = parentRec.getValue('name');
                        tables.push(parentName);
                        currentTable = parentName;
                    } else {
                        currentTable = null;
                    }
                } else {
                    currentTable = null;
                }
            } else {
                currentTable = null;
            }
        }
        var field = new GlideRecord('sys_dictionary');
        field.addQuery('name', 'IN', tables.join(','));
        field.query();
     
    }

    printAllFields('change_request');
    // Helper: check if field exists in table hierarchy
    function fieldExists(tableName, fieldName) {
        var tables = [tableName];
        var currentTable = tableName;
        while (currentTable) {
            var tableRec = new GlideRecord('sys_db_object');
            tableRec.addQuery('name', currentTable);
            tableRec.query();
            if (tableRec.next()) {
                var parentSysId = tableRec.getValue('super_class');
                if (parentSysId && parentSysId != '') {
                    var parentRec = new GlideRecord('sys_db_object');
                    if (parentRec.get(parentSysId)) {
                        var parentName = parentRec.getValue('name');
                        tables.push(parentName);
                        currentTable = parentName;
                    } else {
                        currentTable = null;
                    }
                } else {
                    currentTable = null;
                }
            } else {
                currentTable = null;
            }
        }
        var field = new GlideRecord('sys_dictionary');
        field.addQuery('element', fieldName);
        field.addQuery('name', 'IN', tables.join(','));
        field.query();
        return field.hasNext();
    }
    
    // ============================================
    // CONFIGURATION
    // ============================================
    var config = {
        table: 'change_request',
        
        // Fields to analyze for completeness
        keyFields: [
            'short_description',
            'description',
            'category',
            'risk',
            'assignment_group',
            'implementation_plan',
            'test_plan',
            'backout_plan',
            'close_notes'
        ],
        
        // Quality thresholds
        thresholds: {
            minDescriptionLength: 20,      // Characters
            minCloseNotesLength: 50,       // Characters
            minImplementationPlanLength: 30, // Characters
            minTestPlanLength: 30,           // Characters
            minBackoutPlanLength: 30,        // Characters
            minResolutionTime: 10,         // Minutes
            maxAge: 365,                   // Days - only analyze recent data
            targetCompleteness: 80         // Percent of fields filled
        },
        
        // States to analyze
        states: {
            closed: 3
        },
        
        sampleSize: 500  // Max records to analyze in detail
    };
    
    gs.info('========================================');
    gs.info('PI Change Request Training Data Quality Analysis');
    gs.info('========================================');
    gs.info('Table: ' + config.table);
    gs.info('Sample Size: Up to ' + config.sampleSize + ' records');
    gs.info('');
    
    // ============================================
    // STEP 1: Overall Data Statistics
    // ============================================
    gs.info('=== STEP 1: Overall Statistics ===');
    gs.info('');
    
    var stats = getOverallStats();
    
    gs.info('Total Change Requests:');
    gs.info('  All States: ' + stats.total);
    gs.info('  Closed: ' + stats.closed);
    gs.info('  Last 90 Days: ' + stats.recent90);
    gs.info('  Last 365 Days: ' + stats.recent365);
    gs.info('');
    
    if (stats.closed < 50) {
        gs.warn('⚠️ Low number of closed change requests - need at least 50 for training');
        gs.info('Current: ' + stats.closed);
    } else {
        gs.info('✅ Sufficient closed change requests for training');
    }
    
    // ============================================
    // STEP 2: Field Completeness Analysis
    // ============================================
    gs.info('');
    gs.info('=== STEP 2: Field Completeness Analysis ===');
    gs.info('Analyzing closed change requests from last ' + config.thresholds.maxAge + ' days');
    gs.info('');
    
    var completeness = analyzeFieldCompleteness();
    
    gs.info('Field Completeness Scores:');
    gs.info('');
    
    for (var field in completeness) {
        var pct = completeness[field].percentage;
        var icon = pct >= 80 ? '✅' : pct >= 50 ? '⚠️' : '❌';
        
        gs.info(icon + ' ' + field + ': ' + pct.toFixed(1) + '%');
        gs.info('   Filled: ' + completeness[field].filled + ' / ' + completeness[field].total);
        
        if (pct < 50) {
            gs.info('   ⚠️ LOW - This field may not be useful for training');
        }
        gs.info('');
    }
    
    // ============================================
    // STEP 3: Text Quality Analysis
    // ============================================
    gs.info('');
    gs.info('=== STEP 3: Text Quality Analysis ===');
    gs.info('Analyzing text field content quality');
    gs.info('');
    
    var textQuality = analyzeTextQuality();
    
    gs.info('Description Quality:');
    gs.info('  Average Length: ' + textQuality.description.avgLength.toFixed(0) + ' characters');
    gs.info('  Too Short (<20 chars): ' + textQuality.description.tooShort + ' (' + 
            (textQuality.description.tooShortPct).toFixed(1) + '%)');
    gs.info('  Good Quality: ' + textQuality.description.goodQuality + ' (' + 
            (textQuality.description.goodQualityPct).toFixed(1) + '%)');
    gs.info('');
    
    gs.info('Close Notes Quality:');
    gs.info('  Average Length: ' + textQuality.closeNotes.avgLength.toFixed(0) + ' characters');
    gs.info('  Too Short (<50 chars): ' + textQuality.closeNotes.tooShort + ' (' + 
            (textQuality.closeNotes.tooShortPct).toFixed(1) + '%)');
    gs.info('  Good Quality: ' + textQuality.closeNotes.goodQuality + ' (' + 
            (textQuality.closeNotes.goodQualityPct).toFixed(1) + '%)');
    gs.info('');
    
    // Implementation/Test/Backout Plan Quality
    gs.info('Implementation Plan Quality:');
    gs.info('  Average Length: ' + textQuality.implementationPlan.avgLength.toFixed(0) + ' characters');
    gs.info('  Too Short (<30 chars): ' + textQuality.implementationPlan.tooShort + ' (' + 
            (textQuality.implementationPlan.tooShortPct).toFixed(1) + '%)');
    gs.info('  Good Quality: ' + textQuality.implementationPlan.goodQuality + ' (' + 
            (textQuality.implementationPlan.goodQualityPct).toFixed(1) + '%)');
    gs.info('');
    gs.info('Test Plan Quality:');
    gs.info('  Average Length: ' + textQuality.testPlan.avgLength.toFixed(0) + ' characters');
    gs.info('  Too Short (<30 chars): ' + textQuality.testPlan.tooShort + ' (' + 
            (textQuality.testPlan.tooShortPct).toFixed(1) + '%)');
    gs.info('  Good Quality: ' + textQuality.testPlan.goodQuality + ' (' + 
            (textQuality.testPlan.goodQualityPct).toFixed(1) + '%)');
    gs.info('');
    gs.info('Backout Plan Quality:');
    gs.info('  Average Length: ' + textQuality.backoutPlan.avgLength.toFixed(0) + ' characters');
    gs.info('  Too Short (<30 chars): ' + textQuality.backoutPlan.tooShort + ' (' + 
            (textQuality.backoutPlan.tooShortPct).toFixed(1) + '%)');
    gs.info('  Good Quality: ' + textQuality.backoutPlan.goodQuality + ' (' + 
            (textQuality.backoutPlan.goodQualityPct).toFixed(1) + '%)');
    gs.info('');
    
    // ============================================
    // STEP 4: Category Distribution
    // ============================================
    gs.info('');
    gs.info('=== STEP 4: Category Distribution ===');
    gs.info('Analyzing change request category spread');
    gs.info('');
    
    var categoryDist = analyzeCategoryDistribution();
    
    gs.info('Top 10 Categories:');
    for (var i = 0; i < Math.min(10, categoryDist.length); i++) {
        var cat = categoryDist[i];
        gs.info('  ' + (i+1) + '. ' + (cat.category || '(empty)') + ': ' + cat.count + ' change requests');
    }
    gs.info('');
    
    if (categoryDist.length < 5) {
        gs.warn('⚠️ Low category diversity - model may not generalize well');
    } else {
        gs.info('✅ Good category diversity for training');
    }
    
    // ============================================
    // STEP 5: Resolution Time Analysis
    // ============================================
    gs.info('');
    gs.info('=== STEP 5: Resolution Time Analysis ===');
    gs.info('');
    
    var timeAnalysis = analyzeResolutionTimes();
    
    gs.info('Resolution Times:');
    gs.info('  Average: ' + timeAnalysis.avgMinutes.toFixed(0) + ' minutes');
    gs.info('  Median: ' + timeAnalysis.medianMinutes.toFixed(0) + ' minutes');
    gs.info('  Too Quick (<10 min): ' + timeAnalysis.tooQuick + ' (' + 
            (timeAnalysis.tooQuickPct).toFixed(1) + '%)');
    gs.info('');
    
    if (timeAnalysis.tooQuickPct > 30) {
        gs.warn('⚠️ Many change requests closed very quickly');
        gs.info('   These may be duplicates or low-quality data');
        gs.info('   Consider filtering: end_date > start_date + 10 minutes');
    }
    
    // ============================================
    // STEP 6: Overall Quality Score
    // ============================================
    gs.info('');
    gs.info('=== STEP 6: Overall Data Quality Score ===');
    gs.info('');
    
    var overallScore = calculateOverallScore(completeness, textQuality, timeAnalysis);
    
    var scoreIcon = overallScore >= 80 ? '✅' : overallScore >= 60 ? '⚠️' : '❌';
    gs.info(scoreIcon + ' Overall Quality Score: ' + overallScore.toFixed(0) + '/100');
    gs.info('');
    
    if (overallScore >= 80) {
        gs.info('✅ EXCELLENT - Data is ready for high-quality training');
    } else if (overallScore >= 60) {
        gs.info('⚠️ FAIR - Data can be used but consider improvements');
    } else {
        gs.info('❌ POOR - Significant data quality issues exist');
    }
    
    // ============================================
    // STEP 7: Recommendations
    // ============================================
    gs.info('');
    gs.info('========================================');
    gs.info('Analysis Complete');
    gs.info('========================================');
    
    // ============================================
    // HELPER FUNCTIONS
    // ============================================
    function getOverallStats() {
        var result = {
            total: 0,
            closed: 0,
            recent90: 0,
            recent365: 0
        };
        // Total change requests
        var totalGr = new GlideAggregate(config.table);
        totalGr.addAggregate('COUNT');
        totalGr.query();
        if (totalGr.next()) {
            result.total = parseInt(totalGr.getAggregate('COUNT'));
        }
        // Closed
        var closedGr = new GlideAggregate(config.table);
        closedGr.addQuery('state', config.states.closed);
        closedGr.addAggregate('COUNT');
        closedGr.query();
        if (closedGr.next()) {
            result.closed = parseInt(closedGr.getAggregate('COUNT'));
        }
        // Recent 90 days
        var recent90Gr = new GlideAggregate(config.table);
        recent90Gr.addQuery('state', config.states.closed);
        recent90Gr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(90)');
        recent90Gr.addAggregate('COUNT');
        recent90Gr.query();
        if (recent90Gr.next()) {
            result.recent90 = parseInt(recent90Gr.getAggregate('COUNT'));
        }
        // Recent 365 days
        var recent365Gr = new GlideAggregate(config.table);
        recent365Gr.addQuery('state', config.states.closed);
        recent365Gr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(365)');
        recent365Gr.addAggregate('COUNT');
        recent365Gr.query();
        if (recent365Gr.next()) {
            result.recent365 = parseInt(recent365Gr.getAggregate('COUNT'));
        }
        return result;
    }

    function analyzeFieldCompleteness() {
        var results = {};
        var totalGr = new GlideAggregate(config.table);
        totalGr.addQuery('state', config.states.closed);
        totalGr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(' + config.thresholds.maxAge + ')');
        totalGr.addAggregate('COUNT');
        totalGr.query();
        var total = 0;
        if (totalGr.next()) {
            total = parseInt(totalGr.getAggregate('COUNT'));
        }
        for (var f = 0; f < config.keyFields.length; f++) {
            var fieldName = config.keyFields[f];
            if (!fieldExists(config.table, fieldName)) {
                gs.warn('Field does not exist: ' + fieldName + ' - skipping completeness analysis for this field');
                continue;
            }
            var filledGr = new GlideAggregate(config.table);
            filledGr.addQuery('state', config.states.closed);
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

    function analyzeTextQuality() {
        var gr = new GlideRecord(config.table);
        gr.addQuery('state', config.states.closed);
        gr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(' + config.thresholds.maxAge + ')');
        gr.setLimit(config.sampleSize);
        gr.query();
        var descStats = { totalLength: 0, count: 0, tooShort: 0, goodQuality: 0 };
        var closeNotesStats = { totalLength: 0, count: 0, tooShort: 0, goodQuality: 0 };
        var implementationPlanStats = { totalLength: 0, count: 0, tooShort: 0, goodQuality: 0 };
        var testPlanStats = { totalLength: 0, count: 0, tooShort: 0, goodQuality: 0 };
        var backoutPlanStats = { totalLength: 0, count: 0, tooShort: 0, goodQuality: 0 };
        while (gr.next()) {
            var desc = gr.getValue('description') || '';
            if (desc) {
                descStats.count++;
                descStats.totalLength += desc.length;
                if (desc.length < config.thresholds.minDescriptionLength) {
                    descStats.tooShort++;
                } else {
                    descStats.goodQuality++;
                }
            }
            var closeNotes = gr.getValue('close_notes') || '';
            if (closeNotes) {
                closeNotesStats.count++;
                closeNotesStats.totalLength += closeNotes.length;
                if (closeNotes.length < config.thresholds.minCloseNotesLength) {
                    closeNotesStats.tooShort++;
                } else {
                    closeNotesStats.goodQuality++;
                }
            }
            var implementationPlan = gr.getValue('implementation_plan') || '';
            if (implementationPlan) {
                implementationPlanStats.count++;
                implementationPlanStats.totalLength += implementationPlan.length;
                if (implementationPlan.length < config.thresholds.minImplementationPlanLength) {
                    implementationPlanStats.tooShort++;
                } else {
                    implementationPlanStats.goodQuality++;
                }
            }
            var testPlan = gr.getValue('test_plan') || '';
            if (testPlan) {
                testPlanStats.count++;
                testPlanStats.totalLength += testPlan.length;
                if (testPlan.length < config.thresholds.minTestPlanLength) {
                    testPlanStats.tooShort++;
                } else {
                    testPlanStats.goodQuality++;
                }
            }
            var backoutPlan = gr.getValue('backout_plan') || '';
            if (backoutPlan) {
                backoutPlanStats.count++;
                backoutPlanStats.totalLength += backoutPlan.length;
                if (backoutPlan.length < config.thresholds.minBackoutPlanLength) {
                    backoutPlanStats.tooShort++;
                } else {
                    backoutPlanStats.goodQuality++;
                }
            }
        }
        return {
            description: {
                avgLength: descStats.count > 0 ? descStats.totalLength / descStats.count : 0,
                tooShort: descStats.tooShort,
                tooShortPct: descStats.count > 0 ? (descStats.tooShort / descStats.count * 100) : 0,
                goodQuality: descStats.goodQuality,
                goodQualityPct: descStats.count > 0 ? (descStats.goodQuality / descStats.count * 100) : 0
            },
            closeNotes: {
                avgLength: closeNotesStats.count > 0 ? closeNotesStats.totalLength / closeNotesStats.count : 0,
                tooShort: closeNotesStats.tooShort,
                tooShortPct: closeNotesStats.count > 0 ? (closeNotesStats.tooShort / closeNotesStats.count * 100) : 0,
                goodQuality: closeNotesStats.goodQuality,
                goodQualityPct: closeNotesStats.count > 0 ? (closeNotesStats.goodQuality / closeNotesStats.count * 100) : 0
            },
            implementationPlan: {
                avgLength: implementationPlanStats.count > 0 ? implementationPlanStats.totalLength / implementationPlanStats.count : 0,
                tooShort: implementationPlanStats.tooShort,
                tooShortPct: implementationPlanStats.count > 0 ? (implementationPlanStats.tooShort / implementationPlanStats.count * 100) : 0,
                goodQuality: implementationPlanStats.goodQuality,
                goodQualityPct: implementationPlanStats.count > 0 ? (implementationPlanStats.goodQuality / implementationPlanStats.count * 100) : 0
            },
            testPlan: {
                avgLength: testPlanStats.count > 0 ? testPlanStats.totalLength / testPlanStats.count : 0,
                tooShort: testPlanStats.tooShort,
                tooShortPct: testPlanStats.count > 0 ? (testPlanStats.tooShort / testPlanStats.count * 100) : 0,
                goodQuality: testPlanStats.goodQuality,
                goodQualityPct: testPlanStats.count > 0 ? (testPlanStats.goodQuality / testPlanStats.count * 100) : 0
            },
            backoutPlan: {
                avgLength: backoutPlanStats.count > 0 ? backoutPlanStats.totalLength / backoutPlanStats.count : 0,
                tooShort: backoutPlanStats.tooShort,
                tooShortPct: backoutPlanStats.count > 0 ? (backoutPlanStats.tooShort / backoutPlanStats.count * 100) : 0,
                goodQuality: backoutPlanStats.goodQuality,
                goodQualityPct: backoutPlanStats.count > 0 ? (backoutPlanStats.goodQuality / backoutPlanStats.count * 100) : 0
            }
        };
    }

    function analyzeCategoryDistribution() {
        var catGr = new GlideAggregate(config.table);
        catGr.addQuery('state', config.states.closed);
        catGr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(' + config.thresholds.maxAge + ')');
        catGr.groupBy('category');
        catGr.addAggregate('COUNT');
        catGr.orderByAggregate('COUNT');
        catGr.query();
        var categories = [];
        while (catGr.next()) {
            categories.push({
                category: catGr.getValue('category'),
                count: parseInt(catGr.getAggregate('COUNT'))
            });
        }
        categories.sort(function(a, b) { return b.count - a.count; });
        return categories;
    }

    function analyzeResolutionTimes() {
        var gr = new GlideRecord(config.table);
        gr.addQuery('state', config.states.closed);
        gr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(' + config.thresholds.maxAge + ')');
        gr.addNotNullQuery('start_date');
        gr.addNotNullQuery('end_date');
        gr.setLimit(config.sampleSize);
        gr.query();
        var times = [];
        var tooQuick = 0;
        while (gr.next()) {
            var start = new GlideDateTime(gr.getValue('start_date'));
            var end = new GlideDateTime(gr.getValue('end_date'));
            var diff = GlideDateTime.subtract(start, end);
            var minutes = diff.getNumericValue() / 1000 / 60;
            if (minutes > 0) {
                times.push(minutes);
                if (minutes < config.thresholds.minResolutionTime) {
                    tooQuick++;
                }
            }
        }
        times.sort(function(a, b) { return a - b; });
        var avgMinutes = 0;
        if (times.length > 0) {
            var sum = 0;
            for (var t = 0; t < times.length; t++) {
                sum += times[t];
            }
            avgMinutes = sum / times.length;
        }
        var medianMinutes = 0;
        if (times.length > 0) {
            var midIdx = Math.floor(times.length / 2);
            medianMinutes = times[midIdx];
        }
        return {
            avgMinutes: avgMinutes,
            medianMinutes: medianMinutes,
            tooQuick: tooQuick,
            tooQuickPct: times.length > 0 ? (tooQuick / times.length * 100) : 0,
            sampleSize: times.length
        };
    }

    function calculateOverallScore(completeness, textQuality, timeAnalysis) {
        var score = 0;
        var weights = {
            completeness: 40,
            textQuality: 40,
            timeQuality: 20
        };
        var compTotal = 0;
        var compCount = 0;
        for (var field in completeness) {
            compTotal += completeness[field].percentage;
            compCount++;
        }
        var compScore = compCount > 0 ? (compTotal / compCount) : 0;
        score += (compScore / 100) * weights.completeness;
        var textScore = (
            textQuality.description.goodQualityPct +
            textQuality.closeNotes.goodQualityPct +
            textQuality.implementationPlan.goodQualityPct +
            textQuality.testPlan.goodQualityPct +
            textQuality.backoutPlan.goodQualityPct
        ) / 5;
        score += (textScore / 100) * weights.textQuality;
        var timeScore = 100 - timeAnalysis.tooQuickPct;
        score += (timeScore / 100) * weights.timeQuality;
        return score;
    }

   
})();
