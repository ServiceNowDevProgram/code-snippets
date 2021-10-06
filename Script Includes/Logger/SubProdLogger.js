var SubProdLogger = Class.create();

/**
 * Logs messages to system log only for sub-prods
 * 
 * usage:
 * 
 * var logger = new SubProdLogger(); // With default sub prod keywords and log prefix
 * 
 * OR
 * 
 * var logger = new SubProdLogger(["dev","uat"], "Rahman Logs:");
 * 
 * logger.warn("This is a warning.");
 */
SubProdLogger.prototype = {

    /// properties
    _subProdKeywords: null,
    _logPrefix: null,
    _instanceUrl: '',
    _logApplicable: false,

    /**
     * Constructor
     * @param {array} subProdKeywords array of sub-prod names e.g. partial url ["dev", "uat"] or full url ["https://dev11111.service-now.com"]
     * @param {string} logPrefix prefix to be added to the log otherwise will be defaulted to
     */
    initialize: function (subProdKeywords, logPrefix) {
        this._subProdKeywords = subProdKeywords;
        this._logPrefix = logPrefix;

        if (!this._subProdKeywords) {
            // This is where you specify which environments to logger to log
            this._subProdKeywords = ['test', "uat", 'stage', 'qa', 'dev'];
        }

        if (!this._logPrefix) {
            this._logPrefix = "VF:";
        }

        // Do it once!
        this._instanceUrl = gs.getProperty('glide.servlet.uri');
        this._logApplicable = this._shouldLog();
    },

    /**
     * Logs warning message
     * @param {string} msg message to be logged
     */
    warn: function (msg) {
        if (this._logApplicable) {
            gs.warn(this._logPrefix + msg);
        }
    },

    /**
     * Logs error message
     * @param {string} msg message to be logged
     */
    error: function (msg) {
        if (this._logApplicable) {
            gs.error(this._logPrefix + msg);
        }
    },

    /**
     * Logs info message
     * @param {string} msg message to be logged
     */
    info: function (msg) {
        if (this._logApplicable) {
            gs.info(this._logPrefix + msg);
        }
    },

    // Helper functions

    /**
     * Checks the URL of the instance and finds out if it's a non-prod environemnt based on 
     * the _subProdKeywords values e.g. https://dev1111.service-now.com will be considered as
     * sub-prod for the _subProdKeywords=["dev"]
     */
    _shouldLog: function () {
        return this._stringContains(this._instanceUrl, this._subProdKeywords);
    },

    /**
     * 
     * @param {string} stringToSearch instance url
     * @param {*} fragments array of the sub-prod names
     */
    _stringContains: function (stringToSearch, fragments) {

        for (var i = 0; i < fragments.length; i++) {
            if (stringToSearch.indexOf(fragments[i]) > -1) {
                return true;
            }
        }

        return false;
    },

    type: 'SubProdLogger'
};