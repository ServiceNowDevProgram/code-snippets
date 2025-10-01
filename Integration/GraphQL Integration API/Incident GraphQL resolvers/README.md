I have created a graphql API, which helps to get the details of incident record with details of caller and configuration item. I have defined the schema which is basically entry point of data after that, created resolvers which defines the logic of graphql schema that how you will get the values from server.
User Resolver: It will help to get the details of caller_id like (sys_id, first_name, last_name etc.) from the server.
CI Resolver: It will help to get the details of configuration item like (sys_id, operational_status etc.)from the server .
Incident Resolver: It will help to get the details of incident from the server (like short_description, description etc.) based on provided sys_id in schema .

### Folder Structure

- `schema.graphql`  
  Contains the GraphQL schema defining queries and types (Incident, User, CI, DisplayableString).  

- `types.ts`  
  TypeScript type aliases matching the schema for type safety and IDE autocompletion.

### How It Works

1. Client queries the API using `EntersysId(sys_id: ID!)`.
2. Incident Resolver fetches the main incident record.
3. User Resolver fetches the caller details for `caller_id`.
4. CI Resolver fetches the configuration item details for `cmdb_ci`.
5. API returns a nested object containing Incident, User, and CI information.

### Example Query

```graphql
query {
  EntersysId(sys_id: "12345") {
    number {
      value
      display_value
    }
    short_description {
      value
    }
    caller_id {
      first_name {
        value
      }
      last_name {
        value
      }
    }
    cmdb_ci {
      name {
        value
      }
      install_status {
        value
      }
    }
  }
}
```

### Notes / Contribution

```
    - The schema and types help developers understand the API structure.  
    - Contributions are welcome, such as:  
    - Adding more example queries  
    - Adding error handling  
    - Improving documentation for nested fields
```