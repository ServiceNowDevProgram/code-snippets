(function process(g_request, g_response, g_processor) {

  // Get the instance name for dynamic generation of URLs
  var instanceName = gs.getProperty("instance_name");
  
  // Enter static/manual URLs here, and the sitemap header
  //   In this example, we're indexing the default service 
  //   portal home and service catalog
  var xmlString = '<?xml version="1.0" encoding="UTF-8"?>';
  xmlString = xmlString + '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
      'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" ' +
      'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
      '<url>' +
      '  <loc>https://' + instanceName + '.service-now.com/sp</loc>\n' +
      '</url>' +
      '<url>' +
      '  <loc>https://' + instanceName + '.service-now.com/sp?id=sc_category</loc>' +
      '</url>';

  // ------ Dynamic URLs -----------------------------------

  // Knowledge Articles - Public KB Articles
  // Encoded query gets all Published articles in the IT Knowlege Base,
  //   and where the Can Read user criteria is Empty (Public).  Tweak the
  //   query to suit your needs.
  var grKK = new GlideRecord('kb_knowledge');

  grKK.addEncodedQuery("kb_knowledge_base=a7e8a78bff0221009b20ffffffffff17^can_read_user_criteriaISEMPTY^workflow_state=published");
  grKK.query();

  while (grKK.next()) {
      xmlString = xmlString +
          '<url>' +
          '  <loc>https://' + instanceName + '.service-now.com/sp?id=kb_article&amp;sys_id=' + grKK.getValue('sys_id') + '</loc>' +
          '  <lastmod>' + grKK.getValue('sys_updated_on').split(' ')[0] + '</lastmod>' +
          '</url>';
  }
  // End Knowledge Articles

  // -- End Dynamic URLs -----------------------------------

  // Close the XML document root tag
  xmlString = xmlString + '</urlset>';

  // Convert the XML string into an XMLDocument
  var xmldoc = new XMLDocument(xmlString);

  // Write the XML document to output in text/xml format
  g_processor.writeOutput("text/xml", xmldoc);

})(g_request, g_response, g_processor);