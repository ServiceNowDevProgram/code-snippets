# Retrieve all variables (including multi-row) from any Request Item or Catalog Task - and push JSON for use in a Scripted REST API
It's really not that hard to do using existing APIs, but if you want to pull a list of variables and their values, it gets a little messy. 
If you want values from a Multi-Row Variable Set, it gets even messier.  So, we set about building a Scripted REST API our partners can use. 

 1. [Build a Scripted REST API- resource configuration in the comments of the script](scripted_rest_api.js) 
 2. [Build a script include (the one referenced in the resource script above)](CHVarUtils_ScriptInclude.js)
 3. [Sample Output return in JSON format](output_example.js)

