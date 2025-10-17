**Use-case:**
The primary goal of this UI Action is load-balancing.
It assigns tasks based on the fewest currently Active tasks assigned to a member in a group.

**Example Scenario**:
An assignment group has 10 members. Instead of assigning a new task to the whole group or any random member, the user/agent clicks on
"Smart Assign" to find the member with the fewest currently Active tasks in the same group and assign the task to them.

**UI Action Name:**
Smart Assign

**Condition**: !current.assignment_group.nil() && current.assigned_to.nil()

**How it works:**
1. The code queries the Group members table to find every single user associated with the currently selected assignment group.
   If someone removes a previous assignement group and then clicks on Smart Assign button, they are shown an error message to choose an Assignment group.
2. There is a loop on the task table. This loop uses GlideAggregate to count how many active records are assigned to a specific user.
3. It tracks the user that has the lowest count of tasks assigned to them and assigns the current task to them.
