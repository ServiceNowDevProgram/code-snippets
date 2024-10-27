(function() {
    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */
  
      data.table  = $sp.getParameter("table");
      data.sys_id = $sp.getParameter("sys_id");
  
      var gr = new GlideRecord(data.table);
    gr.get(data.sys_id);
    
      var spUtils = new PortalUtils();
    spUtils.getProcessFlows(data,data.table,(data.sys_id == -1),gr);