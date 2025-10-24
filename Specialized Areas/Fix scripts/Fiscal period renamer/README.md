OOTB the Fiscal periods are named as such - "FY21: M01". This naming convention relies on each and every user knowing what M01 is (i.e. does the fiscal year start in January or does it start in March). This renaming script will append a descriptor to the end of each fiscal period name to increase usability and to preserve numeric sorting. Assuming M01 is January, the renamed fiscal period might be - "FY21: M01 Jan".

The fiscal period generator also assumes a hard-coded convention for the FYXX component of the name. Many customers differ from this and require it in the format FY23-24 if a fiscal year stretches across two calendar years. This script will allow manual selection of the 'from' year component (i.e. if FY is FY23 and stretches from July 2022 to June 2023 the FY will be renamed FY22-23:).

Instructions:
1. Update the fpQuery variable to be an encoded query that represents the fiscal periods you wish to rename
2. Update the orderedMonth variable to represent the descriptor to append to each period name. These must be in the order required for the fiscal year created.
3. Update the startAdditionalYear variable - this will prepend the financial year value with this value (i.e. change FY21 to FY20-21). This will increment for each FY so input the first value required.
4. Update the fiscalPeriodRecordsPerYear variable - this is the number of fiscal period records you've created per fiscal year - this is typically 17. Increment this value by one and input (i.e. I'd input 18 if I had 17 records)
5. Run the script and confirm the log statements are correct
6. Uncomment row 83 and run again to commit output of step 5
