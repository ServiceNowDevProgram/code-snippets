(function() {
    /*
	This script will get the 3 characters of page_id from url and suggest valid pages.
     */
    data.pageArr = []; // array to store related pages
    var pageId = $sp.getParameter('id').toString(); // get page id from url
    // get 3 letters of page id
    if (pageId && pageId.length() > 3)
        pageId = pageId.substring(0, 3);

    var relatedPages = new GlideRecord('sp_page');
    relatedPages.addEncodedQuery('idLIKE' + pageId);
    relatedPages.query();
    while (relatedPages.next()) {
        var tempList = {}; // temporary object.
        tempList.name = relatedPages.getValue('title');
        tempList.url = '/' + $sp.getValue('url_suffix') + '?id=' + relatedPages.getValue('id');
        data.pageArr.push(tempList); // add related suggested pages to array
    }
})();
