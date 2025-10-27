// ========================================
// PI Training Data Quality Analyzer
// ========================================
// Purpose: Analyze incident data quality for Predictive Intelligence training
// Use Case: Identify data quality issues before training ML models
// No Training Required: Analyzes existing data without ML
// ========================================

// ========================================
// PI Training Data Quality Analyzer (Simplified)
// ========================================
// Purpose: Analyze incident data quality for Predictive Intelligence training
// Use Case: Identify data quality issues before training ML models
// No Training Required: Analyzes existing data without ML
// ========================================

(function analyzeTrainingDataQuality() {
    // Print all fields that exist on the incident table and its parents (simplified)
    function printAllFields(tableName) {
        var gr = new GlideRecord(tableName);
        var elements = gr.getElements();
        gs.info('Fields for table: ' + tableName);
        for (var i = 0; i < elements.size(); i++) {
            gs.info(elements.get(i).getName());
        }
    }
    // printAllFields('incident');

    // Helper: check if field exists in table hierarchy (simplified)
    function fieldExists(tableName, fieldName) {
        var gr = new GlideRecord(tableName);
        return gr.isValidField(fieldName);
    }

    // Print table ancestors (if SNC.TableEditor available)
    if (typeof SNC !== 'undefined' && SNC.TableEditor && SNC.TableEditor.getTableAncestors) {
        gs.info('Ancestors of incident: ' + SNC.TableEditor.getTableAncestors('incident'));
    }
    
    // ============================================
    // CONFIGURATION
    // ============================================
    var config = {
        table: 'incident',
        
        // Fields to analyze for completeness
        keyFields: [
            'short_description',
            'description',
            'category',
            'subcategory',
            'close_notes',
            'assignment_group'
        ],
        
        // Quality thresholds
        thresholds: {
            minDescriptionLength: 20,      // Characters
            minCloseNotesLength: 50,       // Characters
            minResolutionTime: 5,          // Minutes
            maxAge: 365,                   // Days - only analyze recent data
            targetCompleteness: 80         // Percent of fields filled
        },
        
        // States to analyze
        states: {
            resolved: 6,
            closed: 7
        },
        
        sampleSize: 500  // Max records to analyze in detail
    };
    
    gs.info('========================================');
    gs.info('PI Training Data Quality Analysis');
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
    
    gs.info('Total Incidents:');
    gs.info('  All States: ' + stats.total);
    gs.info('  Resolved/Closed: ' + stats.resolved);
    gs.info('  Last 90 Days: ' + stats.recent90);
    gs.info('  Last 365 Days: ' + stats.recent365);
    gs.info('');
    
    if (stats.resolved < 50) {
        gs.warn('⚠️ Low number of resolved incidents - need at least 50 for training');
        gs.info('Current: ' + stats.resolved);
    } else {
        gs.info('✅ Sufficient resolved incidents for training');
    }
    
    // ============================================
    // STEP 2: Field Completeness Analysis
    // ============================================
    gs.info('');
    gs.info('=== STEP 2: Field Completeness Analysis ===');
    gs.info('Analyzing resolved/closed incidents from last ' + config.thresholds.maxAge + ' days');
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
    
    if (textQuality.description.goodQualityPct < 70) {
        gs.warn('⚠️ Many incidents have short/poor descriptions');
        gs.info('   Consider filtering for better quality data');
    }
    
    if (textQuality.closeNotes.goodQualityPct < 70) {
        gs.warn('⚠️ Many incidents have short/poor close notes');
        gs.info('   This will impact solution recommendation quality');
    }
    
    // ============================================
    // STEP 4: Category Distribution
    // ============================================
    gs.info('');
    gs.info('=== STEP 4: Category Distribution ===');
    gs.info('Analyzing incident category spread');
    gs.info('');
    
    var categoryDist = analyzeCategoryDistribution();
    
    gs.info('Top 10 Categories:');
    for (var i = 0; i < Math.min(10, categoryDist.length); i++) {
        var cat = categoryDist[i];
        gs.info('  ' + (i+1) + '. ' + (cat.category || '(empty)') + ': ' + cat.count + ' incidents');
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
    gs.info('  Too Quick (<5 min): ' + timeAnalysis.tooQuick + ' (' + 
            (timeAnalysis.tooQuickPct).toFixed(1) + '%)');
    gs.info('');
    
    if (timeAnalysis.tooQuickPct > 30) {
        gs.warn('⚠️ Many incidents resolved very quickly');
        gs.info('   These may be duplicates or low-quality data');
        gs.info('   Consider filtering: resolved_at > opened_at + 5 minutes');
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
            resolved: 0,
            recent90: 0,
            recent365: 0
        };
        
        // Total incidents
        var totalGr = new GlideAggregate(config.table);
        totalGr.addAggregate('COUNT');
        totalGr.query();
        if (totalGr.next()) {
            result.total = parseInt(totalGr.getAggregate('COUNT'));
        }
        
        // Resolved/closed
        var resolvedGr = new GlideAggregate(config.table);
        resolvedGr.addQuery('state', 'IN', [config.states.resolved, config.states.closed].join(','));
        resolvedGr.addAggregate('COUNT');
        resolvedGr.query();
        if (resolvedGr.next()) {
            result.resolved = parseInt(resolvedGr.getAggregate('COUNT'));
        }
        
        // Recent 90 days
        var recent90Gr = new GlideAggregate(config.table);
        recent90Gr.addQuery('state', 'IN', [config.states.resolved, config.states.closed].join(','));
        recent90Gr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(90)');
        recent90Gr.addAggregate('COUNT');
        recent90Gr.query();
        if (recent90Gr.next()) {
            result.recent90 = parseInt(recent90Gr.getAggregate('COUNT'));
        }
        
        // Recent 365 days
        var recent365Gr = new GlideAggregate(config.table);
        recent365Gr.addQuery('state', 'IN', [config.states.resolved, config.states.closed].join(','));
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
        
        // Get total count first
        var totalGr = new GlideAggregate(config.table);
        totalGr.addQuery('state', 'IN', [config.states.resolved, config.states.closed].join(','));
        totalGr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(' + config.thresholds.maxAge + ')');
        totalGr.addAggregate('COUNT');
        totalGr.query();
        
        var total = 0;
        if (totalGr.next()) {
            total = parseInt(totalGr.getAggregate('COUNT'));
        }
        
        // ...existing code...

        // Check each field, skip if not present
        for (var f = 0; f < config.keyFields.length; f++) {
            var fieldName = config.keyFields[f];
            if (!fieldExists(config.table, fieldName)) {
                gs.warn('Field does not exist: ' + fieldName + ' - skipping completeness analysis for this field');
                continue;
            }
            var filledGr = new GlideAggregate(config.table);
            filledGr.addQuery('state', 'IN', [config.states.resolved, config.states.closed].join(','));
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
        gr.addQuery('state', 'IN', [config.states.resolved, config.states.closed].join(','));
        gr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(' + config.thresholds.maxAge + ')');
        gr.setLimit(config.sampleSize);
        gr.query();
        
        var descStats = {
            totalLength: 0,
            count: 0,
            tooShort: 0,
            goodQuality: 0
        };
        
        var closeNotesStats = {
            totalLength: 0,
            count: 0,
            tooShort: 0,
            goodQuality: 0
        };
        
        while (gr.next()) {
            // Analyze description
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
            
            // Analyze close notes
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
            }
        };
    }
    
    function analyzeCategoryDistribution() {
        var catGr = new GlideAggregate(config.table);
        catGr.addQuery('state', 'IN', [config.states.resolved, config.states.closed].join(','));
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
        
        // Sort descending
        categories.sort(function(a, b) { return b.count - a.count; });
        
        return categories;
    }
    
    function analyzeResolutionTimes() {
        var gr = new GlideRecord(config.table);
        gr.addQuery('state', 'IN', [config.states.resolved, config.states.closed].join(','));
        gr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(' + config.thresholds.maxAge + ')');
        gr.addNotNullQuery('opened_at');
        gr.addNotNullQuery('resolved_at');
        gr.setLimit(config.sampleSize);
        gr.query();
        
        var times = [];
        var tooQuick = 0;
        
        while (gr.next()) {
            var opened = new GlideDateTime(gr.getValue('opened_at'));
            var resolved = new GlideDateTime(gr.getValue('resolved_at'));
            
            var diff = GlideDateTime.subtract(opened, resolved);
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
        
        // Completeness score (average of all fields)
        var compTotal = 0;
        var compCount = 0;
        for (var field in completeness) {
            compTotal += completeness[field].percentage;
            compCount++;
        }
        var compScore = compCount > 0 ? (compTotal / compCount) : 0;
        score += (compScore / 100) * weights.completeness;
        
        // Text quality score (average of description and close notes)
        var textScore = (textQuality.description.goodQualityPct + textQuality.closeNotes.goodQualityPct) / 2;
        score += (textScore / 100) * weights.textQuality;
        
        // Time quality score (inverse of too-quick percentage)
        var timeScore = 100 - timeAnalysis.tooQuickPct;
        score += (timeScore / 100) * weights.timeQuality;
        
        return score;
    }
    
    
    
})();