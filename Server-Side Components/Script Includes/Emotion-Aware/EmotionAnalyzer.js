//Scenario: whenever a user submits a ticket (Incident, HR Case, etc.), the system analyzes the tone of the message - like frustrated, urgent, calm, confused 
// and automatically adjusts the ticket priority, or routes it to a specific team (like “Empathy Response Desk)

var EmotionAnalyzer = Class.create();
EmotionAnalyzer.prototype = {
    initialize: function() {},

    detectEmotion: function(text) {
        try {
            // ---- Mock Sentiment Logic (No external API) ----
            text = text.toLowerCase();
            var score = 0;
            var negativeWords = ['angry', 'frustrated', 'bad', 'urgent', 'hate', 'delay'];
            var positiveWords = ['thank', 'happy', 'great', 'awesome', 'love'];
            
            negativeWords.forEach(function(word) {
                if (text.includes(word)) score -= 1;
            });
            positiveWords.forEach(function(word) {
                if (text.includes(word)) score += 1;
            });

            var sentiment = (score > 0) ? 'positive' : (score < 0) ? 'negative' : 'neutral';
            return { sentiment: sentiment, score: Math.abs(score / 3) };
        } catch (e) {
            gs.error("EmotionAnalyzer error: " + e.message);
            return { sentiment: 'neutral', score: 0 };
        }
    },

    type: 'EmotionAnalyzer'
};
