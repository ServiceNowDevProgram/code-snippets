/**
 * Help to make a tiny url in code. For example, lets say you are creating a custom link
 * to a long list of sys_idINa,b,c,etc and want the link to make the link look like this:
 * https://<instance>.service-now.com/some_table_list.do?sysparm_tiny=3a2bbf87dbdc8890e670d48a489619bf
 * Use this script include to do that, like this:
 * var myTable = 'some_table_list';
 * var myLongQueryStr = 'sysparm_query=sys_idIN' + encodeURIComponent('pretend,long,list,of,sys_id');
 * var myCustomUrl = new TinyUrlHelper().getSert(table=myTable, queryStr=myLongQueryStr);
 *
 * NOTES:
 *    * if gs.getProperty('glide.use_tiny_urls') is false, then returns long url
 *    * The long url lenghth must be >= to gs.getProperty('glide.tiny_url_min_length', '1024')
 *        else, longUrl is returned
 */
var TinyUrlHelper = Class.create();
TinyUrlHelper.prototype = {
	initialize: function() {
		this.tinyEnabled = (gs.getProperty('glide.use_tiny_urls', 'false') == 'true');
		this.minLength = Number(gs.getProperty('glide.tiny_url_min_length', '1024'));
		this.instanceName = gs.getProperty('instance_name');
	},

	/*
	 * Return the corresponding tiny url, if it already exists, else Insert a new tiny url and return it
	 * NOTES:
	 *    * if gs.getProperty('glide.use_tiny_urls') is false, then returns long url
	 *    * The long url lenghth must be >= to gs.getProperty('glide.tiny_url_min_length', '1024')
	 *        else, longUrl is returned
	 *
	 * @param {string} table, the table part of the query. If you mean list view, append _list
	 * @param {string} queryStr, the query string part of the long url
     * @return {string} the tinyUrl or the longUrl, depending, see NOTES above
	*/
	getSert: function(table, queryStr) {
		var tinyHash, longUrl, grSysTinyUrl, tinyUrl;
		gs.debug('TinyUrlHelper.getSert:: table=' + table + ', queryStr=' + queryStr);
		longUrl = 'https://' + this.instanceName + '.service-now.com/' + table + '.do?' + queryStr;
		if (!this.tinyEnabled || longUrl.length < this.minLength) {
			gs.debug('TinyUrlHelper.getSert:: disabled or too short. longUrl=' + longUrl);
			return longUrl;
		}
		
		tinyHash = this._hashCode(queryStr);
		gs.debug('TinyUrlHelper.getSert:: tinyHash = ' + tinyHash);

		grSysTinyUrl = new GlideRecord('sys_tiny_url');
		grSysTinyUrl.addQuery('data_hash', tinyHash);
		grSysTinyUrl.query();
		if (grSysTinyUrl.next()) {
			gs.debug('TinyUrlHelper.getSert:: already');
		} else {
			gs.debug('TinyUrlHelper.getSert:: insert');
			grSysTinyUrl.initialize();
			grSysTinyUrl.setValue('data', queryStr);
			grSysTinyUrl.setValue('data_hash', tinyHash);
			grSysTinyUrl.setValue('tiny_url', gs.generateGUID());
			grSysTinyUrl.insert();    
		}
		tinyUrl = 'https://' + this.instanceName + '.service-now.com/' + table + '.do?sysparm_tiny=' + grSysTinyUrl.getValue('tiny_url');
		return tinyUrl;
	},
	


	_hashCode: function(s) {
		var x = 0;
		var l = s.length;
		var i = 0;
		if ( l > 0 ) {
			while (i < l) {
				x = (x << 5) - x + s.charCodeAt(i++) | 0;
			}
		}		
		return x;
	},

	type: 'TinyUrlHelper'
};
