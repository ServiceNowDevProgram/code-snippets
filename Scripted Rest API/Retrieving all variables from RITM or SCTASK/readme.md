# Retrieve all variables (including multi-row) from any Request Item or Catalog Task - and push JSON for use in a Scripted REST API
We can pull the variables easily not that hard to do using existing APIs, but if you want to pull a list of variables and their values, it gets a little messy.  If you want values from a Multi-Row Variable Set, it gets even messier.  
So, we set about building a Scripted REST API our partners can use.
So... here's our take on this..

  1. [Build a Scripted REST API.  We set ours up with pretty generic settings as mentioned in the script comments](scripted_rest_api.js)
  2. [Build a script include (the one referenced in the resource script)](CHVarUtils_ScriptInclude.js)
  3. [output](output.js)
