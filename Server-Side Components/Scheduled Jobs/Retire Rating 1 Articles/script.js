/*
This schedule job will run daily EOD PST time.
This Job will look for articles which have been rated 1 three times and will retire those articles.

*/
var kbFeed = new GlideAggregate('kb_feedback');
kbFeed.addEncodedQuery('rating=1'); // get articles with rating 1.
kbFeed.addAggregate('COUNT', 'article');
kbFeed.groupBy('user');
kbFeed.query();
while (kbFeed.next()) {

    if (kbFeed.getAggregate('COUNT', 'article') >= 3) {
        var updateArt = new GlideRecord('kb_knowledge');
        updateArt.get(kbFeed.article.sys_id);
        if (updateArt.workflow_state == 'published') {
            updateArt.workflow_state = 'retired';
            updateArt.update();
        }
    }
}
