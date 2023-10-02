schema {
    query: Query // This is schema for querying data
}

type Query {
	EntersysId(sys_id:ID!):incident  // Entry point of data, you can define your own as per your requirement.
}
type incident{
	sys_id:DisplayableString // DisplayableString is a type of data.
	number:DisplayableString
	short_description:DisplayableString
	caller_id:User @source(value:"caller_id.value")  // @source is used to get the details from extended tables.
	cmdb_ci:CI @source(value:"cmdb_ci.value")  // @source is used to get the details from extended tables.
}
type User{
	sys_id:DisplayableString
	user_name:DisplayableString
	first_name:DisplayableString  // These are the metadata of caller id in incident.
	last_name:DisplayableString
}
type CI{
	sys_id:DisplayableString
	install_status:DisplayableString  // These are the metadata of configuration item in incident.
	name:DisplayableString
}
type DisplayableString{
	value:String  // This will return the value of defined parameter.
	display_value:String  // This will return the display value of defined parameter.
}
