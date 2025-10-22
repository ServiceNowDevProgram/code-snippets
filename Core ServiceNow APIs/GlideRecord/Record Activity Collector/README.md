It might be a requirement when we need to collect the activities from a ticket, and report it to any purposes. There is an OOTB available Processor, called NGListHistoryDirectProcessor, but it executes a Java code, and call it from the back-end can be complex. So this solution makes the activity collection simple.

The feature can be used easily:

``` Javascript
var tableName = "incident";
var recordSysId = "57af7aec73d423002728660c4cf6a71c";
var collector = new global.ActivityStreamCollector(tableName, recordSysId);
var activityObj = collector.getActivityEntries();
gs.info(JSON.stringify(activityObj));
```

The result will be a JSON array, which contains the history of record like it can be seen on the form:

``` JSON
[
  {
    "createdBy": "System Administrator",
    "createdOn": "2023-10-17 17:28:14",
    "type": "field_changes",
    "value": [
      {
        "label": "Incident state",
        "oldValue": "New",
        "newValue": "In Progress"
      }
    ]
  },
  {
    "createdBy": "System Administrator",
    "createdOn": "2023-10-17 17:05:18",
    "type": "comments",
    "value": "Test comment"
  },
  {
    "createdBy": "System Administrator",
    "createdOn": "2023-09-14 21:38:02",
    "type": "attachment",
    "value": "test.pdf"
  },
  {
    "createdBy": "System Administrator",
    "createdOn": "2018-12-13 08:30:24",
    "type": "work_notes",
    "value": "Changed the priority of the Incident"
  },
  {
    "createdBy": "System Administrator",
    "createdOn": "2018-08-30 10:06:52",
    "type": "field_changes",
    "value": [
      {
        "label": "Incident state",
        "oldValue": "",
        "newValue": "New"
      },
      {
        "label": "Impact",
        "oldValue": "",
        "newValue": "3 - Low"
      },
      {
        "label": "Priority",
        "oldValue": "",
        "newValue": "4 - Low"
      },
      {
        "label": "Opened by",
        "oldValue": "",
        "newValue": "System Administrator"
      },
      {
        "label": "Caller",
        "oldValue": "",
        "newValue": "David Miller"
      }
    ]
  }
]
```

And finally the image below represents how the activity information looks like on the form:
![activities](https://github.com/manrick/code-snippets/assets/29863465/345256f6-7e18-49b8-acc1-9e5d4c68131e)
