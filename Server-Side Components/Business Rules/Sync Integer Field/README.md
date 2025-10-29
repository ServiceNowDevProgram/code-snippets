Scenario: Synchronize integer field that will put records in sequential order.

Example: When you have an integer field on a table and want to be able to add records and have it rearrange order its order sequentially.

Script Logic: An before-update business rule that grabs all the records that currently have an integer field value and puts them into an array. It then adds the new value and puts it into the correct position in the array and updates value so they are in a sequence order.

**You will have to create a custom integer field to be able to use this business rule.**
