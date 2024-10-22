*********LONG RUNNING SCHEDULE JOBS PER DAY BY NUMBER OF TIMES EACH EXECUTED AND PROCESSING TIME********

Script to get Top 10 scheduled jobs by processing time and number of times executed per day

 - Query the table SYS_LOG_TRANSACTION to identify the TOP 10 Schedule Job by Number of times it executed in one day and How much processing time it took to complete the execution

>>>>> Go to https://<your instance URL>/syslog_transaction_list.do?sysparm_query=urlLIKE<your scheduled job name> and check the "Transaction processing time"

 - This will help to identify top contibutors that cconsume instance resource and can potentially cause slowness due to long running schedule jobs

 - You can execute this as Background scipt or Fix script to get the output.
 - This can be executed as scheduled script to gte the top contributor details daily to take proactive actions
