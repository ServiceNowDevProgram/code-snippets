Executes a Transform Map on the given Import Set.

When working with Import Sets and Transform Maps in ServiceNow, it’s common to automate data transformation after a Data Source load completes.
This script simplifies that by programmatically running the Transform Map using the GlideImportSetTransformerWorker API.

Fetches the Transform Map sys_id from the property tmap.tag.sys.id
Transforms data from the specified Import Set into the target table
Runs the transformation asynchronously (in the background)
Pass the importset SysId from flow inputs after trigger the datasource
