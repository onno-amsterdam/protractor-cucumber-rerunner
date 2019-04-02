# onno-rerun-protractor-cucumber
Reruns Failed Cucumber-Protractor Test

## issue solved with this solution
Other solutions strucle with timeout issues - especially cucumber steps timing out prove to be an issue. By adding the tag to the rerun command and only removing it when the scenario related to the tag has specifically passed, leaves all the failed tags in the rerun command even if the After in the hooks module is not called. 

## Requirements for this solution 
All the cucumber scenarios need to have a tag. A scenario can have multiple tags but the first will be used to rerun the scenario if it has failed. Preferably this first scenario is unique although it doesn't have to be. If a scenario fails with a tag that is not unique the rerun program will execute all scenarios with this tag even if the scenarion did not fail. 

## scenarios in this example
* test one with tag @scenario-one fails & has unique tag: tag is in rerun command; 
* test two with tag @scenario-two passes & has unique tag: tag is NOT in rerun command; 
* test three with tag @scenario-three fails & has unique tag: tag is in rerun command; 
* test four with tag @scenario-one passes has & same tag as test one: tag is NOT added to rerun command;
* test five with tag @scenario-one fails has & same tag as test one: tag is NOT added to rerun command; 
