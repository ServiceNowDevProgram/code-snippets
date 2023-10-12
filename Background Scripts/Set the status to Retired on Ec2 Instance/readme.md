This background script is used to set the Install_status to Retired if the status is terminated for the Ec2 Instances(Ci's)
We are quering the table against the table cmdb_ci_ec2_instance
Then we have encoded query to search if there is any record with the status as terminated and install_status is not retired
We are sorting based on name and set the limit to 10K records
We are searching if there are any records, If yes, we will set the install_Status to Retired and we are disabling the workflows to false.
