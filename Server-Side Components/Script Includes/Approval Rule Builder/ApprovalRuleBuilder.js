var ApprovalRuleBuilder = Class.create();

// Valid Rulesets
ApprovalRuleBuilder.RULESET_APPROVES = "Approves";
ApprovalRuleBuilder.RULESET_REJECTS = "Rejects";
ApprovalRuleBuilder.RULESET_APPROVEREJECTS = "ApproveReject";

// Valid Rules
ApprovalRuleBuilder.RULE_ANY = "Any";  // Anyone approves
ApprovalRuleBuilder.RULE_ALL = "All";  // All users approve
ApprovalRuleBuilder.RULE_RESPONDED = "Res";  // All responded and anyone approves
ApprovalRuleBuilder.RULE_PERCENT = "%";  // % of users approve
ApprovalRuleBuilder.RULE_NUMBER = "#";  // number of users approve

ApprovalRuleBuilder.prototype = {

    /**
     * Main ApprovalRuleBuilder class
     * @example
     * var query = new ApprovalRuleBuilder();
     * @constructor
     * @param {boolean} (optional) Enable debug output
     */
    initialize: function (debug) {
        this._debug = debug | false;
        this._approval_rules = '';

        // keep track of required steps
        this._ruleset_added = false;  // additional rulesets can be added once the current ruleset is complete (has rules and users/groups)
        this._rule_added = false;  // rule can only be added to an open ruleset, Or/And rules can be added once users/groups have been set for current rule
        this._users_added = false;  // users/groups can only be added to an open rule but not if manual users has been set
        this._manual_users = false;  // manual users cannot be added to a rule if users/groups already applied

        this._users = [];  // temporary store for users, allows multiple .addUsers calls
        this._groups = [];  // temporary store for groups, allows multiple .addGroups calls
    },

    /**
     * Starts a new ruleset
     * @example
     * var rules = new ApprovalRuleBuilder()
     *                 .addRuleSet(ApprovalRuleBuilder.RULESET_APPROVES)
     * @param {string} ruleset to create (APPROVES|REJECTS|APPROVEREJECTS)
     * @returns {ApprovalRuleBuilder} New ApprovalRuleBuilder containing approval rules
     */
    addRuleSet: function (ruleset) {

        if (!this._isValidRuleSet(ruleset)) {
            NiceError.raise('Unknown ruleset (' + ruleset + ')');
        }

        if (this._approval_rules != '' && !this._users_added) {
            NiceError.raise('Cannot add ruleset (' + ruleset + ') as previous set not complete');
        }

        this._commitUsersAndGroups();

        if (this._approval_rules != '') {
            if (this._debug) gs.info('- [RuleSet] Or' + ruleset);
            this._approval_rules += "Or";
        } else {
            if (this._debug) gs.info('- [RuleSet] ' + ruleset);
        }

        this._approval_rules += ruleset;

        this._ruleset_added = true;
        this._rule_added = false;
        this._users_added = false;
        this._manual_users = false;

        return this;
    },

    /**
     * Starts a new rule
     * @example
     * var rules = new ApprovalRuleBuilder()
     *                 .addRuleSet(ApprovalRuleBuilder.RULESET_APPROVES)
     *                 .addRule(ApprovalRuleBuilder.RULE_ANY)
     * @param {string} rule to create (ANY|ALL|RES|%|#)
     * @param {integer} number to use for percentage and number of users rule (optional)
     * @returns {ApprovalRuleBuilder} New ApprovalRuleBuilder containing approval rules
     */
    addRule: function (rule, value) {
        value = value | 0;

        if (!this._isValidRule(rule)) {
            NiceError.raise('Unknown rule (' + rule + ')');
        }

        if (!this._ruleset_added) {
            NiceError.raise('Cannot add rule (' + rule + ') as no ruleset defined.');
        }

        if (this._rule_added) {
            NiceError.raise('Cannot add rule (' + rule + '), use addAndRule or addOrRule instead');
        }

        if (rule == ApprovalRuleBuilder.RULE_PERCENT || rule == ApprovalRuleBuilder.RULE_NUMBER) {
            if (value > 0) {
                this._approval_rules += value;
            } else {
                NiceError.raise("Cannot add rule (' + rule + ') as no value specified");
            }
        }

        if (this._debug) gs.info('-- [Rule] ' + (value > 0 ? value : '') + rule);

        this._approval_rules += rule;

        this._rule_added = true;
        this._users_added = false;
        this._manual_users = false;
        return this;
    },

    /**
     * Adds users to a rule
     * @example
     * var rules = new ApprovalRuleBuilder()
     *                 .addRuleSet(ApprovalRuleBuilder.RULESET_APPROVES)
     *                 .addRule(ApprovalRuleBuilder.RULE_ANY)
     *                 .addUsers(['a8f98bb0eb32010045e1a5115206fe3a','a2826bf03710200044e0bfc8bcbe5ded'])
     * @param {array} sys_id's of users to add
     * @returns {ApprovalRuleBuilder} New ApprovalRuleBuilder containing approval rules
     */
    addUsers: function (user_sys_id_list) {
        if (this._rule_added) {
            if (!this._manual_users) {
                if (this._debug) gs.info('--- [Users] (temporary) ' + user_sys_id_list.join(','));
                var au = new ArrayUtil();
                this._users = au.union(this._users, user_sys_id_list);
                this._users_added = this._users_added || this._users.length > 0;
            } else {
                NiceError.raise('Cannot add groups as manual users have already been added.');
            }
        } else {
            NiceError.raise('Cannot add users as no rule in progress');
        }
        return this;
    },

    /**
     * Adds groups to a rule
     * @example
     * var rules = new ApprovalRuleBuilder()
     *                 .addRuleSet(ApprovalRuleBuilder.RULESET_APPROVES)
     *                 .addRule(ApprovalRuleBuilder.RULE_ANY)
     *                 .addGroups(['a8f98bb0eb32010045e1a5115206fe3a','a2826bf03710200044e0bfc8bcbe5ded'])
     * @param {array} sys_id's of groups to add
     * @returns {ApprovalRuleBuilder} New ApprovalRuleBuilder containing approval rules
     */
    addGroups: function (group_sys_id_list) {
        if (this._rule_added) {
            if (!this._manual_users) {
                if (this._debug) gs.info('--- [Groups] (temporary)' + group_sys_id_list.join(','));
                var au = new ArrayUtil();
                this._groups = au.union(this._groups, group_sys_id_list);
                this._users_added = this._users_added || this._groups.length > 0;

            } else {
                NiceError.raise('Cannot add groups as manual users have already been added.');
            }
        } else {
            NiceError.raise('Cannot add groups as no rule in progress');
        }
        return this;
    },

    /**
     * Adds manual users to a rule
     * @example
     * var rules = new ApprovalRuleBuilder()
     *                 .addRuleSet(ApprovalRuleBuilder.RULESET_APPROVES)
     *                 .addRule(ApprovalRuleBuilder.RULE_ANY)
     *                 .addManualUsers()
     * @returns {ApprovalRuleBuilder} New ApprovalRuleBuilder containing approval rules
     */
    addManualUsers: function () {
        if (this._rule_added) {
            if (this._debug) gs.info('--- [Manual Users]');
            if (!this._users_added) {
                this._approval_rules += 'M';
                this._users_added = true;
                this._manual_users = true;
            } else {
                NiceError.raise('Cannot add manual users as users/groups have already been added.');
            }
        } else {
            NiceError.raise('Cannot add manual users as no rule in progress');
        }
        return this;
    },

    /**
     * Adds an Or rule to a ruleset
     * @example
     * var rules = new ApprovalRuleBuilder()
     *                 .addRuleSet(ApprovalRuleBuilder.RULESET_APPROVES)
     *                 .addRule(ApprovalRuleBuilder.RULE_ANY)
     *                 .addGroups(['a8f98bb0eb32010045e1a5115206fe3a','a2826bf03710200044e0bfc8bcbe5ded'])
     *                 .addOrRule(ApprovalRuleBuilder.RULE_RESPONDED)
     *                 .addGroups(['a8f98bb0eb32010045e1a5115206fe3a','a2826bf03710200044e0bfc8bcbe5ded'])
     * @param {string} rule to create (ANY|ALL|RES|%|#)
     * @param {integer} number to use for percentage and number of users rule (optional)
     * @returns {ApprovalRuleBuilder} New ApprovalRuleBuilder containing approval rules
     */
    addOrRule: function (rule, value) {
        if (this._rule_added && this._users_added) {
            this._commitUsersAndGroups();
            this._rule_added = false;
            this._approval_rules += '|';
            if (this._debug) gs.info('-- [Or]');
            return this.addRule(rule, value);
        } else {
            NiceError.raise('Cannot add Or rule as previous rule not complete');
        }
        return this;
    },

    /**
     * Adds an And rule to a ruleset
     * @example
     * var rules = new ApprovalRuleBuilder()
     *                 .addRuleSet(ApprovalRuleBuilder.RULESET_APPROVES)
     *                 .addRule(ApprovalRuleBuilder.RULE_ANY)
     *                 .addGroups(['a8f98bb0eb32010045e1a5115206fe3a','a2826bf03710200044e0bfc8bcbe5ded'])
     *                 .addAndRule(ApprovalRuleBuilder.RULE_RESPONDED)
     *                 .addGroups(['a8f98bb0eb32010045e1a5115206fe3a','a2826bf03710200044e0bfc8bcbe5ded'])
     * @param {string} rule to create (ANY|ALL|RES|%|#)
     * @param {integer} number to use for percentage and number of users rule (optional)
     * @returns {ApprovalRuleBuilder} New ApprovalRuleBuilder containing approval rules
     */
    addAndRule: function (rule, value) {
        if (this._rule_added && this._users_added) {
            this._commitUsersAndGroups();
            this._rule_added = false;
            this._approval_rules += '&';
            if (this._debug) gs.info('-- [And]');
            return this.addRule(rule, value);
        } else {
            NiceError.raise('Cannot add And rule as previous rule not complete');
        }
        return this;
    },

    /**
     * Returns the built approval rule
     * @example
     * ApprovesAllU[a8f98bb0eb32010045e1a5115206fe3a,a2826bf03710200044e0bfc8bcbe5ded]G[b85d44954a3623120004689b2d5dd60a,287ee6fea9fe198100ada7950d0b1b73] 
     *     |10%G[db53580b0a0a0a6501aa37c294a2ba6b,74ad1ff3c611227d01d25feac2af603f]
     * @returns {string} encoded rule string for use in Flow Designer
     */
    getApprovalRules: function () {
        this._commitUsersAndGroups();
        return this._approval_rules;
    },

    /*
     * Internal methods
     */

    _isValidRuleSet: function (ruleset) {
        return (ruleset == ApprovalRuleBuilder.RULESET_APPROVES ||
            ruleset == ApprovalRuleBuilder.RULESET_REJECTS ||
            ruleset == ApprovalRuleBuilder.RULESET_APPROVEREJECT);
    },

    _isValidRule: function (rule) {
        return (rule == ApprovalRuleBuilder.RULE_ANY ||
            rule == ApprovalRuleBuilder.RULE_ALL ||
            rule == ApprovalRuleBuilder.RULE_RESPONDED ||
            rule == ApprovalRuleBuilder.RULE_PERCENT ||
            rule == ApprovalRuleBuilder.RULE_NUMBER);
    },

    _commitUsersAndGroups: function () {
        if (this._users.length > 0) {
            this._approval_rules += 'U[' + this._users.join(',') + ']';
            if (this._debug) gs.info('--- [Users] ' + this._users.join(','));
            this._users = [];
        }

        if (this._groups.length > 0) {
            if (this._debug) gs.info('--- [Groups] ' + this._groups.join(','));
            this._approval_rules += 'G[' + this._groups.join(',') + ']';
            this._groups = [];
        }
    },

    type: 'ApprovalRuleBuilder'
};
