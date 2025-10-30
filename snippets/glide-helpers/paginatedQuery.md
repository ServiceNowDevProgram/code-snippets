# paginatedQuery

> Retrieve GlideRecord results in batches (pagination) to avoid large query memory issues.

**Use case:**  
During a data-cleanup automation, I hit performance issues when querying 20k+ incidents. This helper lets you fetch results in pages (e.g., 100 at a time).

```javascript
/**
 * paginatedQuery(table, query, limit, callback)
 * Executes callback for each batch of records.
 */
function paginatedQuery(table, query, limit, callback) {
  var offset = 0, hasMore = true;
  while (hasMore) {
    var gr = new GlideRecord(table);
    gr.addEncodedQuery(query);
    gr.orderBy('sys_created_on');
    gr.setLimit(limit);
    gr.setOffset(offset);
    gr.query();

    var count = 0;
    while (gr.next()) {
      callback(gr);
      count++;
    }

    if (count < limit) {
      hasMore = false;
    } else {
      offset += limit;
    }
  }
}

// Example:
paginatedQuery('incident', 'active=true', 100, function(gr) {
  gs.info('Processing ' + gr.number);
});
