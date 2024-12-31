/**
 * Main GlideQuery class used to build and execute queries.
 * @example
 * var query = new GlideQuery('sys_user');
 * @constructor
 * @param {string} table Table to query
 * @param {Array} [plan] Contains an array of Step objects describing the
 * query. Generally only used by GlideQuery itself.
 */
function GlideQuery(table, plan) {
	Object.defineProperties(
		this,
		{
			table: { value: table },
			plan: { value: plan || [] }
		}
	);
}

GlideQuery.prototype.table = null;
GlideQuery.prototype.plan = null;
GlideQuery.prototype.type = 'GlideQuery';

/**
 * Returns a new GlideQuery containing a where clause. Cannot be
 * preceded by an orWhere, orWhereNull, or orWhereNotNull expression,
 * to avoid ambiguity.
 * @example
 * new GlideQuery('sys_user')
 *     .where('active', true)
 *     .where('last_login', '>', '2016-04-15')
 *
 * // active = true AND (priority = 1 OR severity = 1)
 * new GlideQuery('incident')
 *     .where('active', true)
 *     .where(new GlideQuery()
 *         .where('priority', 1)
 *         .orWhere('severity', 1))
 * @param {string | GlideQuery} fieldOrQuery field (or another GlideQuery) related to the where clause
 * @param {string} [operator] Operator used in where clause. Is considered '=' when only two arguments given.
 * @param {any} value Value used in where clause
 * @returns {GlideQuery} New GlideQuery containing where clause
 */
GlideQuery.prototype.where = function where(field, operator, value) {
	var query;
	if (field instanceof GlideQuery) {
		query = new GlideQuery(this.table, this.plan.concat({
			type: 'where',
			query: field,
			whereClause: true,
			action: GlideQueryActions.whereNestedQuery(this.table, field),
		}));
	} else {
		var op = value === undefined ? '=' : operator;
		var val = value === undefined ? operator : value;

		GlideQuery.checkWhereOperator(op, val);

		query = new GlideQuery(this.table, this.plan.concat({
			type: 'where',
			field: field,
			operator: op,
			value: val,
			whereClause: true,
			action: GlideQueryActions.where(this.table, field, op, val),
		}));
	}

	return GlideQuery.checkWhereAmbiguity(query);
};

/**
 * Returns a new GlideQuery containing an orWhere clause. Must be
 * preceded by a single where, whereNull, or whereNotNull expression. However
 * it cannot be followed by a where, whereNull, or whereNotNull expression
 * to avoid ambiguity.
 * @example
 * new GlideQuery('sys_user')
 *     .where('failed_attempts', '>', 0)
 *	   .orWhere('last_login', '<', '2019-04-15')
 *	   .select()
 *
 * // active = true OR (title = 'Vice President' AND state = 'CA')
 * new GlideQuery('sys_user')
 *     .where('active', true)
 *     .orWhere(new GlideQuery()
 *         .where('title', 'Vice President')
 *         .where('state', 'CA'))
 *     .select('name')
 * @param {string | GlideQuery} fieldOrQuery field (or another GlideQuery) related to the where clause
 * @param {string} [operator] Operator used in where clause. Is considered '=' when only two arguments given.
 * @param {any} value Value used in where clause
 * @returns {GlideQuery} New GlideQuery containing where clause
 */
GlideQuery.prototype.orWhere = function orWhere(field, operator, value) {
	var query;
	if (field instanceof GlideQuery) {
		query = new GlideQuery(this.table, this.plan.concat({
			type: 'orWhere',
			query: field,
			whereClause: true,
			action: GlideQueryActions.whereNestedQuery(this.table, field),
		}));
	} else {
		var op = value === undefined ? '=' : operator;
		var val = value === undefined ? operator : value;

		GlideQuery.checkWhereOperator(op, val);

		query = new GlideQuery(this.table, this.plan.concat({
			type: 'orWhere',
			field: field,
			operator: op,
			value: val,
			whereClause: true,
			action: GlideQueryActions.where(this.table, field, op, val),
		}));
	}

	return GlideQuery.checkWhereAmbiguity(query);
};

/**
 * Returns a new GlideQuery containing NOT NULL clause. Cannot be
 * preceded by an orWhere, orWhereNull, or orWhereNotNull expression.
 * @example
 * new GlideQuery('sys_user')
 *     .whereNotNull('first_name')
 * @param {string} field Field related to the clause
 * @returns {GlideQuery} New GlideQuery containing NOT NULL clause
 */
