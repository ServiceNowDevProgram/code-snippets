(function executeRule(current) {

	var _strCurrentTable = String(current.getTableName() || '');
	var _strCurrentURL   = String(gs.action.getGlideURI() || '');

	if (_strCurrentTable.length === 0) {
		return;
	}

	//only continue with form views in the Classic UI
	if (!_strCurrentURL.startsWith(_strCurrentTable + '.do')) {
		return;
	}

	//determine the unique artifact ID
	var _strUpdateName = 
		String(
			current.getValue('sys_update_name') || 
			new GlideUpdateManager2().getUpdateName(current) ||
			''
		);

	//Is this artifact tracked with versions?
	if (_strUpdateName.length > 0) {
		var _grUpdateXml = new GlideRecord('sys_update_xml');

		//query all versions
		_grUpdateXml.addQuery('name', _strUpdateName);
		_grUpdateXml.orderByDesc('sys_updated_on');
		_grUpdateXml.setLimit(1);
		_grUpdateXml.query();

		//was the artifact changed and has a baseline version available?
		if (_grUpdateXml.next() && !_grUpdateXml.replace_on_upgrade) {		
			var _isOOTB    = false;
			var _grVersion = new GlideRecord('sys_update_version');

			_grVersion.addQuery('name', _strUpdateName);
			_grVersion.orderByDesc('sys_recorded_at');
			_grVersion.query();

			//iterate the versions to check whether this is an OOTB artifact
			while (!_isOOTB && _grVersion.next()) {
				var _strSource = _grVersion.getValue('source_table') || '';

				_isOOTB = _strSource === 'sys_upgrade_history' || _strSource === 'sys_store_app';
			}

			if (_isOOTB) {
				gs.addErrorMessage(
					'This OOTB artifact was changed and thus will create an skipped record during the next ' +
					'upgrade!<br><br>In case the change was done accidentally, you should revert to the <a href="' + 
          _grVersion.getLink(true) + '" target="_blank">most recent OOTB version.</a>'
				);
			}
		}
	}

})(current);
