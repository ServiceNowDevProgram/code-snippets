function spGlideAjaxService($http, $q, $httpParamSerializerJQLike){
	
	function parseXMLAttribute(response, attr){	
		var xml = new DOMParser().parseFromString(response.data, 'text/xml');
		return xml ? xml.documentElement.getAttribute(attr) : null;		
	}
		
	this.getAnswer = function(processor, name, params){
		var deferred = $q.defer();
		var data = angular.extend({
			sysparm_processor:  processor,
			sysparm_name: name		
		}, params);

		var config = {headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		}};

		$http.post('xmlhttp.do', $httpParamSerializerJQLike(data), config).then(function(response){
			deferred.resolve(parseXMLAttribute(response, 'answer'));
		}, function(response){
			deferred.reject(parseXMLAttribute(response, 'error'));
		});
		return deferred.promise;
	};

}
