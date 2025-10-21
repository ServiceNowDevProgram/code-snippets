(function() {
  var table = 'incident'; //can be used for other tickets as well
  var sourceSysId = 'f4755b82c3203210348bbd33e40131cb'; // sys_id of the ticket which is used to find similar tickets
  var limit = 10; // top N results
  var minScore = 0.05;

  function tokensFromText(text) {
    if (!text) return [];
    text = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
    var raw = text.split(/\s+/);
    var stop = {
      'the':1,'and':1,'for':1,'with':1,'that':1,'this':1,'from':1,'have':1,'has':1,'was':1,'were':1,
      'a':1,'an':1,'is':1,'in':1,'on':1,'of':1,'to':1,'it':1,'as':1,'by':1,'be':1,'are':1
    };
    var map = {};
    for (var i=0;i<raw.length;i++) {
      var t = raw[i].trim();
      if (!t || t.length<3 || stop[t]) continue; // skip very short tokens
      t = t.replace(/(ing|ed|s)$/,'');
      map[t] = (map[t]||0)+1;
    }
    return Object.keys(map);
  }

  function jaccardScore(tokensA, tokensB) {
    var setA={}, setB={};
    tokensA.forEach(function(t){setA[t]=1;});
    tokensB.forEach(function(t){setB[t]=1;});
    var inter=0, uni=0;
    for (var t in setA){ if(setB[t]) inter++; uni++; }
    for (var t2 in setB){ if(!setA[t2]) uni++; }
    return uni===0 ? 0 : inter/uni;
  }

  // Get source record
  var src = new GlideRecord(table);
  if (!src.get(sourceSysId)) {
    gs.error("Source record not found");
    return;
  }

  var sourceText = [src.short_description, src.description].join(" ");
  var sourceTokens = tokensFromText(sourceText);
  if (sourceTokens.length === 0) {
    gs.print("No meaningful text to compare");
    return;
  }

  // Find candidate incidents
  var gr = new GlideRecord(table);
  gr.addActiveQuery();
  gr.addQuery('sys_id','!=',sourceSysId);
  gr.setLimit(300);
  gr.query();

  var results = [];
  while (gr.next()) {
    var candidateText = [gr.short_description, gr.description].join(" ");
    var candidateTokens = tokensFromText(candidateText);
    var score = jaccardScore(sourceTokens, candidateTokens);

    if (src.category == gr.category) score += 0.05;
    if (src.assignment_group == gr.assignment_group) score += 0.03;

    if (score >= minScore) {
      results.push({
        number: gr.number.toString(),
        short_description: gr.short_description.toString(),
        score: parseFloat(score.toFixed(3))
      });
    }
  }

  results.sort(function(a,b){return b.score - a.score;});

  // Print top results
  gs.print("=== Similar Tickets to: " + src.number + " ===");
  results.slice(0, limit).forEach(function(r) {
    gs.print(r.number + " | Score: " + r.score + " | " + r.caller_id + " | " + r.short_description);
  });

})();
