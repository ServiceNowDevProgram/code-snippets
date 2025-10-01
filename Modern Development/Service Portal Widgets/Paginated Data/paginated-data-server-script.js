(function() {
	// Configuration
	data.recordsTable = 'task';
	data.recordsQuery = ''; // The encoded query to filter records (empty means all records)
	data.recordsFields = ['number', 'short_description']; // The fields to retrieve for each record
	data.recordsPerPage = parseInt($sp.getParameter('display')) || 10;
	data.userQuery = $sp.getParameter('query');

	// Get pagination parameters
	data.page_id = $sp.getParameter('id');
	data.page = parseInt($sp.getParameter('page'), 10) || 1; // Current page number, default to 1
	data.display = parseInt(data.recordsPerPage, 10) > 0 ? parseInt(data.recordsPerPage, 10) : 10; // Amount of records to display per page

	// Count total records
	var countGa = new GlideAggregate(data.recordsTable);
	countGa.addEncodedQuery(data.recordsQuery);
	countGa.addEncodedQuery(data.userQuery);
	countGa.addAggregate('COUNT');
	countGa.query();
	if (countGa.next()) {
		data.count = parseInt(countGa.getAggregate('COUNT'), 10);
	}

	data.pages = calculatePaginationPages(data.count, data.display, data.page);

	// Adjust current page if it exceeds the total number of pages
	if (data.pages[data.pages.length - 1] < data.page) {
		data.page = Math.ceil(data.count / data.display);
	}

	// Calculate the starting row for the current page
	data.rowStart = (data.page - 1) * data.display;
	var rowEnd = data.rowStart + data.display;

	// Fetch records for the current page
	data.records = [];
	var recordsGr = new GlideRecord(data.recordsTable);
	recordsGr.addEncodedQuery(data.recordsQuery);
	recordsGr.addEncodedQuery(data.userQuery);
	recordsGr.chooseWindow(data.rowStart, rowEnd);
	recordsGr.query();
	while (recordsGr.next()) {
		var record = {};
		for (var i = 0; i < data.recordsFields.length; i++) {
			var fieldName = data.recordsFields[i];
			record[fieldName] = (recordsGr.getElement(fieldName) + "").trim();
		}
		data.records.push(record);
	}

	/**
	 * Calculates the page numbers to display in the pagination control
	 * @param {number} totalRecords - Total number of records
	 * @param {number} recordsPerPage - Number of records per page
	 * @param {number} currentPage - Current page number
	 * @returns {Array} An array of page numbers and ellipses to display
	 */
	function calculatePaginationPages(totalRecords, recordsPerPage, currentPage) {
		if (recordsPerPage <= 0) {
			return [];
		}

		var totalPages = Math.ceil(totalRecords / recordsPerPage);
		var pages = [];
		var startPage, endPage;

		// Determine the range of pages to display
		if (totalPages <= 7) {
			// If 7 or fewer pages, show all
			startPage = 1;
			endPage = totalPages;
		} else {
			// For more than 7 pages, use a sliding window
			if (currentPage < 4) {
				startPage = 1;
				endPage = 5;
			} else if (currentPage === 5) {
				startPage = 3;
				endPage = 7;
			} else if (currentPage + 2 >= totalPages) {
				startPage = totalPages - 4;
				endPage = totalPages;
			} else {
				startPage = currentPage - 2;
				endPage = currentPage + 2;
			}
		}

		// Add first page and ellipsis if necessary
		if (startPage > 1) {
			pages.push(1);
			if (startPage > 2) {
				pages.push('...');
			}
		}

		// Add page numbers
		for (var i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		// Add last page and ellipsis if necessary
		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				pages.push('...');
			}
			pages.push(totalPages);
		}

		return pages;
	}
})();
