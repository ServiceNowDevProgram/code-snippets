This repository contains a ServiceNow Script Include + Client Script demo for enforcing password strength during user registration or password reset processes.
Overview

The goal is to ensure that any password set in ServiceNow (e.g., through a Catalog Item or custom form) follows strong security rules:
At least 8 characters
At least 1 uppercase letter
At least 1 lowercase letter
At least 1 number
At least 1 special character
If the rules are not met, the system flags the password as Weak Password.

Example :
Imagine you build a User Registration Catalog Item where a field Proposed Password is entered by the user.
On change of this field, the Client Script runs.
It calls the PasswordUtil Script Include.
If the password is weak, the form shows an inline error message, preventing weak password submissions.
This ensures consistent security enforcement across ServiceNow forms.
