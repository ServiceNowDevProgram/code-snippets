// A wrapper for fields that return both a raw value and a display value
export type DisplayableString = {
  value: string           // Raw value (e.g., sys_id, code)
  display_value: string   // Human-readable value (e.g., "John Doe")
}

// Represents a User record in ServiceNow
export type User = {
  sys_id: DisplayableString     // Unique system identifier of the user
  user_name: DisplayableString  // Username (login name)
  first_name: DisplayableString // User's first name
  last_name: DisplayableString  // User's last name
}

// Represents a Configuration Item (CI) record
export type CI = {
  sys_id: DisplayableString          // Unique system identifier of the CI
  install_status: DisplayableString  // Installation status (e.g., installed, pending)
  name: DisplayableString            // Display name of the CI
}

// Represents an Incident record in ServiceNow
export type Incident = {
  sys_id: DisplayableString          // Unique system identifier of the incident
  number: DisplayableString          // Incident number
  short_description: DisplayableString  // Brief description of the incident
  caller_id: User                       // Linked User record (caller)
  cmdb_ci: CI                           // Linked Configuration Item record
}
