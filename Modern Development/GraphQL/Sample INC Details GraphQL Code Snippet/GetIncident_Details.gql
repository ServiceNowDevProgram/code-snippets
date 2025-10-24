schema {
    query: Query
}

type Query {
   EntersysID(sys_id:ID!):incident
}

type incident{
    sys_id:DisplayableString
	number:DisplayableString
	short_description:DisplayableString
	caller_id: User @source(value:"caller_id.value")
	cmdb_ci: CI @source(value:"cmdb_ci.value")
}

type User{
	sys_id:DisplayableString
	user_name:DisplayableString
	first_name:DisplayableString
	last_name:DisplayableString
	email:DisplayableString
}

type CI{
	sys_id:DisplayableString
	install_status:DisplayableString
	name:DisplayableString
}

type DisplayableString{
	value:String
	display_value:String
}
