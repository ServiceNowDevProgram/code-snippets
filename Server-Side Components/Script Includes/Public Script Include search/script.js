var publicSIArr = [];
var nonPublicSIArr = [];
var currentScope = gs.getCurrentScopeName() == 'rhino.global' ? 'global' : gs.getCurrentScopeName();

var scriptIncludeGR = new GlideRecord('sys_script_include');
scriptIncludeGR.addActiveQuery();
scriptIncludeGR.addQuery('client_callable', true);
scriptIncludeGR.addQuery('sys_scope.scope', currentScope).addOrCondition('access', '!=', 'package_private');
scriptIncludeGR.query();
while (scriptIncludeGR.next()) {
	var apiNameArr = scriptIncludeGR.getValue('api_name').split('.');
	var scope = apiNameArr[0];
	var name = apiNameArr[1];

	try {
		var klass = this[scope][name].prototype;

		if (typeof klass.isPublic === 'function') {
			var isPublic = klass.isPublic();

			if (isPublic === true) {
				publicSIArr.push(name);
			} else {
				nonPublicSIArr.push(name);
			}
		}
	} catch (e) {
		gs.log(name + ' ' + e);
	}
}

gs.log('Count of public Script Includes: ' + publicSIArr.length);
gs.log('Public Script Includes: ' + publicSIArr.toString());
gs.log('Count of explicitly non-public Script Includes: ' + nonPublicSIArr.length);
gs.log('Explicitly non-public Script Includes: ' + nonPublicSIArr.toString());