# sn-avatar
`sn-avatar` directive is one of the many built-in directives that you can freely use in your widgets for displaying a user's profile picture.

The following table lists all of the scope bindings that can be passed to the directive

| Property           | Description                                          |
|--------------------|------------------------------------------------------|
| primary            | sysID of the user                                    |
| showPresence       | if true will display an indicator of user's presence |
| members            |                                                      |
| enableContextMenu  |                                                      |
| enableTooltip      |                                                      |
| enableBindOnce     |                                                      |
| displayMemberCount |                                                      |
| groupAvatar        |                                                      |


## Usage example

### Simple avatar
To display a user's avatar you just need to pass a user's sys_id as a `primary` attribute within the directive. The user's picture is fetched automatically.
e.g.

```html
<sn-avatar primary="user.sys_id"></sn-avatar>

```
![simple avatar](2021-10-15-23-18-40.png)


### Showing presence

```html
<sn-avatar primary="user.sys_id" show-presence="true"></sn-avatar>
```
![avatar with presence example](2021-10-15-23-22-31.png)

### Different sizes
To specify a size of the displayed avatar, you can use one of the predefined classes or create your own stylings.
```html
<sn-avatar class="avatar-small" primary="user.sys_id" show-presence="true"></sn-avatar>
<sn-avatar class="avatar-medium" primary="user.sys_id" show-presence="true"></sn-avatar>
<sn-avatar class="avatar-large" primary="user.sys_id" show-presence="true"></sn-avatar>
<sn-avatar class="avatar-extra-large" primary="user.sys_id" show-presence="true"></sn-avatar>
```
![different sizes](2021-10-15-23-25-15.png)
