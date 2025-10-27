Inbound Email Action to Create User and Assign Groups

If an admin sends an email with specific user details, the script automatically:
Creates a new user (if not existing).
Assigns them to multiple groups.

Create new Inbound Action:
Target table: sys_user
Type: New / Reply (depending on how you want it triggered)

Example Email Format

Subject: Create New User
Name: Abc Xyz
Email: abc.xyz@example.com
UserID: abc_xyz
Department: IT
Groups: Network Team, Application Support, Database Admins

Working:

Script reads each line from email body.
Extracts values for each field (Name, Email, etc.) using regex.
Checks if the user exists → if not, creates it.
Adds the user to the given list of groups.
