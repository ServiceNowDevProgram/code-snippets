/**
 * Name: SmartData
 * Type: Script Include (server-side, global)
 * Accessible from: Server scripts (NOT client-callable)
 * Author: Abhishek
 * Summary: A tiny data helper that auto-picks GlideAggregate for counts/stats/distinct
 *          and GlideRecord for lists/one. Also includes describe() and preview().
 */
var SmartData = Class.create();
SmartData.prototype = {
  initialize: function () {},

  /**
   * Unified entry
   * opts = {
   *   table: 'incident',
   *   query: 'active=true^priority=1',
   *   want: 'list' | 'one' | 'count' | 'distinct' | 'stats' | 'describe' | 'preview',
   *   fields: ['number','short_description'],
   *   limit: 50,
   *   orderBy: 'sys_created_on' | '-sys_created_on',
   *   field: 'assignment_group',             // for distinct
   *   groupBy: ['assignment_group','priority'], // for stats
   *   aggregate: { fn:'AVG'|'SUM'|'MIN'|'MAX'|'COUNT', field:'time_worked' }
   * }
   */
  query: function (opts) {
    opts = opts || {};
    var want = (opts.want || "list").toLowerCase();

    if (want === "count") return this.count(opts.table, opts.query);
    if (want === "distinct")
      return this.distinct(opts.table, opts.field, opts.query);
    if (want === "stats")
      return this.stats(opts.table, opts.aggregate, opts.groupBy, opts.query);
    if (want === "one")
      return this.one(opts.table, opts.query, opts.fields, opts.orderBy);
    if (want === "describe") return this.describe(opts.table);
    if (want === "preview") return this.preview(opts.table, opts.query);

    return this.list(
      opts.table,
      opts.query,
      opts.fields,
      opts.limit,
      opts.orderBy
    );
  },

  /** Fast COUNT via GlideAggregate */
  count: function (table, encQuery) {
    var ga = new GlideAggregate(table);
    if (encQuery) ga.addEncodedQuery(encQuery);
    ga.addAggregate("COUNT");
    ga.query();
    return ga.next() ? parseInt(ga.getAggregate("COUNT"), 10) || 0 : 0;
  },

  /** DISTINCT values of a single field (GlideAggregate groupBy) */
  distinct: function (table, field, encQuery) {
    if (!field) return [];
    var ga = new GlideAggregate(table);
    if (encQuery) ga.addEncodedQuery(encQuery);
    ga.groupBy(field);
    ga.addAggregate("COUNT"); // driver
    ga.query();
    var out = [];
    while (ga.next()) out.push(String(ga.getValue(field)));
    return out;
  },

  /**
   * Stats via GA.
   * aggregate = { fn:'AVG'|'SUM'|'MIN'|'MAX'|'COUNT', field:'duration' }
   * groupBy = ['assignment_group','priority']
   */
  stats: function (table, aggregate, groupBy, encQuery) {
    var fn =
      aggregate && aggregate.fn ? String(aggregate.fn).toUpperCase() : "COUNT";
    var fld = (aggregate && aggregate.field) || "sys_id";
    var ga = new GlideAggregate(table);
    if (encQuery) ga.addEncodedQuery(encQuery);
    (groupBy || []).forEach(function (g) {
      if (g) ga.groupBy(g);
    });
    ga.addAggregate(fn, fld);
    ga.query();
    var out = [];
    while (ga.next()) {
      var row = {};
      (groupBy || []).forEach(function (g) {
        row[g] = String(ga.getValue(g));
      });
      row.fn = fn;
      row.field = fld;
      row.value = ga.getAggregate(fn, fld);
      out.push(row);
    }
    return out;
  },

  /** One record via GlideRecord */
  one: function (table, encQuery, fields, orderBy) {
    var gr = new GlideRecord(table);
    gr.addEncodedQuery(encQuery || "");
    this._applyOrder(gr, orderBy);
    gr.setLimit(1);
    gr.query();
    if (!gr.next()) return null;
    return this._pick(gr, fields);
  },

  /** List via GlideRecord */
  list: function (table, encQuery, fields, limit, orderBy) {
    var gr = new GlideRecord(table);
    gr.addEncodedQuery(encQuery || "");
    this._applyOrder(gr, orderBy);
    if (limit) gr.setLimit(limit);
    gr.query();
    var out = [];
    while (gr.next()) out.push(this._pick(gr, fields));
    return out;
  },

  /** Quick schema: field name, label, type, ref, mandatory */
  describe: function (table) {
    var gr = new GlideRecord(table);
    gr.initialize();
    var fields = gr.getFields(),
      out = [];
    for (var i = 0; i < fields.size(); i++) {
      var f = fields.get(i),
        ed = f.getED();
      out.push({
        name: f.getName(),
        label: ed.getLabel(),
        type: ed.getInternalType(),
        ref: ed.getReference() || "",
        mandatory: ed.getMandatory(),
      });
    }
    return out;
  },

  /** Tiny peek — returns display value (number/ID) for the first match */
  preview: function (table, encQuery) {
    var gr = new GlideRecord(table);
    gr.addEncodedQuery(encQuery || "");
    gr.setLimit(1);
    gr.query();
    if (gr.next()) return gr.getDisplayValue("number") || gr.getUniqueValue();
    return null;
  },

  // --- helpers ---
  _applyOrder: function (gr, orderBy) {
    if (!orderBy) return;
    if (orderBy.indexOf("-") === 0) gr.orderByDesc(orderBy.substring(1));
    else gr.orderBy(orderBy);
  },

  _pick: function (gr, fields) {
    var obj = {};
    if (Array.isArray(fields) && fields.length) {
      fields.forEach(function (f) {
        obj[f] = gr.getDisplayValue(f);
      });
    } else {
      obj.sys_id = gr.getUniqueValue();
      if (gr.isValidField("number")) obj.number = gr.getValue("number");
      if (gr.isValidField("short_description"))
        obj.short_description = gr.getValue("short_description");
    }
    return obj;
  },

  type: "SmartData",
};
