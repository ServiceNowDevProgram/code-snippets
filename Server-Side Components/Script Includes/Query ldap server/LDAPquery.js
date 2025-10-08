var LDAPquery = Class.create();
LDAPquery.prototype = {
	initialize: function () {
		this.LDAP_CONFIG = '';
		this.RDN = '';
		this.FILTER = '';
		this.BOOLEAN = true;
		this.ROWS_PAGE = 1;
		this.GLIDE_LDAP = new GlideLDAP();
	},

	setRDN: function (rdn) {
		this.RDN = rdn || '';
		return this;
	},

	setFilter: function (filter) {
		this.FILTER = filter || '';
		return this;
	},

	setPagination: function (rows) {
		this.ROWS_PAGE = rows || 1;
		return this;
	},

	setConfig: function (config) {
		this.LDAP_CONFIG = config || '';
		this.GLIDE_LDAP.setConfigID(config)
		return this;
	},

	getOne: function () {
		if (!this.LDAP_CONFIG) {
			NiceError.raise('no ldap config defined');
		}
		var entry;

		if (entry = this._query().next()) {
			return j2js(entry);
		}
		return null;
	},

	getIterable: function () {
		if (!this.LDAP_CONFIG) {
			NiceError.raise('no ldap config defined');
		}
		return this._query();
	},

	_query: function () {
		return this.GLIDE_LDAP.getMatching(this.RDN, this.FILTER, this.BOOLEAN, this.ROWS_PAGE);
	},
	type: 'LDAPquery'
};
