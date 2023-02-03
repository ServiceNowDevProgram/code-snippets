# glideAjax-table-column

A Client Callable script include which will query to the table and will return the set of columns. Below is the example of this code.
Client Side Usage Example:

var tableName = 'sys_user';
var user = g_user.userID;
var query = 'sys_id='+user;
var col = 'user_name,email';
var ga = new GlideAjax('getTableColumnsClientSide');
ga.addParam('sysparm_name','getColumnsClient');
ga.addParam('sysparm_tableName',tableName);
ga.addParam('sysparm_encodedQuery',query);
ga.addParam('sysparm_columns',col);
ga.getXML(HelloWorldParse);

function HelloWorldParse(response) {
var answer = response.responseXML.documentElement.getAttribute("answer");
alert(answer);
}
Server Side usage example:

var gr = new getTableColumnsClientSide();
var user = gs.getUserID();
var query = 'sys_id='+user;
var col = 'user_name,email';
gs.print(gr.getColumns('sys_user',query,col));

Benefit: We can share this scripts usage examples with the regional developer, who don't have access to write custom scripts for catalog client script.
