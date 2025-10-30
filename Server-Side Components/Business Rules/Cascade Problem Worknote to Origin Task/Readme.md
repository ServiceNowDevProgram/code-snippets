Cascade Problem Worknotes to Origin Task

Script Type : Business Rule Trigger: after update Table: problem Condition: Work Notes Changes

Goal : To Notify to that particular record(ticket) when Problem record has updated the worknotes.

Walk through of code :
So when there is update/change in the worknotes of a problem record this Business rule will cascade the worknotes to that attached Origin Task record so that it will be update in that particular record as well. In this some validation have been used to avoid unnecessary data cascade, this Business will work only for the open problem, mean this it will exclude the Closed & Resolved State Problem which have been already addressed. So once the worknote is posted it will updated respectively to the origin task.
