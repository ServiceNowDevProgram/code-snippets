/* Script to check broken/blind/invalid links in the knowledge articles */
// Choose start and end indexes
var indexOffset = 16;
var windowSize = 500;

var startIndex = windowSize * indexOffset;
var endIndex = windowSize * indexOffset + windowSize - 1;

// Define a new GlideRecord object for the Knowledge Article table
var article = new GlideRecord('kb_knowledge');
// Add a query to find all published knowledge articles
article.addQuery('workflow_state', 'published');
article.orderByDesc("number");



// Apply indexes
article.chooseWindow(startIndex, endIndex);
// Execute the query to find the knowledge articles
article.query();

// Iterate through the knowledge articles
var invalidArticles = [];
while (article.next()) {

	// 	Get the article body.  If empty, continue
	var body = article.getValue('text');
	if (!body)
		continue;

	var arrayUtil = new ArrayUtil();
	var regex = /href=(["'])http(.*?)\1/g;

	// 	Obtain a list of all unique links found in the article
	var links = body.match(regex);
	if (!links)
		continue;

	links = arrayUtil.unique(links);

	var articleNum = article.getValue('number');
	var articleSys = article.getUniqueValue();
	var articleOwnerSys = article.getValue("u_knowledge_owner");
	var articleOwner = article.getDisplayValue('u_knowledge_owner');
	var invalid = false;
	var invalidLinks = [];

	// 	Validate each link
	links.forEach(function(l) {
		if (!l)
			return;

		l = l.substring(6, l.length - 1);

		// 	Check if we've already recorded errors for this article. If so, continue
		if (checkLinkAlreadyLogged(articleSys, l))
			return;

		if (l.indexOf('sys_kb_id') != -1) {
			// Link is another knowledge article, determine if article is outdated
			var sysRegex = /sys_kb_id(=|(%3d))([^\s]+)/gi;
			var sysId = l.match(sysRegex)[0].substring(10, 42);

			// 	Check if the referenced knowledge article is unpublished
			var unpublished = new GlideRecord("kb_knowledge");
			unpublished.addQuery("sys_id", sysId);
			unpublished.addQuery("workflow_state", "!=", "published");
			unpublished.query();

			// 	Article is unpublished, log broken link
			if (unpublished.next()) {
				invalid = true;
				var reason = "Contains unpublished knowledge article link";
				if (l.indexOf('sysparm_article') == -1)
					reason += " (without KB Article Number)";
				var il = {
					"link": l,
					"reason": reason
				};
				invalidLinks.push(il);
				addBrokenLinkRecord(articleSys, articleOwnerSys, l, reason, null);
			}
		} else {
			// 	Link is to an external site.  Send a REST Message and log result
			try {
				var request = new sn_ws.RESTMessageV2();
				request.setEndpoint(l);
				request.setHttpMethod('GET');
				var response = request.execute();

				var httpStatus = response.getStatusCode();
				
				// 	HTTP Error returned, log result
				if (httpStatus != 200) {
					invalid = true;
					var reason = "External link returns status code " + httpStatus;
					var il = {
						"link": l,
						"reason": reason
					};
					invalidLinks.push(il);
					addBrokenLinkRecord(articleSys, articleOwnerSys, l, reason, httpStatus);
				}
			} catch(e) {
				// 	Error occurred while attempting to send a REST Message
				// 	Log a result
				addBrokenLinkRecord(articleSys, articleOwnerSys, l, e, null);
			}
		}
	});

	if (invalid) {
		invalidArticles.push({
			number: articleNum,
			owner: articleOwner,
			links: invalidLinks
		});
	}
}

function checkLinkAlreadyLogged(article, link) {
	var gr = new GlideRecord("u_broken_knowledge_links");
	gr.addQuery("u_article", article);
	gr.addQuery("u_link", link);
	gr.query();

	return gr.hasNext();
}

function addBrokenLinkRecord(article, owner, link, reason, httpError) {
	var gr = new GlideRecord("u_broken_knowledge_links");
	gr.initialize();
	gr.u_article = article;
	gr.u_owner = owner;
	gr.u_link = link;
	gr.u_reason = reason;
	gr.u_http_error_code = httpError;
	gr.insert();
}
