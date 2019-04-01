# onno-rerun-protractor-cucumber
Reruns Failed Cucumber-Protractor Test

## Requirements for this solution 
All the cucumber scenarios need to have a tag. A scenario can have multiple tags but the first will be used to rerun the scenario if it has failed. Preferably this first scenario is unique although it doesn't have to be. If a scenario fails with a tag that is not unique the rerun program will execute all scenarios with this tag even if the scenarion did not fail. 

## scenarios in this example
* test one fails has unique tag
* test two passes has unique tag
* test three fails has unique tag
* test four passes has same tag as test one
