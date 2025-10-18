var SentimentAnalyzer = Class.create();
SentimentAnalyzer.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    getSentiment: function() {
        var text = (this.getParameter('sysparm_text') || '').toLowerCase();
        var positive = ['thanks', 'great', 'resolved', 'appreciate'];
        var negative = ['issue', 'error', 'not working', 'fail', 'problem'];

        var score = 0;
        positive.forEach(function(word) { if (text.includes(word)) score++; });
        negative.forEach(function(word) { if (text.includes(word)) score--; });

        if (score > 0) return 'Positive';
        if (score < 0) return 'Negative';
        return 'Neutral';
    }
});
