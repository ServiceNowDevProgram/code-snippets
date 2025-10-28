Base64 Encode/Decode Business Rule
Overview

This setup demonstrates how to store field data securely in Base64 format in the database, while still displaying it as human-readable text to end users in ServiceNow.

It uses two Business Rules:

Before Insert/Update Rule : Encodes plain text into Base64 before saving to the database.

Display Rule  : Decodes the Base64 value back into readable text when loading the record form.
