(function process(request, response) {
  var email = request.queryParams.email;
  var userGR = new GlideRecord('sys_user');
  userGR.addQuery('email', email);
  userGR.query();

  if (userGR.next()) {
    return {
      name: userGR.getValue('name'),
      title: userGR.getValue('title'),
      department: userGR.getDisplayValue('department'),
      location: userGR.getDisplayValue('location')
    };
  } else {
    response.setStatus(404);
    return { error: 'User not found' };
  }
})(request, response);
