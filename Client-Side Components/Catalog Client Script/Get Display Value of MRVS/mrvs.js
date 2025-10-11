
var script = new global.VariableUtil();
var gr = new GlideRecord("sc_req_item");
gr.addEncodedQuery("sys_id=<Copy & Paste RITM Sys ID>");
gr.query();
if (gr.next()) {
    gs.info(script.getDisplayValue('<MRVS Variableset SYSID>', gr.variables.MRVSName)); //MRVS Display Value
}
