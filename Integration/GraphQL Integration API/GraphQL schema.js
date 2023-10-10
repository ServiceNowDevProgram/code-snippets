schema {
    query: Query
}

type Query {
	EntersysId(sys_id:ID!):incident  // Entery point of data, you can define your own as per your requirement.
}
type incident{
	sys_id:DisplayableString  // This is the type of data.
	number:DisplayableString
	short_description:DisplayableString
	caller_id:User @source(value:"caller_id.value")  // @source is used for extended tables, here caller_id extends to sys_user table.
	cmdb_ci:CI @source(value:"cmdb_ci.value")  //@source is used for extended tables, here configuration item extends to cmdb_ci table.
}
type User{
	sys_id:DisplayableString
	user_name:DisplayableString   // This will return the information of user (caller_id).
	first_name:DisplayableString
	last_name:DisplayableString
}
type CI{
	sys_id:DisplayableString
	install_status:DisplayableString  // This will return the information of configuration item (CI).
	name:DisplayableString
}
type DisplayableString{
	value:String  \\ This will return the value.
	display_value:String  \\This will return the display value.
}
