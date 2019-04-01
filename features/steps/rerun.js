// rerun module holds all functions to rerun the tests

var tag; 
var tags = []; 
var rerunCommand = require('./rerun_command.js'); 

function getTagFromScenario(scenario){
    console.log('Onno_Debug: the tag from scenario function is called!'); 
    tag = scenario.getTags()[0].getName();
    console.log('Onno_Debug: this is the tag: ' + tag); 
    return tag; 
}

// function finds the tag by the index, logs the tag and returns it; 
function getTagByIndex(index){
    tag = tags[index];  
    console.log('Onno_Debug: the tag at index ' + index + ' = ' + tag); 
    return tag; 
}

function removeTag(index){
    console.log('Onno_Debug: the remove tag function is called'); 
    tags.splice(index); 
}

function getIndexByTag(tag){
    return tags.indexOf(tag); 
}

function checkIfTagExistsTwice(tag){
    // check if the tag is included in the array, if yes return true, if not return false; 
    if (tags.includes(tag)) {
        tags.includ 
        console.log('Onno_Debug: the tag exists in the array');   
        return true 
    } else {
        console.log('Onno_Debug: the tag DOES NOT exist in the array');
        return false;
    }
}

module.exports = {   

    setTags: function(tags) {
        tags = tags; 
    }, 

    getTags: function() {
        return tags;  
    },

    addScenarioTag : function(scenario){

        console.log('Onno_Debug: the addScenarioTag function is called!'); 

        // get the first name of the tag in the array of tags for the scenario
        tag = getTagFromScenario(scenario);

        // check if tag is already in array - if not add (WRONG!)
        // above line is wrong - the tag should always be added. If it passes it should be removed - not with splice but the last;
        // if it fails the check needs to be done - if the tag is in the array twice or more if yes - remove it; 
        if (!checkIfTagExists(tag)) {
            console.log('Onno_Debug: the tag ' + tag + ' did not exist in the array - so adding!'); 
            tags.push(tag);
        } 
        console.log("Onno_Debug: tag added to array: " + tags[tags.length - 1]); 
    },

    // function removes the tag, should be called only when scenario is passed; 
    removePassedTag : function(scenario) {
        tag = getTagFromScenario(scenario); 
        console.log('Onno_Debug: the remove tag function is called for tag ' + tag); 
        removeTag(getIndexByTag(tag)); 
    }, 


    logAllFailed : function(){
        console.log('Onno_Debug: the log all failed function is called!'); 
        console.log('Onno_Debug: the length of the array = ' + tags.length); 
        for (tag in tags){
            console.log('Onno_Debug: the tag ' + tag + ' array of tags: ' + tags[tag]); 
        }
    }, 

    createCommand : function() {
        
        // if the tags array is not larger than 0 the initial command needs to be created 
        if(tags.length === 1) {
            console.log('Onno_Debug: FIRST tag - the array DOES NOT have more than one tag'); 
            rerunCommand.createFolder(); 
            rerunCommand.createCommandFile(); 
        } else {
            console.log('Onno_Debug: NOT the first tag - the array has MORE than one tag'); 
        }

        if (!checkIfTagExists(tag)) {
            console.log('Onno_Debug: the tag passed to the appendTagToCommand function: ' + tags[tag]); 
            rerunCommand.appendTagToCommand(tags[tag]);
        }
    }
}
