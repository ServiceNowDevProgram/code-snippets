# Negative regular expressions for Condition Builder

## What problem does it solve?

Certain condition builders (not all, unfortunately) come with a __matches regex__ operator. This is very handy to filter records based on complex rules applied to strings.

Unfortunately, there is no __does not match regex__ operator and I would have needed this on several occasions.

## Solution

The solution is to use a negative regular expression by leveraging the **?!** operator (called _Negative Lookahead_). So one needs to find the proper regex for what it should match, and then invert it with a Negative Lookahead.

For example, the following regex matches a well formed MAC address:
```
^(([A-Fa-f0-9]{2}[:-]){5}[A-Fa-f0-9]{2}).*$
```

Whereas this one matches anything that does NOT match a well formed MAC address:
```
^(?!(([A-Fa-f0-9]{2}[:-]){5}[A-Fa-f0-9]{2})$).*$
```

The script in this example shows how to use this, but it's really in a condition builder that it will be useful. As matter of fact, a script can always reverse the logic (but the condition builder cannot). The script identifies all the entries in an array that do NOT have a well formed MAC address: note that it does not use a __false__ logic in the _if_, proving that the regex does revert the logic.