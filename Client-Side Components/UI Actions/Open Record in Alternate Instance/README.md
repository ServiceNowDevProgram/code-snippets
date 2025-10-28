This set of:

- RESTMessage
- Script Includes
- Scripted REST API (SRAPI)
- UI Action

Will allow you to open a record in alternate corresponding instance(s) of ServiceNow.
For example, from a record in a PROD instance, you can open the correlating record in your DEV instance.

The 'Starting Instance', refers to the instance you are currently in, and the 'Target Instance' refers to the instance you want to open the record in.
Any instance of `[Target Instance]` in these files will need to be replaced.

- The RESTMessage will need to exist on the 'Starting' Instance
- The Script Includes will need to exist on the 'Starting' Instance
- The UI Action will need to exist on the 'Starting' Instance
- The SRAPI will need to exist on the Target Instance

Any file ending in `_config.md` relates to field configuration of the record.