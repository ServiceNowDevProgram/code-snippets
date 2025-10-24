I have created a graphql API, which helps to get the details of incident record with details of caller and configuration item. I have defined the schema which is basically entry point of data after that, created resolvers which defines the logic of graphql schema that how you will get the values from server.
User Resolver: It will help to get the details of caller_id like (sys_id, first_name, last_name etc.) from the server.
CI Resolver: It will help to get the details of configuration item like (sys_id, operational_status etc.)from the server .
Incident Resolver: It will help to get the details of incident from the server (like short_description, description etc.) based on provided sys_id in schema .
