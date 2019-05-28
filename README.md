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
* scenario passes;
* scenario fails as first failure;
* scenario fails > first failure unique tag; 
* scenario fails > first failure same tag as a scenario which already failed; 
* scenario passes with same tag as earlier failed scenario; 

* 1) passes before any failures: rerun command is NOT created; 
* 2) scenario fails as first failure in the test run: rerun command is created and tag is added; 
* 3) scenario passes after earlier failure(s) in test run: tag is added to existing rerun command; 
* 4) scenario with tag of earlier failed scenario fails: tag is NOT added to the rerun command;    
* 5) scenario with unique tag passes: tag is NOT added to the existing rerun command; 
* 6) scenario with unique tag fails: tag is added to the existing rerun command; 
* 7) scenario with tag of earlier failed scenario passes: tag is not added to existing rerun command; 
* 8) scenario with tag of earlier failed and earlier passed command fails: tag is not added to existing rerun command;
* 9) scenario with tag of earlier passed scenario fails: tag is added to existing rerun command;


## the result of running the example
Initially the example will run 9 scenarios of which 5 fail and 4 pass. 
The rerun will then execute the scenarios with the tags @scenario-tag-two, @scenario-tag-four,@scenario-tag-five. Seven of the scenarios have these tags. Each rerun will execute the seven scenarios, two will pass, five will fail and again it will run with the same tags. 
