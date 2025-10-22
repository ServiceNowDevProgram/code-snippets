var MRVSUtils = Class.create();

// Default configuration for the MutationObserver
MRVSUtils.OBSERVER_CONFIG = {
    subtree: true,
    childList: true
};

MRVSUtils.prototype = {
    /*
     * initialise the MRVSUtils instance
     * @param {String} Name of multi-row variable set to watch
     */
    initialize: function (mrvsName) {
        this.mrvsID = g_form.getControl(mrvsName).id;
        this.mrvsID = this.mrvsID.replace(/(.*:)/, '');
        this.table = document.getElementById(this.mrvsID + "_table");
        this.columnNames = this._getColumnNames();
        this.rowIds_Old = [];
        this.rowIds = [];
        this.isUpdate = false;
    },

    /*
     * Process all mutations from the observer
     * @param {MutationList} Array of all mutations observed
     * @returns {JSON} Array of updates
     */
    processMutations: function (mutations) {
        this._updateRowIds();
        var mutationList = this._filterEvents(mutations);
        return this._processMutation(mutationList[0]);
    },

    /*
     * Get the table ID for the multi-row variable set
     * @return {string} (sys_id)_table
     */
    getTableID: function () {
        return [this.mrvsID, "table"].join('_');
    },

    /*
     * get list of column names
     * used when building the modified data JSON
     */
    _getColumnNames: function () {
        var columnNames = [];
        var headers = this.table.getElementsByTagName('th');
        for (var _col = 0; _col < headers.length; _col++) {
            columnNames.push(headers[_col].innerText);
        }

        return columnNames;
    },

    /* 
     * re-scan the MRVS table to get an up to date list of rows
     */
    _updateRowIds: function () {
        this.rowIds = [];
        var body = this.table.getElementsByTagName('tbody');
        var rows = body[0].getElementsByTagName('tr');
        for (var _row = 0; _row < rows.length; _row++) {
            this.rowIds.push(rows[_row].id);
        }
    },

    /*
     * check if this is an mutation we care about
     * basically, if it's a update to TBODY and has either added or removed nodes,
     * or it's a updated row which should give us both added and removed for a single TD (however this is
     * not guaranteed if the original cell value was empty)
     */
    _isUpdateEvent: function (mutation) {
        var isAddDelete = ((mutation.target.nodeName == 'TBODY' && mutation.target.id == 'empty_table_row') &&
            ((mutation.removedNodes.length > 0 && mutation.removedNodes[0].className != 'list2_no_records') ||
                (mutation.addedNodes.length > 0 && mutation.addedNodes[0].className != 'list2_no_records')));
        var isUpdate = (mutation.target.nodeName == 'TD' && (mutation.removedNodes.length > 0 || mutation.addedNodes.length > 0));
        return isAddDelete || isUpdate;
    },

    /*
     * for the given node, get the cells contents
     */
    _getCellData: function (node, rowIds) {
        var cellData = {};
        var cells = node.cells;
        for (var i = 0; i < cells.length; i++) {
            if (cells[i].className == 'vt') cellData[this.columnNames[i]] = cells[i].innerText;
        }

        cellData.row_number = rowIds.indexOf(node.id) > -1 ? rowIds.indexOf(node.id) + 1 : undefined;
        cellData.row_id = node.id;
        return cellData;
    },

    /*
     * process the given nodes (either added or deleted) and build the response using the cell data
     */
    _getNodeData: function (nodes, rowIds) {
        var modifiedRows = [];
        nodes.forEach(function (_node, _index, _list) {
            modifiedRows.push(this._getCellData(_node, rowIds));
        }, this);
        return modifiedRows;
    },

    /*
     * given a mutation, build the JSON response depending on the mutation type
     */
    _processMutation: function (mutation) {
        var modifiedData = {};
        if (this.isUpdate) { // special handling as some updates only have a single event
            // this is a row update
            modifiedData.updated = this._getCellData(mutation.target.parentElement, this.rowIds);
        } else if (mutation.addedNodes.length && mutation.removedNodes.length == 0) {
            modifiedData.added = this._getNodeData(mutation.addedNodes, this.rowIds);
        } else {
            // pass in the old row_id list otherwise we won't know what row was release.
            modifiedData.removed = this._getNodeData(mutation.removedNodes, this.rowIds_Old);
        }

        this.rowIds_Old = this.rowIds;
        return modifiedData;
    },

    /*
     * filter the mutation list for mutations we care about
     * If only one mutation is provided then it's assumed it's a row update (based on extensive testing!!)
     */
    _filterEvents: function (mutationList) {
        this.isUpdate = false;
        if (mutationList.length > 1) {
            mutationList = mutationList.filter(function (_mutation) {
                return this._isUpdateEvent(_mutation);
            }, this);
        } else {
            this.isUpdate = (mutationList[0].addedNodes.length > 0 && mutationList[0].removedNodes.length > 0);
        }
        return mutationList;
    }
};
