(function executeRule(current, previous /*null when async*/ ) {
    var test_kb_manager;
    var test_arr_kb_manager;
    if (active == false) {  // This will check if user is inactive.
        var kb_gr = new GlideRecord("kb_knowledge");
        kb_gr.addEncodedQuery("author=" + current.sys_id);  // This will query the knowledge article.
        kb_gr.query();
        while (kb_gr.next()) {
            if (test_kb_manager != "") {
                test_kb_manager = kb_gr.kb_knowledge_base.kb_manager;
                test_arr_kb_manage = test_kb_manager.split(",");  // This will seperate the list of manager by (,).
                kb_gr.author = test_arr_kb_manager[0];  // This will assign the article author to knowledge manager.
                kb_gr.update();

            }
        }
    }

})(current, previous);
