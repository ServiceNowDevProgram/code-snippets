Stops the related enhancement records being cascade deleted from a project record when they also belong to a demand (i.e. we're deleting the project, but want to re-evaluate the original demand with it's associated enhancements). IF you want all enhancements to be preserved then just adjust the filter conditions to suit.

Table: pm_project

When: before

Delete: true

Filter: Demand is not empty AND Demand is not ""

