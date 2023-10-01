# Use Case

## A. Create multiple RITM under single request depending upon list collector values through workflow without using CartAPI.

Description         : When end user selects the multiple users (let say 3) in “User list” then 3 RITM to be generated under single request.
                      It should calculate the price of all 3 RITM on portal.

Pre-requisites      :  Catalog Item  - "Development Laptop (PC)"  [This is OOTB catalog item available on PDI]

## B. Be Familiar with below Tables in ServiceNow

1] item_option_new      
2] sc_item_option       
3] sc_item_option_mtom  

## C. Now let's do the Development

#### Step 1      :  Create two new variables in Catalog Item - Development Laptop (PC)

|A] First variable          |B] Second variable    |
|---------------------------| ---------------------|
|Name: User List            |Name: Hidden Variable |
|Type: List Collector       |Type: Select box      |
|List Table: User (sys_user)|Choices: 1.Yes 2.No   |
|                           |Default Value : Yes   |
 
Second variable will be hidden & we will use it to divert the workflow so that it will not go in infinite loop.

Catalog item should look like Images name "Step1.1 - Variables" & "Step1.2 - Portal view" (See images folder)

#### Step 2      : Copy the existing workflow from this catalog item [we will update the copied workflow.] & Attach it to catalog item

Workflow      : Copy of Procurement Process Flow – Hardware 

Images        : "Step2.1 - Attach the workflow" (See images folder)


#### Step 3      : Open the Workflow in workflow editor.

a] Add new "Switch" workflow activity in workflow on variable "Hidden variable" as shown in below

Images        : "Step3.1 - Workflow Switch activity" (See images folder)

b] Add new activity “Run script” with any name  – Put this as blank for now , we will write script to create multiple RITM using this script 
activity.  

Connect “No” with “Approval action”  & “Yes” with Run script  activity of switch

Connect Run script activity to approval action.

Images        : "Step3.2 - Workflow" (See images folder)

#### Step 4      : Let’s write script in Run script activity in workflow

Please see the runScriptActivity.js file

## D. See Output

1.After completing steps Validate & publish the workflow

2.Open the Catalog Item in Service portal

3.Select any 3 random users in "User list" on form & submit the request

Test result : Three RITM will be created under one request.

Please refer the "Output" folder for images under "Images" folder

## References : 
1.https://docs.servicenow.com/bundle/vancouver-it-service-management/page/product/planning-and-policy/concept/request-management-architecture.html

2.ServiceNow Community

