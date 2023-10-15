var gl= GlideTransaction.get().getRemoteAddr();
gs.addInfoMessage('IP Address:'+gl);
var gl1=GlideServlet.getSystemID();
gs.addInfoMessage('Node ID:'+gl1);
var env = gs.getProperty("instance_name");
gs.info(env);
