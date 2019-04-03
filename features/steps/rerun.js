// rerun module holds all functions to rerun the tests

var tag; 
var tags = []; 
var rerunCommand = require('./rerun_command.js'); 

function getTagFromScenario(scenario){
    tag = scenario.getTags()[0].getName();
    return tag; 
}

function addTagToArray(tag){
    tags.push(tag);
}
/**
 * 
 * @param {scenario} scenario 
 */
function addScenarioTag(scenario){
    addTagToArray(getTagFromScenario(scenario));
}
/**
 * The removeLastTag function removes the last tag of the tags array. This function is called when a tag is passed through the removePassedTag function or when the checkIfTagExistsTwice is called. 
 */
function removeLastTag(){
    tags.pop(); 
}

/**
 * The removePassedTag function calls the removeLastTag function to remove the last tag from the array. 
 */
function removePassedTag() {
    removeLastTag(); 
}

/**
 * The function checkIfTagExistsTwice makes sure a tag that's already present in the array is not added again. Preferably the first tags in the cucumber scenarios are unique, however if they are not the tag should not be added twice. 
 * @param {var} tag 
 */
function checkIfTagExistsTwice(tag){
    removeLastTag(tag); 
    if (tags.includes(tag)) {
        return true 
    } else {
        addTagToArray(tag); 
        return false;
    }
}

/**
 * The function createCommand uses the rerun_command module to create a folder and text file that holds the protractor command that runs all the failed test. If the function is called when the tags array holds only one tag the folder and file are created - any existing will be overwritten. Before the tag is added a check is done if the tag is already in the array. If it is, the tag is not added to the rerun-command. 
 */
function createCommand(){
    
    if(tags.length === 1) {
        console.log('Onno_Debug: FIRST tag - the array DOES NOT have more than one tag'); 
        rerunCommand.createFolder(); 
        rerunCommand.createCommandFile(); 
    } else {
        console.log('Onno_Debug: NOT the first tag - the array has MORE than one tag'); 
    }

    if (!checkIfTagExistsTwice(tag)) {
        console.log('Onno_Debug: the tag passed to the appendTagToCommand function: ' + tag); 
        rerunCommand.appendTagToCommand(tag);
    }
}

module.exports = {   
    addScenarioTag : addScenarioTag,
    removePassedTag : removePassedTag, 
    createCommand : createCommand  
}
