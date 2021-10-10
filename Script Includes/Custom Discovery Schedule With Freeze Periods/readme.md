# Custom Discovery Schedule

One of the requirements we had from one of our client was that they didn't want discovery schedules to run for few days at the begining of the month (BOM) and few days for the end of the month (EOM) as they internally had to generate some big financial reports and didn't want discovery to take any network resources.

So this custom discovery script enables to run discovery on daily basis but will ignore the schedules if it was end of month or begining of the month as configured in system properties. There are 4 system properties that are attached as xml and needs to be imported into sys_properties.

This script submits the Pre-created discovery schedules (On Demand schedules) but it honours
pre-configured days to be skipped at the begining of the month and days at the end of the month.

It also honours the pre-configured times that discovery should be skipped.

### Configurations required

- Standard discovery schedules with Run (On Demand)
- The following sys_properties needs to be configured
    * VF.Discovery.BOM.DaysToFreeze
    * VF.Discovery.EOM.DaysToFreeze
    * VF.Discovery.Freeze.StartTime
    * VF.Discovery.Freeze.EndTime

Details of sys_properties are below:

| Name | Description  | Type  | Value |
| :-------------------------:   | :-: | :-: |  :-: |
| VF.Discovery.Freeze.StartTime | The start time that discovery will not be submitted. Should be in system date/time format e.g. 09:00:00 for 9 am | string | 08:00:00 |
| VF.Discovery.Freeze.EndTime | The end time that discovery will not be submitted. Should be in system date/time format e.g. 21:00:00 for 9 pm | string | 21:00:00 |
| VF.Discovery.EOM.DaysToFreeze | Number of days to freeze (skip) discovery at the end of month (EOM) | integer | 2 |
| VF.Discovery.BOM.DaysToFreeze | Number of days to freeze (skip) discovery at the begin of month (BOM) | integer | 3 |

## Usage

- Create the required sys_properties and set the values as per requirements
- Create a new schedule job that runs on daily basis
- Keep the Discovery schedules that you want to be submitted by this script to On Demand
- Include the following script in the schedule job script

```javascript

var helper = new VF_DiscoveryScheduleWithFreezePeriod(new GlideDateTime());
helper.process();

```
