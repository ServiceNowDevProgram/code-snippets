Reassign Tasks When Assigned User Is Inactive

Automatically detect and reassign open tasks like incidents, changes, etc. when the currently assigned user becomes inactive.

Use Case Scenario
Fetch all inactive users active = false.

For each inactive user:

Find all open tasks assigned to them.

If a manager exists - reassign tasks to that manager.

If not - assign tasks to a default support group.

Add a work note explaining the automatic reassignment.
