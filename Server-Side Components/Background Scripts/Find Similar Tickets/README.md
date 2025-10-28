This script identifies tickets similar to a given ticket in ServiceNow based on text similarity of short_description and description fields, optionally boosting the score for matching categories or assignment groups. It is intended for background script execution for testing, analysis, or automation purposes.

**Features:**
1) Compares a source ticket against other tickets in the same table (incident by default).
2) Computes Jaccard similarity between tokenized text fields.
3) Applies bonus points for matching category and assignment_group.
4) Returns a sorted list of similar tickets with score, number, caller_id and short_description.
5) Supports top N results and a minimum score filter.


**Usage:**
1) Paste the script in scripts-background.
2) Make changes to the sys_id of your ticket in line no. 3
3) click run to get an output as below

**Output:**
 *   *** Script: === Similar Tickets to: INC0010005 === 
 *   *** Script: INC0010006 | Score: 1.08 | undefined | Sai Test INC0008112
 *   *** Script: INC0010004 | Score: 0.58 | undefined | Sai Test INC0009005
 *   *** Script: INC0009009 | Score: 0.161 | undefined | Unable to access the shared folder.test
 *   *** Script: INC0008001 | Score: 0.08 | undefined | ATF:TEST2
 *   *** Script: INC0000020 | Score: 0.08 | undefined | I need a replacement iPhone, please
 *   *** Script: INC0000031 | Score: 0.08 | undefined | Need help with Remedy. Can we configure UI?
 *   *** Script: INC0000040 | Score: 0.08 | undefined | JavaScript error on hiring page of corporate website
 *   *** Script: INC0010002 | Score: 0.08 | undefined | 
 *   *** Script: INC0000057 | Score: 0.08 | undefined | Performance problems with wifi
 *   *** Script: INC0010003 | Score: 0.08 | undefined | 

**Explanation of the output:**
1) First Line contains the ticket which you have provided as a sys_id.
2) Next lines contains the ticket which contain ticket no. | score | caller_id | short_description.
3) If you keenly observe there are few tickets that do not have similar short description / description with scores as 0.08 but still in output the reason for this is their category and assignment group still matches with the compared ticket.
