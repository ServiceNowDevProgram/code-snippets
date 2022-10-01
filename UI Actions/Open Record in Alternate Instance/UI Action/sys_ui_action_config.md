!! If your instances use vanity urls, or otherwise do not end in `.com`, the `split()` in code.js will need to be edited

Name: Open Record in [Target Instance]
Table: Global [global]
Action Name: Open Record in [Target Instance]

Client: true
List v2 Compatible: true
List v3 Compatible: true

Isolate script: false

Onclick: openInInstance()

Condition:

    gs.getProperty('[Target Instance]') != '[target instance name]' && !current.isNewRecord() && new CrossInstanceHelper().exists('[Target Instance]', current.getTableName(), current.sys_id.toString())

Script: See `sys_ui_action.js` for code.