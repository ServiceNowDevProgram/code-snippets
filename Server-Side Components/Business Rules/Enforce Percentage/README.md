# Objective
A Business Entity has multiple owners who are individuals. 
Each indivisual owns a percentage of the business.
This business rule insures that the total of all ownership percentage does not exceed 100%.

# Challenge
The aggregate function calculates the sum by using the values that are stored in the database. However we need to calculate the sum using the values that are in the database for all owners and use the value that the user is trying to update for the owner that is currently being udpated.

# Solution
1. Use the sum function from the [Calculator Script Include](https://github.com/ServiceNowDevProgram/code-snippets/tree/main/Script%20Includes/Calculator).
2. Calculate the sum using the values in the database
3. Substract the previous value and then add the current value to calculate what the future sum would be
