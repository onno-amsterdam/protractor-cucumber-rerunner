Feature: Poc for the rerun-protractor-cucumber project

    @scenario-tag-one
    Scenario: Scenario one passes rerun command is not created 
        Given I open the page
        Then I check the elements text "Testing"

    @scenario-tag-two
    Scenario: Scenario two fails rerun command is created and tag is added
        Given I open the page
        Then I check the elements text "title"

    @scenario-tag-three
    Scenario: Scenario three passes the tag is not added to the rerun command 
        Given I open the page
        Then I check the elements text "Testing"
 
    @scenario-tag-two 
    Scenario: Scenario four fails tag is already in the command so not added again
        Given I open the page
        Then I check the elements text "title"
   
   @scenario-tag-four
    Scenario: Scenario four passes the tag is not added to the rerun command
        Given I open the page
        Then I check the elements text "Testing"
        
   @scenario-tag-five
    Scenario: Scenario five fails tag is not in command so added
        Given I open the page
        Then I check the elements text "title"
        
    @scenario-tag-five
    Scenario: Scenario six passes so tag is not added to the command
        Given I open the page
        Then I check the elements text "Testing"

    @scenario-tag-five
    Scenario: Scenario six fails tag is already in the command so not added again
        Given I open the page
        Then I check the elements text "title"

    @scenario-tag-four
    Scenario: Scenario seven passes so not added to the command
        Given I open the page
        Then I check the elements text "title"