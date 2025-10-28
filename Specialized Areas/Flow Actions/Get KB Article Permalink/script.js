(function execute(inputs, outputs) {

    var instanceURL = gs.getProperty('glide.servlet.uri').toString();
    var permalink = instanceURL + 'kb?id=kb_article_view&sysparm_article=' + inputs.kb_number;
    outputs.kb_article_permalink = permalink;
    
})(inputs, outputs);
