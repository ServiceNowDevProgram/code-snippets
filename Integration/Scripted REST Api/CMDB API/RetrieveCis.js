(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // implement resource here
	return new CmdbApi(request, response).getCis();

})(request, response);
