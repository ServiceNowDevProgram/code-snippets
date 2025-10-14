//Server script:
(function () {
  //get the data parameter with base64encoded json with field names for keys and matching values
	data.encodedData = $sp.getParameter("data");
	try {
    //turn the data back into a js object
		data.decodedData = JSON.parse(GlideStringUtil.base64Decode(data.encodedData));
	} catch (e) {
		//bad json; do nothing
		return;
	}
})();


//Client controller: 
api.controller = function ($scope, $rootScope) {

	var c = this,
		g_form = $scope.page.g_form,
		answerMap = c.data.decodedData;
  // return if the answermap is not a valid object
	if (!answerMap instanceof Object)
		return;
  // if we have g_form set values from the data parameter to form
	if (g_form) {
		fillAnswers();
	}
  //loops through the object with field name keys and corresponding values and sets values
	function fillAnswers() {
		for (key in answerMap) {
			if (!answerMap.hasOwnProperty(key) && !g_form.hasField(key))
				continue;
			g_form.setValue(key, answerMap[key]);
		}
	}
  //get gform from the spmodel
	$rootScope.$on('spModel.gForm.initialized', function (e, gFormInstance) {
		g_form = gFormInstance;
		fillAnswers();
	});
};
