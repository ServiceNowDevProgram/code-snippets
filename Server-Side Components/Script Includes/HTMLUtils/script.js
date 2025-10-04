var HTMLUtils = Class.create();
GlideRecordHelper.prototype = Object.extendsObject(AbstractAjaxProcessor, {	
    
    /**SNDOC
	 @name createHTMLTable
	 @description Base method that creates an HTML Table from an object
	 @param  {String} [title] - Title above table
	 @param  {Object} [table] - Object with headers attribute and row multi dimension array
	 @returns {String} HTML Table
	 @example
	 var table = {
		header:['col1','col2'],
		rows:[['row1col1','row1col2'],
			  ['row2col1','row2col2']]
	 }

	 var hU = new HTMLUtils();
	 hU.createHTMLTable("Test",table);
	*/
	createHTMLTable: function(title,table){
		var html = "<p style='margin: 10px 0px 10px;'><b>"+title+"</b></p><table class='template_TBL table'><tbody>";
		html += "<tr>";
		table.header.forEach(function(h){html +="<td>"+h+"</td>";});
		html +="</tr>";
		table.rows.forEach(function(row){
			html += "<tr>";
			row.forEach(function(r){
				html += "<td>"+r+"</td>";
			});
			html += "</tr>";
		});
		html += "</tbody></table>";

		return html;
	},

    type: 'HTMLUtils'
});