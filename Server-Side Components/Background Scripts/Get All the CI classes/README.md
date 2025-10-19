# Get All CI Classes

A background script that lists all Configuration Item (CI) classes in your ServiceNow instance by using the TableUtils API to find all tables that extend `cmdb_ci`.

## Usage

1. Navigate to **System Definition → Scripts - Background**
2. Copy and paste the script content
3. Click "Run fix script"

## What It Does

The script:
1. Creates a TableUtils object for the base CI table (`cmdb_ci`)
2. Gets all tables that extend this base class using `getAllExtensions()`
3. Converts the Java object to JavaScript array using `j2js()`
4. Prints each CI class table name
