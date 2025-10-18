/**
 * Name: SmartDataAjax
 * Type: Script Include (server-side, client-callable)
 * Extends: AbstractAjaxProcessor
 * Author: Abhishek
 * Security: Escapes encoded queries via GlideStringUtil.escapeQueryTermSeparator
 */
var SmartDataAjax = Class.create();
SmartDataAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  /**
   * Client-callable entry.
   * Expected params:
   *  - sysparm_table
   *  - sysparm_query
   *  - sysparm_want
   *  - sysparm_fields (comma-separated)
   *  - sysparm_limit
   *  - sysparm_orderBy
   *  - sysparm_field
   *  - sysparm_groupBy (comma-separated)
   *  - sysparm_fn
   *  - sysparm_fn_field
   */
  query: function () {
    var rawQuery = this.getParameter("sysparm_query") || "";
    var safeQuery = GlideStringUtil.escapeQueryTermSeparator(rawQuery); // 🔒 protect separators

    var params = {
      table: this.getParameter("sysparm_table"),
      query: safeQuery,
      want: this.getParameter("sysparm_want"),
      fields: (this.getParameter("sysparm_fields") || "")
        .split(",")
        .filter(Boolean),
      limit: parseInt(this.getParameter("sysparm_limit"), 10) || null,
      orderBy: this.getParameter("sysparm_orderBy"),
      field: this.getParameter("sysparm_field"),
      groupBy: (this.getParameter("sysparm_groupBy") || "")
        .split(",")
        .filter(Boolean),
      aggregate: {
        fn: this.getParameter("sysparm_fn"),
        field: this.getParameter("sysparm_fn_field"),
      },
    };

    var sd = new SmartData();
    var result = sd.query(params);
    return new global.JSON().encode(result);
  },

  /** health check */
  ping: function () {
    return "ok";
  },

  type: "SmartDataAjax",
});
