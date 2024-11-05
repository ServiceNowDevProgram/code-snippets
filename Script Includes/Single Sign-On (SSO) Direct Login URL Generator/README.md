# Script Include for Single Sign-On (SSO) Direct Login URL Generator using UserHelper

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Example & Usage](#usage)
4. [Security](#security)

## Introduction<a name="introduction"></a>

The UserHelper script include provides functions for generating direct login URLs for users in ServiceNow. This functionality is similar to the impersonate user feature in ServiceNow, but it allows you to directly log in the user without requiring them to enter any credentials.

## Installation<a name="installation"></a>

This script include required Digest Token Authentication Integration below:

#### Prerequisites

* Multi-Provider SSO plugin is activated [documentation](https://docs.servicenow.com/bundle/vancouver-platform-security/page/integrate/single-sign-on/task/t_ActivateMultipleProviderSSO.html)
* Multi-Provider SSO properties are configured [documentation](https://docs.servicenow.com/bundle/vancouver-platform-security/page/integrate/single-sign-on/task/t_ConfigureMultiProviderSSOProps.html)

#### Steps

1. Go to **Multi-Provider SSO** > **Identity Providers**.
2. Select the **Digested Token** record.
3. Add a **Secret Passphrase**. This will be the `<YOUR_SECRET_KEY>` in the script include.
4. Note the **sys_id** of the **Digested Token** record. This will be the `<SSO_PROVIDER_SYS_ID>` for the script include.

## Usage<a name="usage"></a>

To generate a direct login URL for a user, you can use the `login()` function provided by the UserHelper script include. This function takes the user's name or GlideRecord as input and returns a URL that the user can use to log in directly.

The following example shows how to use the UserHelper script include to generate a direct login URL for a user:
```javascript
// Generate a direct login URL for the user "admin".
var userHelper = new UserHelper();

// Generate a direct login URL for the user "admin".
var loginUrl = userHelper.login('admin');
```
```javascript
// Generate a direct login URL for the user with the sys_id "1234567890", email.
var userHelper = new UserHelper();
userHelper.getUserById('1234567890'); //userHelper.getUserByEmail('<EMAIL>');

// Generate a direct login URL for the user "admin".
var loginUrl = userHelper.login();

//loginUrl: https://<instance>.service-now.com/?glide_sso_id=<SSO_PROVIDER_SYS_ID>&SM_USER=admin&DE_USER=htrULTFZTOLl9PHEvNBejz65ghxp6dJgDazXXv9v/wY=
```

## Security<a name="security"></a>
It is crucial to emphasize that the UserHelper script include provides direct access to users without requiring any credentials. Therefore, it is important to set proper security policies to secure this script include. Make sure to follow best practices for securing access to this functionality.
