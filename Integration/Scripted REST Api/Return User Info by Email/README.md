# 🌐 Scripted REST API – Get User Info by Email

## 📋 Description
This Scripted REST API returns basic user information (name, title, department, location) based on an email address passed as a query parameter.

## 📦 Files Included
- `ScriptedRESTAPI_GetUserInfo.js`

## 💡 Use Case
Useful for integrations or external systems needing user data from ServiceNow without exposing full records.

## 🛠 Setup Instructions
1. Create a new **Scripted REST API** with namespace `x_userinfo`.
2. Add a resource with path `/get_user` and method `GET`.
3. Paste the provided script into the resource script field.
