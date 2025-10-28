function($http) {
  var c = this;

  c.languages = [
    { code: 'en',    label: 'English',             flag: '🇬🇧' },
    { code: 'pb', 	 label: 'Portuguese (Brazil)', flag: '🇧🇷' },
    { code: 'es',    label: 'Spanish',             flag: '🇪🇸' },
    { code: 'fr',    label: 'French',           	 flag: '🇫🇷' },
    { code: 'de',    label: 'German',            	 flag: '🇩🇪' },
    { code: 'it',    label: 'Italian',           	 flag: '🇮🇹' }
  ];

  c.userId = c.data.user_id;
  c.selected = c.data.language || 'en';

  c.changeLang = function() {
    $http.patch('/api/now/table/sys_user/' + c.userId, { preferred_language: c.selected })
      .then(function(response) {
        location.reload();
      });
  };
}