GlideQuery.prototype.whereNotNull = function whereNotNull(field) {
	return GlideQuery.checkWhereAmbiguity(
		new GlideQuery(
			this.table,
			this.plan.concat({
				type: 'whereNotNull',
				field: field,
				whereClause: true,
				action: GlideQueryActions.where(this.table, field),
			})
		)
	);
};

/**
 * Returns a new GlideQuery containing NOT NULL clause. Must be
 * preceded by a single where, whereNull, or whereNotNull expression.
 * @example
 * new GlideQuery('sys_user')
 *     .whereNotNull('first_name')
 *     .orWhereNotNull('last_name')
 * @param {string} field Field related to the clause
 * @returns {GlideQuery} New GlideQuery containing NOT NULL clause
 */
GlideQuery.prototype.orWhereNotNull = function orWhereNotNull(field) {
	return GlideQuery.checkWhereAmbiguity(
		new GlideQuery(
			this.table,
			this.plan.concat({
				type: 'orWhereNotNull',
				field: field,
				whereClause: true,
				action: GlideQueryActions.where(this.table, field),
			})
		)
	);
};

/**
 * Returns a new GlideQuery containing WHERE NULL clause. Cannot be
 * preceded by an orWhere, orWhereNull, or orWhereNotNull expression.
 * @example
 * new GlideQuery('sys_user')
 *     .whereNull('last_name')
 * @param {string} field Field related to the clause
 * @returns {GlideQuery} New GlideQuery containing NULL clause
 */
GlideQuery.prototype.whereNull = function whereNull(field) {
	return GlideQuery.checkWhereAmbiguity(
		new GlideQuery(
			this.table,
			this.plan.concat({
				type: 'whereNull',
				field: field,
				whereClause: true,
				action: GlideQueryActions.where(this.table, field),
			})
		)
	);
};

/**
 * Returns a new GlideQuery containing WHERE NULL clause. Must be
 * preceded by a single where, whereNull, or whereNotNull expression.
 * @example
 * new GlideQuery('sys_user')
 *     .whereNull('last_name')
 *     .orWhereNull('first_name')
 * @param {string} field Field related to the clause
 * @returns {GlideQuery} New GlideQuery containing NULL clause
 */
GlideQuery.prototype.orWhereNull = function orWhereNull(field) {
	return GlideQuery.checkWhereAmbiguity(
		new GlideQuery(
			this.table,
			this.plan.concat({
				type: 'orWhereNull',
				field: field,
				whereClause: true,
				action: GlideQueryActions.where(this.table, field),
			})
		)
	);
};

/**
 * Returns a single record, using `keyValues` as a set of key-values to query by.
 * getBy assumes the '=' operator for each key-value. Returns
 * @example
 * var user = new GlideQuery('sys_user')
 *     .getBy({
 *         first_name: 'Fred',
 *         last_name: 'Luddy'
 *     }, ['first_name', 'last_name', 'city', 'active']) // select first_name, last_name, city, active
 *     .orElse({
 *         first_name: 'Nobody',
 *         last_name: 'Found',
 *         city: 'Nowhere',
 *         active: false
 *     });
 * @param {Object} keyValues Object where the keys are the name of the fields, and the values are
 * @param {Array} [selectedFields] Additional fields to return in result
 * @returns {Optional} Optional containing result of query
 */
GlideQuery.prototype.getBy = function getBy(keyValues, selectedFields) {
	var queryFields = Object.keys(keyValues);
	GlideQueryEvaluator.checkFieldsHaveNoFlag(queryFields, 'getBy');
	var table = this.table;

	var whereSteps = queryFields.map(function (field) {
		return {
			type: 'where',
			field: field,
			operator: '=',
			value: keyValues[field],
			whereClause: true,
			action: GlideQueryActions.where(table, field, '=', keyValues[field]),
		};
	});

	return GlideQueryEvaluator.selectOne(
		new GlideQuery(this.table, this.plan.concat(whereSteps)),
		queryFields.concat(selectedFields || [])
	);
};

