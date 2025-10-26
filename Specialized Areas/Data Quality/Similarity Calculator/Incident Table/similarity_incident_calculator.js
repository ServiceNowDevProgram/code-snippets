// ========================================
// Similarity Calculator for ServiceNow Incidents
// ========================================
// Purpose: Manually score similarity between incidents using text analysis
// No ML required
// ========================================

(function similarityCalculator() {
    // --- CONFIG ---
    var config = {
        table: 'incident',
        baseIncidentSysId: '89b325155370f610de0038e0a0490ec5', // Set to the sys_id of the incident to compare
        fields: ['short_description', 'description'],
        maxResults: 50,
        minSimilarity: 0 // Minimum similarity % to report
    };

    // --- Helper: Extract keywords from text ---
    function extractKeywords(text) {
        if (!text) return [];
        // Simple keyword extraction: split, lowercase, remove stopwords
        var stopwords = ['the','and','a','an','to','of','in','for','on','with','at','by','from','is','it','this','that','as','are','was','were','be','has','have','had','but','or','not','can','will','do','does','did','if','so','then','than','too','very','just','also','into','out','up','down','over','under','again','more','less','most','least','such','no','yes','you','your','our','their','my','me','i'];
        var words = text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/);
        var keywords = [];
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (word && stopwords.indexOf(word) === -1 && word.length > 2) {
                keywords.push(word);
            }
        }
        return keywords;
    }

    // --- Helper: Calculate similarity score ---
    function calcSimilarity(keywordsA, keywordsB) {
        if (!keywordsA.length || !keywordsB.length) return 0;
        var mapA = {};
        var mapB = {};
        for (var i = 0; i < keywordsA.length; i++) {
            mapA[keywordsA[i]] = true;
        }
        for (var j = 0; j < keywordsB.length; j++) {
            mapB[keywordsB[j]] = true;
        }
        var intersection = 0;
        var unionMap = {};
        for (var k in mapA) {
            unionMap[k] = true;
            if (mapB[k]) intersection++;
        }
        for (var l in mapB) {
            unionMap[l] = true;
        }
        var union = Object.keys(unionMap).length;
        return union ? (intersection / union * 100) : 0;
    }

    // --- Get base incident ---
    var baseGr = new GlideRecord(config.table);
    if (!baseGr.get(config.baseIncidentSysId)) {
        gs.error('Base incident not found: ' + config.baseIncidentSysId);
        return;
    }
    var baseText = config.fields.map(function(f) { return baseGr.getValue(f); }).join(' ');
    var baseKeywords = extractKeywords(baseText);

    // --- Find candidate incidents ---
    var gr = new GlideRecord(config.table);
    gr.addQuery('active', true);
    gr.addQuery('sys_id', '!=', config.baseIncidentSysId);
    gr.setLimit(config.maxResults);
    gr.query();

    var results = [];
    while (gr.next()) {
        var compareText = config.fields.map(function(f) { return gr.getValue(f); }).join(' ');
        var compareKeywords = extractKeywords(compareText);
        var score = calcSimilarity(baseKeywords, compareKeywords);
        results.push({
            sys_id: gr.getUniqueValue(),
            number: gr.getValue('number'),
            short_description: gr.getValue('short_description'),
            similarity: score
        });
    }

    // --- Sort and print results ---
    results.sort(function(a, b) { return b.similarity - a.similarity; });
    gs.info('=== Similarity Results ===');
    for (var i = 0; i < results.length; i++) {
        var r = results[i];
        gs.info((i+1) + '. ' + r.number + ' (' + r.similarity.toFixed(1) + '%) - ' + r.short_description);
    }
    if (results.length === 0) {
        gs.info('No similar incidents found above threshold.');
    }
})();
