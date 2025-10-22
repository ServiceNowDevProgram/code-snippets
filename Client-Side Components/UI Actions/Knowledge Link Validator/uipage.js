<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide">
    <j:set var="jvar_article_id" value="${sysparm_article_id}" />
    <g:evaluate jelly="true">
        <![CDATA[
      var articleId = trim(jelly.sysparm_article_id);
      var activeIds = [];
      var inactiveIds = [];
      var notFoundIds = [];
      var outdatedArticles = [];
      var badPermalinks = [];
  var inActiveCount =0;
  var activeCount = 0;
  var notFoundCount =0;
  var outdatedCount =0;
  var badPermalinkCount =0;
  var inactiveQuery;
  var activeQuery;
  var notFoundQuery;
  var outdatedQuery;
  var badPermalinkQuery;
      if (articleId) {
          var grArticle = new GlideRecord('kb_knowledge');
          if (grArticle.get(articleId)) {
              var content = (grArticle.text || '').toString();
              // Extract hrefs from <a> tags
              var regex = /<a[^>]+href=["']([^"']+)["']/gi;
              var urls = [];
              var match;
              while ((match = regex.exec(content)) !== null) {
				
                  urls.push(match[1]);
              }
              for (var i = 0; i < urls.length; i++) {
                  var url = urls[i];
				
  // --- 1. Check if link is a Catalog Item ---
                  var sysId = extractSysId(url, 'sysparm_id') || extractSysId(url, 'sys_id');
                  if (sysId) {
                      var grItem = new GlideRecord('sc_cat_item');
                      if (grItem.get(sysId)) {
                          if (grItem.active){
                              activeIds.push(sysId);
  activeCount++;
  }
                          else if(grItem.active == false){
                              inactiveIds.push(sysId);
  inActiveCount++;
  }
                      } else {
                          notFoundIds.push(sysId);
  notFoundCount++;
                      }
                  }
  // --- 2. Check if link is a Knowledge Article ---
 // --- 1. Check for outdated knowledge articles via permalink ---

// --- 1. Check for outdated knowledge articles via permalink ---
var decodedUrl = decodeURIComponent(url + '');
decodedUrl = decodedUrl.replace(/&amp;amp;amp;amp;/g, '&');

// Extract KB number or sys_id
var kbNumber = extractSysId(decodedUrl, 'sysparm_article');
var kbSysId = extractSysId(decodedUrl, 'sys_kb_id') || extractSysId(decodedUrl, 'sys_id');

var grKb = new GlideRecord('kb_knowledge');

if (kbNumber && grKb.get('number', kbNumber)) {
    var isOutdated = false;
    if (grKb.workflow_state != 'published') {
        isOutdated = true;
    } else if (grKb.valid_to && grKb.valid_to.getGlideObject()) {
        var now = new GlideDateTime();
        if (grKb.valid_to.getGlideObject().compareTo(now) <= 0) {
            isOutdated = true;
        }
    }

    if (isOutdated) {
        outdatedArticles.push(grKb.sys_id.toString());
        outdatedCount++;
    }
} else if (kbSysId && grKb.get(kbSysId)) {
    var isOutdated = false;
    if (grKb.workflow_state != 'published') {
        isOutdated = true;
    } else if (grKb.valid_to && grKb.valid_to.getGlideObject()) {
        var now = new GlideDateTime();
        if (grKb.valid_to.getGlideObject().compareTo(now) <= 0) {
            isOutdated = true;
        }
    }

    if (isOutdated) {
        outdatedArticles.push(grKb.sys_id.toString());
        outdatedCount++;
    }
}

// --- 2. Check for non-permalink knowledge links ---
if (
    decodedUrl.indexOf('kb_knowledge.do?sys_id=') !== -1 || // form view
    (
        decodedUrl.indexOf('/kb_view.do') !== -1 && 
        decodedUrl.indexOf('sysparm_article=KB') === -1 // missing KB number
    )
) {
    var kbSysId = extractSysId(decodedUrl, 'sys_kb_id') || extractSysId(decodedUrl, 'sys_id');
    if (kbSysId) {
        var grBadKB = new GlideRecord('kb_knowledge');
        if (grBadKB.get(kbSysId)) {
            badPermalinks.push(kbSysId);
            badPermalinkCount++;
        }
    }
}
              }
          }
      }
 function extractSysId(url, param) {
    try {
        var decoded = decodeURIComponent(url + '');
        decoded = decoded
            .replace(/&amp;amp;amp;/g, '&')
            .replace(/&amp;amp;/g, '&')
            .replace(/&amp;/g, '&')
            .replace(/&#61;/g, '=')
            .replace(/&amp;#61;/g, '=');

        var parts = decoded.split(param + '=');
        if (parts.length > 1) {
            var id = parts[1].split('&')[0];
            return id && id.length === 32 ? id : null;
        }
    } catch (e) {
        var parts = url.split(param + '=');
        if (parts.length > 1) {
            var id = parts[1].split('&')[0];
            return id && id.length === 32 ? id : null;
        }
    }
    return null;
}
      // Expose variables to Jelly
inactiveQuery = "sys_idIN"+inactiveIds.join(',');
activeQuery = "sys_idIN"+activeIds.join(',');
notFoundQuery = "sys_idIN"+notFoundIds.join(',');
outdatedQuery = "sys_idIN"+outdatedArticles.join(',');
badPermalinkQuery = "sys_idIN"+badPermalinks.join(',');
  ]]>
    </g:evaluate>
    <table width="600px" border="1" style="border-collapse:collapse;">
        <tr style="font-weight:bold; background-color:#f2f2f2;">
            <td>Module</td>
            <td>Records</td>
            <td>Details</td>
        </tr>
        <tr class="breadcrumb">
            <td>Active Catalog Items</td>
            <td>${activeCount}</td>
            <td>
                <a href="sc_cat_item_list.do?sysparm_query=${activeQuery}" target="_blank">View records</a>
            </td>
        </tr>
        <tr class="breadcrumb">
            <td>Inactive Catalog Items</td>
            <td>${inActiveCount}</td>
            <td>
                <a href="sc_cat_item_list.do?sysparm_query=${inactiveQuery}" target="_blank">View records</a>
            </td>
        </tr>
        <tr class="breadcrumb">
            <td>Not Found Items</td>
            <td>${notFoundCount}</td>
            <td>
                <a href="sc_cat_item_list.do?sysparm_query=${notFoundQuery}" target="_blank">View records</a>
            </td>
        </tr>
        <tr class="breadcrumb">
            <td>Outdated Knowledge Articles</td>
            <td>${outdatedCount}</td>
            <td>
                <a href="kb_knowledge_list.do?sysparm_query=${outdatedQuery}" target="_blank">View records</a>
            </td>
        </tr>
        <tr class="breadcrumb">
            <td>Non-Permalink Knowledge Links</td>
            <td>${badPermalinkCount}</td>
            <td>
                <a href="kb_knowledge_list.do?sysparm_query=${badPermalinkQuery}" target="_blank">View records</a>
            </td>
        </tr>
    </table>
</j:jelly>
