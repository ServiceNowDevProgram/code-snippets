var deleteAll = false;
/**
 * Delete or Ignore all email sitting in the outbox
 * Useful when enabling email in sub-prd and
 * not wanting to get spammed with unsent email
 */
var gr = new GlideRecord("sys_email");
gr.addQuery("mailbox", "outbox");
gr.addQuery("type", "send-ready");
if (deleteAll) gr.deleteMultiple();
else {
  gr.query();
  gs.print("Found " + gr.getRowCount() + " emails in outbox.");
  while (gr.next()) {
    gr.type = "send-ignored";
    gr.update();
  }
}
