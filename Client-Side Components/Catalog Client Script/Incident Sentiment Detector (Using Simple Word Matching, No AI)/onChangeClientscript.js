function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || !newValue) return;

    var ga = new GlideAjax('SentimentAnalyzer');
    ga.addParam('sysparm_name', 'getSentiment');
    ga.addParam('sysparm_text', newValue);
    ga.getXMLAnswer(function(sentiment) {
        g_form.addInfoMessage('Sentiment: ' + sentiment);
        g_form.setValue('u_sentiment', sentiment);
    });
}
