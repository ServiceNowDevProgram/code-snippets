function hasRoleExactly(role) {
    // Java String to JavaScript String
    var roles = gs.getSession().getRoles() + '';
    var roleArr = roles.split(',');
    return roleArr.indexOf(role) !== -1;
}
