(function(){
	
	// false - only directly assigned roles
	// true - roles inherited from other roles or groups
	var include_inherited_roles = false;
	
	// Username of the two users we want to compare roles agaist
	var username_a = "abel.tuter";
	var username_b = "abraham.lincoln";

	var set_a = [];
	var set_b = [];
	
	// Query for user A's roles
	var gr_user_a = new GlideRecord("sys_user_has_role");
	gr_user_a.addQuery("user.user_name", username_a);
	if(!include_inherited_roles)
		gr_user_a.addQuery("inherited", false);
	gr_user_a.addQuery("state","active");
	gr_user_a.query();
	while(gr_user_a.next())
		set_a.push(gr_user_a.role.name.toString());
	
	
	// Query for user B's roles
	var gr_user_b = new GlideRecord("sys_user_has_role");
	gr_user_b.addQuery("user.user_name", username_b);
	if(!include_inherited_roles)
		gr_user_b.addQuery("inherited", false);
	gr_user_b.addQuery("state","active");
	gr_user_b.query();
	while(gr_user_b.next())
		set_b.push(gr_user_b.role.name.toString());
	
	// Roles that A has that B does not have
	var a_not_b = set_a.concat(set_b).filter( function(value, index, self){return set_b.indexOf(value) < 0;} );
	// Roles that B has that A does not have
	var b_not_a = set_a.concat(set_b).filter( function(value, index, self){return set_a.indexOf(value) < 0;} );
	// Roles that both A and B have
	var a_intersect_b = set_a.concat(set_b).filter( function(value, index, self){return set_b.indexOf(value) >= 0 && set_a.indexOf(value) >= 0;} ).filter(function(value, index, self){return self.indexOf(value) === index;});
	
	gs.print("\n-Exclusive Role(s) to " + username_a + ":\n\t" + a_not_b.join("\n\t") + "\n\n-Exclusive Role(s) to " + username_b + ":\n\t" + b_not_a.join("\n\t") + "\n\n-Shared Roles:\n\t" + a_intersect_b.join("\n\t"));
})();
