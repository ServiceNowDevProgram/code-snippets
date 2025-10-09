/**
 * LDAPquery class provides a fluent interface for querying LDAP entries.
 * It wraps GlideLDAP and allows configuration of RDN, filters, pagination, and server config.
 * @class
 *
 * @example
 * Example 1: Retrieve a single LDAP record
 * var result = new LDAPquery()
 *   .setRDN('')
 *   .setFilter('uid=einstein')
 *   .setConfig('2fd003c083e07e10557ff0d6feaad3d7')
 *   .getOne();
 * gs.info(result.telephoneNumber);
 *
 * @example
 * Example 2: Retrieve multiple LDAP records with pagination
 * var result = new LDAPquery()
 *   .setRDN('ou=scientists')
 *   .setPagination(1000)
 *   .setConfig('2fd003c083e07e10557ff0d6feaad3d7')
 *   .getIterable();
 *
 * var item;
 * while (item = result.next()) {
 *   gs.info(JSON.stringify(j2js(item), null, 2));
 * }
 */
var LDAPquery = Class.create();

/**
 * @typedef {Object} LDAPquery
 * @property {string} ldapConfig - The sys_id of the LDAP server config.
 * @property {string} rdn - The relative distinguished name to start the query from.
 * @property {string} filter - LDAP filter string.
 * @property {boolean} boolean - Boolean flag used in query logic.
 * @property {number} rowsPerPage - Number of rows to return per page.
 * @property {GlideLDAP} glideLdap - GlideLDAP instance used to perform queries.
 */
LDAPquery.prototype = {
	/**
	 * Initializes the LDAPquery instance with default values.
	 */
	initialize: function () {
		this.ldapConfig = '';
		this.rdn = '';
		this.filter = '';
		this.boolean = true;
		this.rowsPerPage = 1;
		this.glideLdap = new GlideLDAP();
	},

	/**
	 * Sets the relative distinguished name (RDN) for the query.
	 * @param {string} rdn - The RDN string.
	 * @returns {LDAPquery} Returns the current instance for chaining.
	 */
	setRDN: function (rdn) {
		this.rdn = rdn || '';
		return this;
	},

	/**
	 * Sets the LDAP filter string.
	 * @param {string} filter - The LDAP filter.
	 * @returns {LDAPquery} Returns the current instance for chaining.
	 */
	setFilter: function (filter) {
		this.filter = filter || '';
		return this;
	},

	/**
	 * Sets the number of rows to return per page.
	 * @param {number} rows - Number of rows.
	 * @returns {LDAPquery} Returns the current instance for chaining.
	 */
	setPagination: function (rows) {
		this.rowsPerPage = rows || 1;
		return this;
	},

	/**
	 * Sets the LDAP server configuration using its sys_id.
	 * Also sets the config on the GlideLDAP instance.
	 * @param {string} config - The sys_id of the LDAP server config.
	 * @returns {LDAPquery} Returns the current instance for chaining.
	 */
	setConfig: function (config) {
		this.ldapConfig = config || '';
		this.glideLdap.setConfigID(config);
		return this;
	},

	/**
	 * Executes the query and returns the first matching LDAP entry.
	 * @returns {Object|null} Returns the first matching entry as a JavaScript object, or null if none found.
	 * @throws Will raise an error if ldapConfig is not set.
	 */
	getOne: function () {
		if (!this.ldapConfig) {
			NiceError.raise('no ldap config defined');
		}
		var entry;
		if (entry = this._query().next()) {
			return j2js(entry);
		}
		return null;
	},

	/**
	 * Executes the query and returns an iterable result set.
	 * @returns Returns a iterator over matching LDAP entries.
	 * @throws Will raise an error if ldapConfig is not set.
	 */
	getIterable: function () {
		if (!this.ldapConfig) {
			NiceError.raise('no ldap config defined');
		}
		return this._query();
	},

	/**
	 * Internal method to perform the LDAP query using GlideLDAP.
	 * @private
	 * @returns Returns the result iterator.
	 */
	_query: function () {
		return this.glideLdap.getMatching(this.rdn, this.filter, this.boolean, this.rowsPerPage);
	},

	type: 'LDAPquery'
};
