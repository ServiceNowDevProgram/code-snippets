(function runMailScript(
  /* GlideRecord */ current,
  /* TemplatePrinter */ template,
  /* Optional EmailOutbound */
  email,
  /* Optional GlideRecord */ email_action,
  /* Optional GlideRecord */
  event
) {
  // Add your code here

  template.print("<style>td, th {text-align: left;padding: 8px;}</style>");
  template.print(
    "<table style=' font-family: arial, sans-serif;width:90%;margin-left:.5in; border-collapse:collapse;border:none' >"
  );
  template.print("<tr style='background-color: #3DCD58;'>");
  template.print(
    "<th style='color: #ffffff'>SKU</th><th style='color: #ffffff'>SKU Description</th><th style='color: #ffffff'>License Serial Number</th>"
  );
  template.print("</tr>");

  var gr = new GlideRecord("example_table");
  gr.addQuery("example_query");
  gr.query();
  while (gr.next()) {
    template.print("<tr>");
    template.print("<td>" + gr.model.name + "</td>");
    template.print("<td>" + gr.model.short_description + "</td>");
    template.print("<td>" + gr.serial_number + "</td>");
    template.print("</tr>");
  }

  template.print("</table>");
})(current, template, email, email_action, event);
