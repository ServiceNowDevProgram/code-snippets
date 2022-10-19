var term = "SEARCH TERM"; //use comma to separate terms
var useAndQuery = true; //search for term 1 and term 2. If false, it will look for term 1 or term 2.
var debug = false; //set this true if you want to troubleshoot the script.
var delimiter = ","; //if you want to split terms on something other than a comma

var globalScriptSearch = {

   search: null,
   
   delimiter: ",",
   
   out: ["\n"],
   
   debug: false,
   
   useAndQuery: true,   

   /* Main method that calls all the sub-methods.*/
   search: function(term, useAndQuery, debug, delimiter) {
      if (typeof debug != "undefined") this.debug = debug;
      if (typeof delimiter != "undefined") this.delimiter = delimiter;
      if (typeof useAndQuery != "undefined") this.useAndQuery = useAndQuery;
      if (typeof term != "string") {
         gs.print("GlobalScriptSearch - ERROR: must pass a valid search term to search");
         return false;
      }
      this.search = term;
      this._searchLocations();
      this._searchFieldTypes();
      this._searchWorkflow();
      gs.print(this.out.join("\n"));
      return true;
   },
   
  /* Adds all the fields that are not script fields and that don't 
    * have the word script starting/ending their names to fieldList. */
   _searchLocations: function() {
      var locations = {
         "question": "default_value",
         "sys_trigger": "job_context”,
         "sys_ui_style": “value",
         "sys_dictionary": "calculation",
         "sys_dictionary_override": "calculation",
         "sys_ui_macro": "xml",
         "sys_ui_page": "html",
         "sys_ui_style": "value",
         "sys_impex_entry": "default_value",
         "content_type": "summary",
         "content_type": "detail",
         "content_block_programmatic": "programmatic_content",
      }
      for (var location in locations) {
         this._searchLocation(location, locations[location]);
      }
   },
   
   /* Builds a the dynamic list of field names from sys_dictionary that should be searched */
   _searchFieldTypes: function() {
      var fieldList = new GlideRecord("sys_dictionary");
      var fieldTypes = ["script_plain", "script", "email_script", "condition_string", "conditions"];
      var aq = null;
      for (var ic = 0; ic < fieldTypes.length; ic++) {
         if (aq == null)
            aq = fieldList.addQuery("internal_type", fieldTypes[ic]);
         else
            aq.addOrCondition("internal_type", fieldTypes[ic]);
      }
      this._searchFieldsNamedScript(aq);

      //exclude all field types that don't come from String
      var nonString = new GlideRecord("sys_glide_object");
      nonString.addQuery("scalar_type", "!=", "string");
      nonString.query();
      while (nonString.next()) {
         fieldList.addQuery("internal_type", "!=", nonString.name + "");
      }
      fieldList.addQuery("internal_type", "!=", "boolean");
      fieldList.query();
      while (fieldList.next()) {
         if (fieldList.name.indexOf("var__") >= 0)
            continue;
         this._searchLocation(fieldList.name, fieldList.element);
      }
   },
   
   /* Adds an OR condition to fieldList for any field whose name starts or ends with "script" */
   _searchFieldsNamedScript: function(addQuery) {
      addQuery.addOrCondition("element", "ENDSWITH", "script");
      addQuery.addOrCondition("element", "STARTSWITH", "script");
   },
   
   /* Special handling for the workflow variable fields */
   _searchWorkflow: function() {
      var allDocs = [];
      var tableName = 'sys_variable_value';
      var fieldName = 'value';
      var rec = new GlideRecord(tableName);
      rec.addQuery('document', 'wf_activity');
      var qc = rec.addQuery('variable.element', 'CONTAINS', 'script');
      qc.addOrCondition('variable.internal_type', 'CONTAINS', 'script');
      var terms = this.search.split(this.delimiter);
      for (var ib = 0; ib < terms.length; ib++) {
         if (this.useAndQuery) {
            rec.addQuery(fieldName, 'CONTAINS', terms[ib]);
         } else {
            if (ib == 0)
               var aq = rec.addQuery(fieldName, "CONTAINS", terms[ib]);
            else
               aq.addOrCondition(fieldName, "CONTAINS", terms[ib]);
         }
      }
      this._addMatches(tableName, fieldName, rec);
   },
   
   /* Looks in a particluar field in a particular table for all documents that match the search term. */
   _searchLocation: function(table, field) {
      var fieldName = field + "";
      var tableName = table + "";
      if (this.debug)
         gs.print("_searchLocation: " + tableName + " " + fieldName);
      var target = new GlideRecord(tableName);
      if (!target.isValid()) {
         gs.print("GlobalScriptSearch - ERRROR: " + tableName + " was an invalid table name (field: " + fieldName + ").");
         return;
      }
      var terms = this.search.split(this.delimiter);
      if (this.debug)
       gs.print("_searchLocation: terms.length " + terms.length);
      if (this.useAndQuery) {
         for (var ia = 0; ia < terms.length; ia++) {
            target.addQuery(fieldName, "CONTAINS", terms[ia]);
         }
      } else {
         var aq;
         for (var ia = 0; ia < terms.length; ia++) {
            if (ia == 0)
               var aq = target.addQuery(fieldName, "CONTAINS", terms[ia]);
            else
               aq.addOrCondition(fieldName, "CONTAINS", terms[ia]);
         }
      }
      this._addMatches(tableName, fieldName, target);
   },

   /* Output matching files to the logs. */
   _addMatches: function(tableName, fieldName, match) {
      try {
         match.query();
         if (match.getRowCount() < 1) return;
         var matchList = [];
         this.out.push("\n\n*** Searching - " + tableName + "." + fieldName + " ***");
         while(match.next()) {
            matchList.push(match.sys_id+"");
            this.out.push(match.getClassDisplayValue() + " - " + match.getDisplayValue() + ": /" + tableName + ".do?sys_id=" + match.sys_id);
         }
         this.out.push("\n[All matches] /" + tableName + "_list.do?sysparm_query=sys_idIN" + matchList.join(","));
      } catch(e) {
         gs.print("GlobalScriptSearch - ERRROR: failure while trying to insert match " + e);
      }
   },
   
   type: 'GlobalScriptSearch'
}

globalScriptSearch.search(term, useAndQuery, debug, delimiter);
