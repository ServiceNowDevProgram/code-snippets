function hasRoleExactly(role) {
    var arrayUtil = new ArrayUtil();
    var roles = gs.getSession().getRoles() + ''; 
    var roleArray = roles.split(","); 
    var isAuthorized = arrayUtil.contains(roleArray, role); 
    return isAuthorized; 
}