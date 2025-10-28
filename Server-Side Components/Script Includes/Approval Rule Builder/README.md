# Approval Rule Builder for Flow Designer

*This script was originally posted on the Share site but thought it useful to post here as well.*

## Overview
This project includes a script include "ApprovalRuleBuilder" which can be used to script, via the f(x) icon, an "Ask for approval" action within Flow Designer.

The "Ask for approval" provides a condition builder like interface for selecting the approve and reject rules and allows for multiple combinations of user and group approvals. The selections can be dynamic using the data pill picker.

This project provides the ability to script the approvals/rejections should the inbound data driving the action not be predictable. One use case is a data-driven catalog workflow which could have many approval rules and levels which may be hard to implement in the interface. The project was also a way for me to understand the data driving the approval action and a coding challenge to replicate it.

## Example
- Approval - Anyone approves - (User) Abraham Lincoln, (Group) Application Development
- Rejects - Anyone rejects - (User) Abraham Lincoln, (Group) Application Development

The resulting data used by Flow Designer looks like the following;
```
ApprovesAnyU[a8f98bb0eb32010045e1a5115206fe3a]G[0a52d3dcd7011200f2d224837e6103f2]OrRejectsAnyU[a8f98bb0eb32010045e1a5115206fe3a]G[0a52d3dcd7011200f2d224837e6103f2]
```

The code to replicate this using 'ApprovalRuleBuilder' is as follows;

```javascript
var approval_rules = new ApprovalRuleBuilder()
    .addRuleSet(ApprovalRuleBuilder.RULESET_APPROVES)
    .addRule(ApprovalRuleBuilder.RULE_ANY)
    .addUsers(['a8f98bb0eb32010045e1a5115206fe3a'])
    .addGroups(['0a52d3dcd7011200f2d224837e6103f2'])
    .addRuleSet(ApprovalRuleBuilder.RULESET_REJECTS)
    .addRule(ApprovalRuleBuilder.RULE_ANY)
    .addUsers(['a8f98bb0eb32010045e1a5115206fe3a'])
    .addGroups(['0a52d3dcd7011200f2d224837e6103f2'])
    .getApprovalRules();
```    
Each method call is chained together to build the rules, and the final 'getApprovalRules()' call will return a string containing the data required by Flow Designer.
