Use this script to easily access parameters captured in the URL used to access this catalog item.

This information can be used in client scripts, such as adding the data to a variable.


The URL can be formatted to include the paramters by including the following line, replacing *paramname* with whatever you want to call the parameter, and *value* with whatever the value is.

&sysparm_*paramname*=*value*

So an example might look like this:

https://INSTANCENAME.service-now.com/sp?id=sc_cat_item&sys_id=060f3afa3731300054b6a3549dbe5d3e&referrer=popular_items&sysparm_userid=6816f79cc0a8016401c5a33be04be441