/**
 * Returns a single record by querying primary key `key`.
 * @example
 * var user = new GlideQuery('sys_user')
 *     .get('5137153cc611227c000bbd1bd8cd2005', ['first_name', 'last_name'])
 *     .orElse({ first_name: 'Default', last_name: 'User' });
 * @param {string} key Object where the keys are the name of the fields, and the values are
 * @param {Array} [selectedFields] Additional fields to return in result
 * @returns {Optional} Optional containing result of query
 */
GlideQuery.prototype.get = function get(key, schema, selectFields) {
	return GlideQueryEvaluator.get(this, key, schema, selectFields);
};

/**
 * Inserts a single record, returning an Optional of the newly-created record
 * @example
 * var fred = new GlideQuery('sys_user')
 *     .insert({ first_name: 'Fred', last_name: 'Luddy' })
 *     .get();
 * @param {Object} keyValues Object containing key-values to insert into table
 * @param {Array} [selectedFields] Fields to return in result Optional
 * @throws {Error} When insert fails (e.g. when a business rule rejects the insert)
 * @returns {Optional} Optional containing result of query
 */
GlideQuery.prototype.insert = function insert(keyValues, selectFields) {
	return GlideQueryEvaluator.insert(this, keyValues, selectFields || []);
};

/**
 * Updates an existing record (just like update), however instead of requiring
 * where calls, it uses the primary key(s) in the recordValues object passed
 * in. If the primary key(s) isn't there, insertOrUpdate will insert a new
 * record instead. Returns an Optional of the newly created/updated record.
 * Often useful when you want to want to ensure a record exists and has the
 * correct values, as you don't need to check for the record's existence beforehand.
 * @example
 * // insert a new record
 * var user = new GlideQuery('sys_user')
 *     .insertOrUpdate({
 *         first_name: 'George',
 *         last_name: 'Griffey'
 *     })
 *     .orElse(null);
 *
 * // update existing record
 * var user = new GlideQuery('sys_user')
 *     .insertOrUpdate({
 *         sys_id: '2d0efd6c73662300bb513198caf6a72e',
 *         first_name: 'George',
 *         last_name: 'Griffey' })
 *     .orElse(null);
 * @param {Object} changes Object containing key-values to update/insert into table
 * @param {Array} [selectedFields] Fields to return in result Optional
 * @throws {Error} When insert fails (e.g. when a business rule rejects the insert)
 * @returns {Optional} Optional containing result of query
 */
GlideQuery.prototype.insertOrUpdate = function insertOrUpdate(changes, selectFields, reason) {
	return GlideQueryEvaluator.insertOrUpdate(this, changes, selectFields || [], reason);
};

/**
 * Updates an existing record. Requires a where call, specifying
 * all existing primary keys (usually sys_id). Returns an Optional
 * of the newly-updated record. Passes in a reason string (just
 * like GlideRecord's update).
 * @example
 * new GlideQuery('sys_user')
 *     .where('sys_id', userId)
 *     .update({ city: 'Los Angeles' });
 * @param {Object} changes Object containing key-values to update/insert into table
 * @param {Array} [selectedFields] Fields to return in result Optional
 * @throws {Error} When insert fails (e.g. when a business rule rejects the insert)
 * @returns {Optional} Optional containing result of query
 */
GlideQuery.prototype.update = function update(
	changes, selectFields, reason, prefetchedSchema, planOverride, insertWhenNotFound
) {
	return GlideQueryEvaluator.update(
		this,
		changes || {},
		selectFields || [],
		reason,
		prefetchedSchema,
		planOverride,
		insertWhenNotFound
	);
};

/**
 * Updates all records in the table (specified by preceding where clauses)
 * with the values contained in the changes object. Returns # of records
 * updated.
 * @example
 * new GlideQuery('sys_user')
 *     .where('active', false)
 *     .where('last_name', 'Griffey')
 *     .updateMultiple({ active: true });
 * @param {Object} changes Object containing key-values to update/insert into table
 * @returns {Object} Object with field rowCount
 */
GlideQuery.prototype.updateMultiple = function updateMultiple(changes) {
	return GlideQueryEvaluator.updateMultiple(this, changes);
};

GlideQuery.prototype.del = function del() {
	GlideQueryEvaluator.del(this);
};

/**
 * Deletes all records in the table specified by preceding where clauses.
 * @example
 * new GlideQuery('sys_user')
 *     .where('active', true)
 *     .where('last_name', 'Jeter')
 *     .deleteMultiple();
 * @returns {nothing}
 */
