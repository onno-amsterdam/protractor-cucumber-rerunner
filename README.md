# onno-rerun-protractor-cucumber
Reruns Failed Cucumber-Protractor Test

## issue solved with this solution
Other solutions strucle with timeout issues - especially cucumber steps timing out prove to be an issue. By adding the tag to the rerun command and only removing it when the scenario related to the tag has specifically passed, leaves all the failed tags in the rerun command even if the After in the hooks module is not called. 

## Requirements for this solution 
### Requirements to the cucumber scenarios
* All the cucumber scenarios need to have a tag; 
* A scenario can have multiple tags but the first will be used to rerun the scenario if it has failed; 
* The first scenario is unique;  
* Scenarios can run and pass independently of eachother;

Although preferably the first scenario tag is unique, it doesn't have to be. If a scenario fails with a tag that is not unique the rerun program will execute all scenarios with this tag even if the scenarion did not fail. 

# Run the tests 
To run the tests use the CICD scripts in the cicd_scripts folder. Run the scripts from the projects root folder. 

## scenarios in this example
* 1) scenario passes before any failures: rerun command is NOT created; 
* 2) first scenario fails in the test run: rerun command is created and tag is added; 
* 3) scenario passes after earlier failure(s) in test run: tag is NOT added to existing rerun command; 
* 4) scenario with - unique tag - fails after first failure: tag is added to the existing rerun command;    
* 5) scenario with - same tag as scenario that failed earlier - fails: tag is NOT added to the existing rerun command; 
* 6) scenario with - same tag as scenario that passed earlier - fails: tag is added to the existing rerun command; 
