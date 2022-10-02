##Purpose 
Lock the file while developer is working on a particular widget/business rule/client script/script include/ etc... to avoid Conflicts during Deployment Pipeline, in this example I have written the code for "Widgets".

#Practical Scenario 
Consider the case, There are 2 Teams namely "Team Raghu" and "Team Ram" and in each team there are 6 developers. 
Assume Developer 1 from Team Raghu is working on "ABC widget" and simultaneously If Developer 2 from Team Raghu also wants to work on "ABC Widget" then an error will appear like below screenshot till developer 1 completes his development.. 
<img width="436" alt="raghu" src="https://user-images.githubusercontent.com/44225058/193446454-7c0db16e-00e2-4efc-91ea-3113ff50d992.PNG">


#How system knows whether developer completes the development or not? 
Code will handled through update sets

##Use 
At a time only one developer can work on a particular file(in this example on a particular widget)

##Overview(Considering widget.. but you can implement for any table you want) 
If a "Developer A" working on "Widget A", parallelly if "Developer B" working on "Widget B" and each developer don't know that other developer is working on it, then if Developer B moves the code to higher environment before developer A completes his development.. then in such scenarios it creates the issue.. to avoid these kind of concurrency issues.. we can use locking system for each record..