GlideQuery.prototype.deleteMultiple = GlideQuery.prototype.del;

/**
 * Specifies which fields to return and returns a Stream containing the
 * results of the query. Note that records aren't actually read from the
 * database until a terminal Stream method is called (such as reduce() or
 * toArray()). The Stream is intended for reading multiple records in
 * a similar fashion to Java's Stream class.
 *
 * You can append a flag to a field name when metadata about the field is
 * needed, instead of the value itself. For example using the field name
 * "company$DISPLAY" will return the display value of a company field.
 * Existing flags are:
 * * DISPLAY - returns the display value of a field
 * * CURRENCY_CODE - Returns the currency code (e.g. "USD") of a currency field
 * * CURRENCY_DISPLAY - Returns the currency display value (e.g. "¥123.45") of a currency field
 * * CURRENCY_STRING - Returns the currency string (e.g. "JPY;123.45") of a currency field
 * @example
 * var stream = new GlideQuery('sys_user')
 *     .select('first_name', 'last_name', 'company$DISPLAY');
 * @param {...string} fields Fields to select
 * @returns {Stream} Stream containing results of query
 */
GlideQuery.prototype.select = function select(fields) {
	return GlideQueryEvaluator.createStream(this, GlideQuery.flattenFields(fields, arguments));
};

/**
 * Similar to [select()]{@link GlideQuery#select}, however only returns an Optional
 * which may contain a single record. This is more efficient
 * than select() if you only need one record, or want to
 * test if a record exists.
 * @example
 * var user = new GlideQuery('sys_user')
 *     .where('zip', '12345')
 *     .whereNotNull('last_name')
 *     .selectOne('first_name', 'last_name', 'company$DISPLAY')
 *     .get();
 * @param {...string} fields Fields to select
 * @returns {Optional} Optional containing result of query
 */
GlideQuery.prototype.selectOne = function selectOne(fields) {
	return GlideQueryEvaluator.selectOne(this, GlideQuery.flattenFields(fields, arguments));
};

/**
 * Returns a GlideQuery which disables the running of business
 * rules, script engines, and audit.
 * @example
 * var query = new GlideQuery('task')
 *     .disableWorkflow()
 *     .where('active', true)
 *     .updateMultiple({ priority: 1 });
 * @returns {GlideQuery} New GlideQuery which disables business rules
 */
GlideQuery.prototype.disableWorkflow = function disableWorkflow() {
	return new GlideQuery(this.table, this.plan.concat({
		type: 'disableWorkflow',
		action: GlideQueryActions.disableWorkflow,
	}));
};

/**
 * Returns a GlideQuery which does not update sys fields such as
 * sys_created_on, sys_updated_on, and sys_mod_count. This is the
 * equivalent of using autoSysFields(false) with GlideRecord.
 * @example
 * new GlideQuery('task')
 *     .disableAutoSysFields()
 *     .insert({ description: 'example', priority: 1 });
 * @returns {GlideQuery}
 */
GlideQuery.prototype.disableAutoSysFields = function disableAutoSysFields() {
	return new GlideQuery(this.table, this.plan.concat({
		type: 'disableAutoSysFields',
		action: GlideQueryActions.disableAutoSysFields,
	}));
};

/**
 * Returns a GlideQuery which forces an update even when no
 * changes are made. Useful when you want to force a business
 * rule to execute.
 * @example
 * new GlideQuery('task')
 *     .forceUpdate()
 *     .where('sys_id', taskId)
 *     .update()
 * @returns {GlideQuery}
 */
GlideQuery.prototype.forceUpdate = function forceUpdate() {
	return new GlideQuery(this.table, this.plan.concat({
		type: 'forceUpdate',
		action: GlideQueryActions.forceUpdate,
	}));
};

/**
 * Returns a GlideQuery which specifies that the records should
 * be returned in ascending order by a given field.
 * @example
 * var query = new GlideQuery('incident')
 *     .orderBy('number');
 * @param {string} field Fields to order by (ascending)
 * @returns {GlideQuery} New GlideQuery which contains orderBy
 */
GlideQuery.prototype.orderBy = function orderBy(field) {
	return new GlideQuery(
		this.table,
		this.plan.concat({
			type: 'orderBy',
			field: field,
			action: GlideQueryActions.orderBy(this.table, field),
		})
	);
};

