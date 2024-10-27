# Log out active User sessions across all nodes
## Usage
Can be run as a fix or background script.

The function `applyExcludedUsersFilter` excludes selected users from the session cull. To add users to this exclusion list simply add their username to the array `excluded_users`. The current user is added to the array by default in the example.

Due to the significant impact that logging out all users would have I've included a `live_run` variable. If this is not explicitly set to `true` (the boolean, not the string) then the script will log the actions it would have taken, but not actually affect any user sessions. [(Similar to the PowerShell `WhatIf` concept)][WhatIfArticle]

## Sample Outputs
### Dry Run
```
*** Script: Live run: false: would logout sessions for UserName.With.Session.1
*** Script: Live run: false: would logout sessions for UserName.With.Session.2
*** Script: Live run: false: would logout sessions for UserName.With.Session.3
*** Script: Live run: false: Logged out sessions for the following users:
[
    "UserName.With.Session.1",
    "UserName.With.Session.2",
    "UserName.With.Session.3"
]
```
### Live Run
```
*** Script: Live run: true: Logged out sessions for the following users:
[
    "UserName.With.Session.1",
    "UserName.With.Session.2",
    "UserName.With.Session.3"
]
```
[WhatIfArticle]: https://techcommunity.microsoft.com/t5/itops-talk-blog/powershell-basics-don-t-fear-hitting-enter-with-whatif/ba-p/353579 "PowerShell WhatIf"