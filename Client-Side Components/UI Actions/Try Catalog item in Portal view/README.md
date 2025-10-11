 UI action code  which will help developers to test the same catalog item in serviceportal view  by Clicking on the action .
 OOB we have try it which will preview the catalog item in ITIl view but some time we may miss few configurations which needs to bes tested in service portal. 
 While doping testng its take to test the each item in serviceportal uisng this UI action we can test in portal itself.
 Its always recommended way to test and experience end user view way while performing testing.
 
 Note : Please update the "portal " value as per your request.

 Open any catalog item -->  
                          Click on Try It Sp Ui action  -->
                                                        Catalog item redirect to sp view in seperate tab.

Create UI action :
==================
Open System defination --> UI action --> Create new

Name : Try it in SP

Table : Catalog Item [sc_cat_item]

Order : 100

Action name : try_it_in_sp

Client : true

Form button : true

Onclick : tryitinsp()

Condition : current.active == true && current.canWrite()&&new CatalogItemTypeProcessor().canTryIt(current.getRecordClassName()) && !(current.getRecordClassName() == "sc_cat_item_content" && current.content_type == "external") 

Script : copy and paste the code from TryItInSp.js file