/**
 * Returns a GlideQuery which specifies that the records should
 * be returned in descending order by a given field. Can be used
 * with aggregate queries
 * @example
 * var query = new GlideQuery('incident')
 *     .orderByDesc('number');
 *
 * new GlideQuery('incident')
 *     .aggregate('sum', 'child_incidents')
 *     .groupBy('category')
 *     .orderByDesc('sum', 'child_incidents')
 *
 * @param {string} fieldOrAggregate Field to order by with non-aggregate queries or
     aggregate type if used with aggregate queries
 * @param {string} [field] Field to order by (only used with aggregate queries)
 * @returns {GlideQuery} New GlideQuery which contains orderByDesc
 */
GlideQuery.prototype.orderByDesc = function orderByDesc(fieldOrAggregate, field) {
	return new GlideQuery(
		this.table,
		this.plan.concat({
			type: 'orderByDesc',
			field: field || fieldOrAggregate,
			action: GlideQueryActions.orderByDesc(this.table, fieldOrAggregate, field),
		})
	);
};

/**
 * Returns a GlideQuery which limits the number of records returned.
 * @example
 * var incidents = new GlideQuery('incident')
 *     .limit(20)
 *     .select('priority', 'description');
 * @param {number} limit Max number of records to return
 * @returns {GlideQuery} New GlideQuery which contains limit
 */
GlideQuery.prototype.limit = function limit(limit) {
	return new GlideQuery(
		this.table,
		this.plan.concat({
			type: 'limit',
			value: limit,
			action: GlideQueryActions.limit(limit),
		})
	);
};

/**
 * By default GlideQuery uses GlideRecord for database interactions.
 * By calling withAcls() GlideQuery will use GlideRecordSecure, which
 * honors ACLs.
 * @example
 * var users = new GlideQuery('sys_user')
 *     .withAcls()
 *     .limit(20)
 *     .orderByDesc('first_name')
 *     .select('first_name')
 *     .toArray(100);
 * @returns {GlideQuery} New GlideQuery which uses GlideRecordSecure
 */
GlideQuery.prototype.withAcls = function withAcls() {
	return new GlideQuery(
		this.table,
		this.plan.concat({
			type: 'withAcls',
		})
	);
};

/**
 * Returns the aggregate average of a given numeric field. Can be
 * used on fields of type:
 * * integer
 * * longint
 * * float
 * * double
 * * currency
 * @example
 * var faults = new GlideQuery('cmdb_ci')
 *     .avg('fault_count')
 *     .orElse(0);
 * @param {string} field Numeric field
 * @throws {Error} When invalid field given
 * @returns {Optional} Optional of results of aggregate, or empty if no records found
 */
GlideQuery.prototype.avg = function avg(field) {
	return GlideQueryEvaluator.callSimpleAggregate(this, 'avg', field);
};

/**
 * Returns the aggregate maximum of a given field.
 * @example
 * var name = new GlideQuery('sys_user')
 *     .max('first_name')
 *     .orElse('');
 * @param {string} field
 * @throws {Error} When invalid field given
 * @returns {Optional} Optional of results of aggregate, or empty if no records found
 */
GlideQuery.prototype.max = function max(field) {
	return GlideQueryEvaluator.callSimpleAggregate(this, 'max', field);
};

/**
 * Returns the aggregate minimum of a given field.
 * @example
 * var lowestModCount = new GlideQuery('sys_user')
 *     .min('sys_mod_count')
 *     .orElse(0);
 * @param {string} field
 * @throws {Error} When invalid field given
 * @returns {Optional} Optional of results of aggregate, or empty if no records found
 */
GlideQuery.prototype.min = function min(field) {
	return GlideQueryEvaluator.callSimpleAggregate(this, 'min', field);
};

/**
 * Returns the aggregate sum of a given numeric field. Can be
 * used on fields of type:
 * * integer
 * * longint
 * * float
 * * double
 * * currency
 * @example
 * var totalFaults = new GlideQuery('cmdb_ci')
 *     .sum('fault_count')
 *     .orElse(0);
 * @param {string} field Numeric field
 * @throws {Error} When invalid field given
 * @returns {Optional} Optional of results of aggregate, or empty if no records found
 */
