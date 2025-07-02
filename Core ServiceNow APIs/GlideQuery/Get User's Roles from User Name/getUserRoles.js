function getUserRoles(userName) {

    var gqRoles = new global.GlideQuery('sys_user_has_role')
        .where('user.user_name', userName)
        .select('role$DISPLAY')
        // use .reduce() instead of .toArray() as it allows us to strip out only whats needed, and doesn't need to know the number of entries.
        .reduce(function (arr, e) {
            arr.push(e.role$DISPLAY);
            return arr;
        }, []);

    return gqRoles;
};

gs.info(getUserRoles('bow.ruggeri'));
