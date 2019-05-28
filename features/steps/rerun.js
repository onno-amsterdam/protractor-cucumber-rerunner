// rerun module holds all functions to rerun the tests

let tag;
const tags = [];
const rerunCommandFilePath = ('./rerun-command/rerun_command.txt');
const failedTagsFilePath = ('./rerun-command/failed_tags.txt');
const fs = require('fs');

// module that creates the rerun command and saves it in a file

// check and create rerun command folder 
function createFolder() {
    if (!fs.existsSync('./rerun-command')) {
        fs.mkdirSync('./rerun-command');
    }
}

// write the initial command to the file, this file will store all failed tests; 
function createCommandFile() {
    fs.writeFileSync('./rerun-command/rerun_command.txt', 'protractor protractor.conf.js --cucumberOpts.tags=""');
}

// write the initial file that holds all the tags of the failed scenarios; 
function createFailedTagsFile() {
    fs.writeFileSync('./rerun-command/failed_tags.txt', '');
}

// create both files 
function createRerunFiles() {
    createFailedTagsFile();
    createCommandFile();
}

// create command to run all the failed tests; 
function appendTagToCommand(tag) {
    fs.readFile('./rerun-command/rerun_command.txt',"utf8", (err, data) => {
                    
        // initiate variable for the command
        if (err) throw err;

        // remove the last quotation mark from the string
        var initialCommand = data.substring(0, data.length - 1);

        // check if there already is a tag in the protractor command
        if (initialCommand.indexOf('@') > -1) {

            // if tag append the command with comma
           newCommand = initialCommand + ', ' + tag + '"';
        } else {
            // if no tag append the command without comma
            newCommand = initialCommand + tag + '"';
        }

        if (fs.existsSync('./rerun-command/rerun_command.txt')){
            fs.writeFileSync('./rerun-command/rerun_command.txt', newCommand, 'utf8');
        }  else {
            createCommandFile();
            fs.writeFileSync('./rerun-command/rerun_command.txt', newCommand, 'utf8');
        }
    });
}

// create string with all the tags of the failed scenarios;
function appendTagToFailedTagsFile(tag) {
    fs.readFile('./rerun-command/failed_tags.txt',"utf8", (err, data) => {

        // initiate variable for the command
        if (err) throw err;

        // remove the last quotation mark from the string
        var initialTags = data.substring(0, data.length);

        // check if there already is a tag in the protractor command
        if (initialTags.indexOf('@') > -1) {
           // if tag append with comma
           tagsList = initialTags + ', ' + tag;
        } else {
           // if no tag append the command without comma
           tagsList = initialTags + tag;
        }

        if (fs.existsSync('./rerun-command/failed_tags.txt')){
            fs.writeFileSync('./rerun-command/failed_tags.txt', tagsList, 'utf8');
        }  else {
            createFailedTagsFile();
            fs.writeFileSync('./rerun-command/failed_tags.txt', tagsList, 'utf8');
        } 
    });
}

function appendTagToFiles(tag){
    appendTagToCommand(tag);
    appendTagToFailedTagsFile(tag);
}

function checkIfRerunCommandExists(){
    try {
        if (fs.existsSync(rerunCommandFilePath)) {
          return true;
        }
      } catch(err) {
          return false;
      }
}

function removeRerunCommand(){
    if(checkIfRerunCommandExists()){
        fs.unlinkSync(rerunCommandFilePath);
        fs.unlinkSync(failedTagsFilePath);
        fs.rmdirSync('./rerun-command');
    }
}

function getTagFromScenario(scenario){
    tag = scenario.getTags()[0].getName();
    return tag;
}

function addTagToArray(tag){
    tags.push(tag);
}

/**
 * The removeLastTag function removes the last tag of the tags array. This function is called when a tag is passed through the removePassedTag function or when the checkIfTagExistsTwice is called. 
 */
function removeLastTag(){
    tags.pop();
}

/**
 * The function checkIfTagExistsTwice makes sure a tag that's already present in the array is not added again. Preferably the first tags in the cucumber scenarios are unique, however if they are not the tag should not be added twice. 
 * @param {var} tag
 */
function checkIfTagExistsTwice(tag) {
    removeLastTag(tag);
    if (tags.includes(tag)) {
        return true
    } else {
        addTagToArray(tag);
        return false;
    }
}

/**
 * Adds the tag of the scenario to the tags array. This function is called before the scenario is run. 
 * If the 
 * @param {scenario} scenario 
 */
function addScenarioTag(scenario) {
    if ( tags.length === 0) {
        removeRerunCommand();
    }
    addTagToArray(getTagFromScenario(scenario));
}

/**
 * The removePassedTag function calls the removeLastTag function to remove the last tag from the array. 
 */
function removePassedTag() {
    removeLastTag();
}

/**
 * The function createCommand uses the rerun_command module to create a folder and text file that holds the protractor command that runs all the failed test. If the function is called when the tags array holds only one tag the folder and file are created - any existing will be overwritten. Before the tag is added a check is done if the tag is already in the array. If it is, the tag is not added to the rerun-command. 
 */
function createCommand(){
    if(tags.length === 1) {
        createFolder();
        createRerunFiles();
    }

    if (!checkIfTagExistsTwice(tag)) {
        appendTagToFiles(tag);
    }
}

module.exports = {
    addScenarioTag : addScenarioTag,
    removePassedTag : removePassedTag,
    createCommand : createCommand
}
