(function paginate(variables, pageResponse) {
    // Parse the limit (maximum number of records per page) from the variables
    var limit = parseInt(variables.limit);

    // Extract the total number of records from the response headers (usually provided by the external API)
    var totalCount = parseInt(pageResponse.response_headers['X-Total-Count']);

    // Parse the current offset (starting point for the current page of records)
    var currentOffset = parseInt(variables.offset);

    // Calculate the offset for the next page by adding the limit to the current offset
    var nextOffset = currentOffset + limit;

    // Check if the next offset is still within the total number of records
    if (nextOffset < totalCount) {
        // If there are still more records to retrieve, set the flag to true to get the next page
        variables.getNextPage = true;

        // Update the offset for the next page, converting the number back to a string
        variables.offset = nextOffset.toString();
    } else {
        // If there are no more records to retrieve, set the flag to false to stop further pagination
        variables.getNextPage = false;
    }
})(variables, pageResponse);