GlideQuery.prototype.sum = function sum(field) {
	return GlideQueryEvaluator.callSimpleAggregate(this, 'sum', field);
};

/**
 * Returns the row count of records matching the query
 * @example
 * var userCount = new GlideQuery('sys_user')
 *     .where('active', true)
 *     .count();
 * @returns {number}
 */
GlideQuery.prototype.count = function count() {
	return GlideQueryEvaluator.callSimpleAggregate(this, 'count');
};

/**
 * Groups query results. Used with `aggregate()`
 * @example
 * new GlideQuery('task')
 *     .aggregate('count')
 *     .groupBy('contact_type')
 *     .select()
 * @param {...string} fields Fields to group by
 * @returns {GlideQuery} GlideQuery which groups results
 */
GlideQuery.prototype.groupBy = function groupBy(fields) {
	if (!fields) {
		NiceError.raise('groupBy expects a field name');
	}

	var table = this.table;
	var fieldArray = GlideQuery.flattenFields(fields, arguments);

	return new GlideQuery(
		this.table,
		this.plan.concat(fieldArray.map(function (f) {
			return {
				type: 'groupBy',
				field: f,
				action: GlideQueryActions.groupBy(table, f),
			};
		}))
	);
};

/**
 * Aggregates a field using an aggregate function. Used to build
 * queries which aggregate against multiple fields and/or multiple
 * aggregate functions. If you only need to aggregate against one
 * field with one function, and you don't need to use groupBy(), then
 * use one of the terminal functions instead:
 * * avg()
 * * min()
 * * max()
 * * count()
 * @example
 * new GlideQuery('task')
 *     .aggregate('avg', 'reassignment_count')
 *     .groupBy('contact_type')
 *     .select()
 * @param {string} aggregateType Aggregate type ('sum', 'avg', 'min', 'max', or 'count')
 * @param {string} field Field to aggregate
 * @returns {GlideQuery} GlideQuery which aggregates by a field
 */
GlideQuery.prototype.aggregate = function aggregate(aggregateType, field) {
	var type = aggregateType.toLowerCase();

	if (!GlideQueryEvaluator.aggregateQueries[type]) {
		NiceError.raise('Invalid aggregate type: ' + type);
	}

	return new GlideQuery(
		this.table,
		this.plan.concat({
			type: type,
			field: field,
			aggregate: true,
			action: GlideQueryActions.aggregate(this.table, field, aggregateType),
		})
	);
};

/**
 * Filters aggregate groups. Used with `aggregate()` and `groupBy`.
 * @example
 * new GlideQuery('task')
 *     .where('description', description)
 *     .groupBy('priority')
 *     .aggregate('sum', 'reassignment_count')
 *     .having('sum', 'reassignment_count', '>', 4)
 *     .select()
 * @param {string} aggregateType Aggregate type ('sum', 'avg', 'min', 'max', or 'count')
 * @param {string} field Field to aggregate
 * @param {string} operator Only numeric operators allowed: '>', '<', '>=', '<=', '=', and '!='
 * @param {number} value
 * @returns {GlideQuery} GlideQuery containing HAVING clause
 */
GlideQuery.prototype.having = function having(aggregate, field, operator, value) {
	GlideQuery.checkHavingOperatorAndValue(operator, value);
	var aggregateType = aggregate.toLowerCase();

	return new GlideQuery(
		this.table,
		this.plan.concat({
			type: 'having',
			aggregateType: aggregateType,
			field: field,
			operator: operator,
			value: value,
			action: GlideQueryActions.having(this.table, field, operator, value, aggregateType),
		})
	);
};

/**
 * Returns a GlideRecord representing the current GlideQuery. The
 * GlideRecord has not yet been queried, and so query() may need to
 * be called before using the GlideReord. The GlideRecord may
 * be a GlideAggregate in case aggregate queries are used.
 * @example
 * var userGr = new GlideQuery('sys_user')
 *     .where('active', true)
 *     .whereNotNull('first_name')
 *     .limit(10)
 *     .toGlideRecord();
 * userGr.query();
 * while (userGr.next()) {
 *     doSomething(userGr);
 * }
 * @returns {GlideRecord}
 */
GlideQuery.prototype.toGlideRecord = function toGlideRecord() {
	var gr = GlideQueryEvaluator.createGlideRecord(this);
	var schema = GlideQueryEvaluator.loadSchemaForTable(this, []);
	GlideQueryEvaluator.executePlan(this, gr, schema);
	return gr;
};

