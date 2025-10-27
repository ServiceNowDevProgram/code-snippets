(function analyzeProblemDataQuality() {
    var config = {
        table: 'problem',
        keyFields: [
            'short_description',
            'description', 
            'category',
            'assignment_group',
            'close_notes',
            'state'
        ],
        thresholds: {
            minDescriptionLength: 20,
            minCloseNotesLength: 50,
            minResolutionTime: 5,
            maxAge: 365,
            targetCompleteness: 80
        },
        states: {
            // Try multiple possible closed state values
            closedStates: ['3', '4', '9', '10'] // Common closed/resolved states
        },
        sampleSize: 500
    };

    gs.info('========================================');
    gs.info('PI Training Data Quality Analysis (Problem)');
    gs.info('========================================');

    // identify what closed states we have
    var actualClosedStates = identifyClosedStates();
    if (actualClosedStates.length === 0) {
        gs.warn('⚠️ No closed states identified. Using all records for analysis.');
        config.useAllRecords = true;
    } else {
        gs.info('Using closed states: ' + actualClosedStates.join(', '));
        config.states.closedStates = actualClosedStates;
    }

    // Get overall statistics
    var stats = getOverallStats(config);
    gs.info('');
    gs.info('=== STEP 1: Overall Statistics ===');
    gs.info('Total Problems: ' + stats.total);
    gs.info('Closed Problems: ' + stats.closed);
    gs.info('Recent 90 Days: ' + stats.recent90);
    gs.info('Recent 365 Days: ' + stats.recent365);
    gs.info('');

    if (stats.closed < 50) {
        gs.warn('⚠️ Low number of closed problems - need at least 50 for training');
        gs.info('Current: ' + stats.closed);
    } else {
        gs.info('✅ Sufficient closed problems for training');
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

    // Text quality analysis
    gs.info('');
    gs.info('=== STEP 3: Text Quality Analysis ===');
    var textQuality = analyzeTextQuality(config);
    gs.info('Description Quality: Avg ' + textQuality.description.avgLength.toFixed(0) + 
            ' chars, ' + textQuality.description.goodQualityPct.toFixed(1) + '% good quality');
    gs.info('Close Notes Quality: Avg ' + textQuality.closeNotes.avgLength.toFixed(0) + 
            ' chars, ' + textQuality.closeNotes.goodQualityPct.toFixed(1) + '% good quality');

    // Category distribution
    gs.info('');
    gs.info('=== STEP 4: Category Distribution ===');
    var categoryDist = analyzeCategoryDistribution(config);
    gs.info('Categories found: ' + categoryDist.length);
    for (var i = 0; i < Math.min(5, categoryDist.length); i++) {
        var cat = categoryDist[i];
        gs.info('  ' + (cat.category || '(empty)') + ': ' + cat.count);
    }

    // Overall score
    var overallScore = calculateOverallScore(completeness, textQuality, {tooQuickPct: 15});
    gs.info('');
    gs.info('=== OVERALL QUALITY SCORE ===');
    gs.info('Score: ' + overallScore.toFixed(0) + '/100');

    gs.info('');
    gs.info('========================================');
    gs.info('Analysis Complete');
    gs.info('========================================');

    // Helper functions
    function identifyClosedStates() {
        var stateGr = new GlideAggregate('problem');
        stateGr.groupBy('state');
        stateGr.addAggregate('COUNT');
        stateGr.query();
        
        var states = [];
        var stateInfo = [];
        
        while (stateGr.next()) {
            var state = stateGr.getValue('state');
            var count = stateGr.getAggregate('COUNT');
            stateInfo.push({state: state, count: parseInt(count)});
        }
        
        // Look for states that might be "closed" - typically higher numbers with reasonable counts
        for (var i = 0; i < stateInfo.length; i++) {
            var info = stateInfo[i];
            // Include states that are likely closed (3, 4, 9, 10) or have significant counts
            if (['3', '4', '9', '10'].indexOf(info.state) >= 0 || info.count > 10) {
                states.push(info.state);
                gs.info('Including state ' + info.state + ' (' + info.count + ' records)');
            }
        }
        
        return states;
    }

    function getOverallStats(config) {
        var result = {total: 0, closed: 0, recent90: 0, recent365: 0};
        
        // Total
        var totalGr = new GlideAggregate('problem');
        totalGr.addAggregate('COUNT');
        totalGr.query();
        if (totalGr.next()) {
            result.total = parseInt(totalGr.getAggregate('COUNT'));
        }
        
        // Closed (use identified states or all if none found)
        if (!config.useAllRecords && config.states.closedStates.length > 0) {
            var closedGr = new GlideAggregate('problem');
            closedGr.addQuery('state', 'IN', config.states.closedStates.join(','));
            closedGr.addAggregate('COUNT');
            closedGr.query();
            if (closedGr.next()) {
                result.closed = parseInt(closedGr.getAggregate('COUNT'));
            }
        } else {
            result.closed = result.total; // Use all records if no closed states identified
        }
        
        // Recent counts - use broader criteria
        var recent365Gr = new GlideAggregate('problem');
        recent365Gr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(365)');
        recent365Gr.addAggregate('COUNT');
        recent365Gr.query();
        if (recent365Gr.next()) {
            result.recent365 = parseInt(recent365Gr.getAggregate('COUNT'));
        }
        
        var recent90Gr = new GlideAggregate('problem');
        recent90Gr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(90)');
        recent90Gr.addAggregate('COUNT');
        recent90Gr.query();
        if (recent90Gr.next()) {
            result.recent90 = parseInt(recent90Gr.getAggregate('COUNT'));
        }
        
        return result;
    }

    function analyzeFieldCompleteness(config) {
        var results = {};
        
        // Get total count - use more inclusive criteria
        var totalGr = new GlideAggregate('problem');
        if (!config.useAllRecords && config.states.closedStates.length > 0) {
            totalGr.addQuery('state', 'IN', config.states.closedStates.join(','));
        }
        totalGr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(' + config.thresholds.maxAge + ')');
        totalGr.addAggregate('COUNT');
        totalGr.query();
        
        var total = 0;
        if (totalGr.next()) {
            total = parseInt(totalGr.getAggregate('COUNT'));
        }
        
        gs.info('Analyzing ' + total + ' records for field completeness...');
        
        for (var f = 0; f < config.keyFields.length; f++) {
            var fieldName = config.keyFields[f];
            var testGr = new GlideRecord('problem');
            if (!testGr.isValidField(fieldName)) {
                gs.warn('Field ' + fieldName + ' not found, skipping');
                continue;
            }
            
            var filledGr = new GlideAggregate('problem');
            if (!config.useAllRecords && config.states.closedStates.length > 0) {
                filledGr.addQuery('state', 'IN', config.states.closedStates.join(','));
            }
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

    function analyzeTextQuality(config) {
        var gr = new GlideRecord('problem');
        if (!config.useAllRecords && config.states.closedStates.length > 0) {
            gr.addQuery('state', 'IN', config.states.closedStates.join(','));
        }
        gr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(' + config.thresholds.maxAge + ')');
        gr.setLimit(config.sampleSize);
        gr.query();

        var descStats = {totalLength: 0, count: 0, tooShort: 0, goodQuality: 0};
        var closeNotesStats = {totalLength: 0, count: 0, tooShort: 0, goodQuality: 0};

        while (gr.next()) {
            // Description analysis
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

            // Close notes analysis
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
                goodQualityPct: descStats.count > 0 ? (descStats.goodQuality / descStats.count * 100) : 0
            },
            closeNotes: {
                avgLength: closeNotesStats.count > 0 ? closeNotesStats.totalLength / closeNotesStats.count : 0,
                goodQualityPct: closeNotesStats.count > 0 ? (closeNotesStats.goodQuality / closeNotesStats.count * 100) : 0
            }
        };
    }

    function analyzeCategoryDistribution(config) {
        var catGr = new GlideAggregate('problem');
        if (!config.useAllRecords && config.states.closedStates.length > 0) {
            catGr.addQuery('state', 'IN', config.states.closedStates.join(','));
        }
        catGr.addQuery('sys_created_on', '>=', 'javascript:gs.daysAgoStart(' + config.thresholds.maxAge + ')');
        catGr.groupBy('category');
        catGr.addAggregate('COUNT');
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

    function calculateOverallScore(completeness, textQuality, timeAnalysis) {
        var score = 0;
        var weights = {completeness: 40, textQuality: 40, timeQuality: 20};

        // Completeness score
        var compTotal = 0, compCount = 0;
        for (var field in completeness) {
            compTotal += completeness[field].percentage;
            compCount++;
        }
        var compScore = compCount > 0 ? (compTotal / compCount) : 0;
        score += (compScore / 100) * weights.completeness;

        // Text quality score
        var textScore = (textQuality.description.goodQualityPct + textQuality.closeNotes.goodQualityPct) / 2;
        score += (textScore / 100) * weights.textQuality;

        // Time quality score
        var timeScore = 100 - timeAnalysis.tooQuickPct;
        score += (timeScore / 100) * weights.timeQuality;

        return score;
    }

})();