Feature: Poc for the rerun-protractor-cucumber project

    #1
    @scenario-tag-one
    Scenario: Scenario one passes rerun command is not created 
        Given I open the page
        Then I check the elements text "Testing"
    #2
    @scenario-tag-two
    Scenario: Scenario two fails rerun command is created and tag is added
        Given I open the page
        Then I check the elements text "title"
    #3
    @scenario-tag-three
    Scenario: Scenario three passes the tag is not added to the rerun command 
        Given I open the page
        Then I check the elements text "Testing"
    #4
    @scenario-tag-two 
    Scenario: Scenario four fails tag is already in the command so not added again
        Given I open the page
        Then I check the elements text "title"
    #5
    @scenario-tag-four
    Scenario: Scenario four passes the tag is not added to the rerun command
        Given I open the page
        Then I check the elements text "Testing"
    #6    
    @scenario-tag-five
    Scenario: Scenario five fails tag is not in command so added
        Given I open the page
        Then I check the elements text "title"
    #7    
    @scenario-tag-five
    Scenario: Scenario six passes so tag is not added to the command
        Given I open the page
        Then I check the elements text "Testing"
    #8
    @scenario-tag-five
    Scenario: Scenario six fails tag is already in the command so not added again
        Given I open the page
        Then I check the elements text "title"
    #9
    @scenario-tag-four
    Scenario: Scenario seven fails so added to the command
        Given I open the page
        Then I check the elements text "title"