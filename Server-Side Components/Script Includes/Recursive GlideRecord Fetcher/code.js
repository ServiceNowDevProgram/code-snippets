var RecursiveFetcher = Class.create();
RecursiveFetcher.prototype = {
    initialize: function(tableName, parentField) {
        this.tableName = tableName;
        this.parentField = parentField;
        this.visited = [];
    },

    fetchChildren: function(parentSysId) {
        if (this.visited.indexOf(parentSysId) !== -1) {
            // Avoid infinite loops
            return [];
        }

        this.visited.push(parentSysId);
        var children = [];

        var gr = new GlideRecord(this.tableName);
        gr.addQuery(this.parentField, parentSysId);
        gr.query();

        while (gr.next()) {
            var child = {
                sys_id: gr.getValue('sys_id'),
                name: gr.getDisplayValue('name') || gr.getDisplayValue('short_description'),
                children: this.fetchChildren(gr.getValue('sys_id')) // Recursive call
            };
            children.push(child);
        }

        return children;
    },

    type: 'RecursiveFetcher'
};

// Example usage:
//var fetcher = new RecursiveFetcher('task', 'parent');
//var hierarchy = fetcher.fetchChildren('abc123sysid'); // Replace with actual parent sys_id
//gs.info(JSON.stringify(hierarchy));
``
