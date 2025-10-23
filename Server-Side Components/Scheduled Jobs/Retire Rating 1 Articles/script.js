/*
This schedule job will run daily EOD PST time.
This Job will look for articles which have been rated 1 three times and will retire those articles.

*/
var kbFeed = new GlideAggregate('kb_feedback');
kbFeed.addEncodedQuery('rating=1'); // get articles with rating 1.
kbFeed.addAggregate('COUNT', 'article');
kbFeed.groupBy('article');
kbFeed.query();
while (kbFeed.next()) {

    if (kbFeed.getAggregate('COUNT', 'article') >= 3) { // check if article is rated 1 three times
        var updateArt = new GlideRecord('kb_knowledge');
        updateArt.get(kbFeed.article.sys_id);
        if (updateArt.workflow_state == 'published') {   //check if article is published
            updateArt.workflow_state = 'retired';  // retire the article
            updateArt.update();
        }
    }
}