/**
 * Parses an encoded query.
 * @example
 * GlideQuery.parse('task', 'active=true^descriptionISNOTEMPTY')
 *     .select('description')
 *     .forEach(function (task) { gs.info(task.description); });
 * @param {string} table Table to query against
 * @param {string} encodedQuery Encoded query to parse
 * @returns {GlideRecord}
 */
GlideQuery.parse = function (table, encodedQuery) {
       return GlideQueryParser.parse(table, encodedQuery);
};

GlideQuery.prototype.toString = function toString() {
	return 'GlideQuery<' + this.table + '> ' + JSON.stringify(this.plan, null, 2);
};

GlideQuery.operators = {
	'=': 'comparable',
	'!=': 'comparable',
	'>': 'comparable',
	'>=': 'comparable',
	'<': 'comparable',
	'<=': 'comparable',
	IN: 'array',
	'NOT IN': 'array',
	STARTSWITH: 'string',
	ENDSWITH: 'string',
	CONTAINS: 'string',
	'DOES NOT CONTAIN': 'string',
	INSTANCEOF: 'string',
	SAMEAS: 'string',
	NSAMEAS: 'string',
	GT_FIELD: 'string',
	LT_FIELD: 'string',
	GT_OR_EQUALS_FIELD: 'string',
	LT_OR_EQUALS_FIELD: 'string',
	BETWEEN: 'array',
	DYNAMIC: 'string',
	EMPTYSTRING: 'string',
	ANYTHING: 'string',
	LIKE: 'string',
	'NOT LIKE': 'string',
	ON: 'string',
};

GlideQuery.checkHavingOperatorAndValue = function checkHavingOperatorAndValue(operator, value) {
	if (!JSUtil.instance_of(value, 'java.lang.Double') || !isFinite(value)) {
		NiceError.raise('Numeric value expected for having() value. Found ' + value);
	}
	if (GlideQuery.operators[operator] !== 'comparable') {
		NiceError.raise("Operator '" + operator + "' is not supported by having");
	}
};

GlideQuery.checkWhereOperator = function checkWhereOperator(operator, value) {
	if (!GlideQuery.operators[operator]) {
		NiceError.raise("Operator '" + operator + "' is not supported by where");
	}

	if (GlideQuery.operators[operator] === 'array' && !Array.isArray(value)) {
		NiceError.raise("Operator '" + operator + "' can only be used on array values");
	}

	if (operator === 'BETWEEN' && value.length !== 2) {
		NiceError.raise('BETWEEN requires array with two values, but was given one with ' + value.length + ' value(s)');
	}

	if (Array.isArray(value) && GlideQuery.operators[operator] !== 'array') {
		NiceError.raise("Array values can only be used with 'NOT IN' or 'IN' operators");
	}

	if (GlideQuery.operators[operator] === 'string' && !JSUtil.instance_of(value, 'java.lang.String')) {
		NiceError.raise("Operator '" + operator + "' can only be used on string values");
	}
};

GlideQuery.flattenFields = function flattenFields(firstArg, args) {
	if (Array.isArray(firstArg)) {
		return firstArg;
	}

	var flattenedFields = [];
	for (var i in args) {
		flattenedFields.push(args[i]);
	}

	return flattenedFields;
};

GlideQuery.checkWhereAmbiguity = function checkWhereAmbiguity(glideQuery) {
	var whereFound = 0;
	var orWhereFound = 0;
	glideQuery.plan
		.filter(function (step) { return step.whereClause; })
		.forEach(function (step) {
			if (step.type.startsWith('where')) {
				whereFound += 1;
			} else if (step.type.startsWith('or')) {
				orWhereFound += 1;
			}

			if (orWhereFound && !whereFound) {
				NiceError.raise(step.type + ' must be preceeded by where/whereNull/whereNotNull expression');
			}

			if (step.query && step.query.plan.some(function (s) { return s.query; })) {
				NiceError.raise('Cannot nest queries 3 or more levels');
			}
		});

	if (whereFound > 1 && orWhereFound) {
		NiceError.raise(
			'Ambiguous query: cannot contain multiple where***() expressions with an orWhere***() expression'
		);
	}

	return glideQuery;
};