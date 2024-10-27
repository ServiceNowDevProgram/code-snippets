**Background Script** 

Background Script, to easily generate statistics about today's created events in system. You can call getStats() with different parameters to get information about current situation in sysevent table. You can generate statistic about different aggregation functions, different aggregation fields and selected group by fields. It can be helpful for example to detect which type of events have the longest average processing duration or which type of events was created the most today.

**How to use** 

You need to call getStats() function with three parameters:

- field - name of field which should be used in aggregate function
- aggFunction - name of aggregate function which should be used
- orderByField - name of field which should be used to orderBy

**Example execution**

Values choosed in this example:

 ![Coniguration](ScreenShot_0.PNG)
 
Execution log:

 ![Execution](ScreenShot_1.PNG)
