const fs = require('fs');

const RERUN_COMMAND_FOLDER_PATH = './rerun-command';
const RERUN_COMMAND_FILE_PATH = `${RERUN_COMMAND_FOLDER_PATH}/rerun_command.txt`;
const FAILED_TAGS_FILE_PATH = `${RERUN_COMMAND_FOLDER_PATH}/failed_tags.txt`;

const scenarioTags = new Map();

/**
 * Get scenario's first tag name
 * @param {scenario} scenario 
 */
function getScenarioTag(scenario) {
  return scenario.getTags()[0].getName();
}

/**
 * Create rerun command folder if non existing
 */
function createRerunCommandFolder() {
    console.log("Creating the folder!"); 
    if (!fs.existsSync(RERUN_COMMAND_FOLDER_PATH)) { 
    return fs.mkdirSync(RERUN_COMMAND_FOLDER_PATH);
  }
}

/**
 * Write the initial command to the file, this file will store all failed tests.
 * The command will set the host and port, so the test runs against the correct environment.
 * If used in host and port are used in the protractor.conf file add this to the command:
 * 
 * All parameters that are needed to run the Protractor tests can be added here. *  
 */
function createCommandFile() {
  const command = `protractor protractor.conf.js \
  --ignoreUncaughtExceptions \
  --cucumberOpts.tags=""`;
  return fs.writeFileSync(RERUN_COMMAND_FILE_PATH, command, 'utf8');
}

/**
 * Write the initial file that holds all the tags of the failed scenarios;
 */
function createFailedTagsFile() {
  return fs.writeFileSync(FAILED_TAGS_FILE_PATH, '', 'utf8');
}

/**
 * Append new tag to the rerun command file
 * @param {string} newTag 
 */
function appendTagToCommand(newTag) {
  const command = fs.readFileSync(RERUN_COMMAND_FILE_PATH, 'utf8');

  const newCommand = command.replace(/--cucumberOpts\.tags="([^"]*)/, (match, tags) => {
    // if there are existing tags add comma to match to append new tag
    if (tags) {
      match += ', ';
    }
    return match + newTag; 
  });

  fs.writeFileSync(RERUN_COMMAND_FILE_PATH, newCommand, 'utf8');
}

/**
 * Append new scenario tag to the failed tags file
 * @param {string} newTag 
 */
function appendTagToFailedTagsFile(newTag) {
  let tags = fs.readFileSync(FAILED_TAGS_FILE_PATH, 'utf8');
    
  if (tags) {
    tags += ', ';
  }
  tags += newTag;
  fs.writeFileSync(FAILED_TAGS_FILE_PATH, tags, 'utf8');
}

/**
 * Remove rerun command from file system
 */
function removeRerunCommand() {
  try {
    if (fs.existsSync(RERUN_COMMAND_FILE_PATH)) {
      fs.unlinkSync(RERUN_COMMAND_FILE_PATH);
      fs.unlinkSync(FAILED_TAGS_FILE_PATH);
      fs.rmdirSync(RERUN_COMMAND_FOLDER_PATH);
    }
  } catch(err) {}
}

/**
 * Remove scenario from storage after running it successfully.
 * @param {scenario} scenario
 */
function removeScenario(scenario) {
  const scenarioTag = getScenarioTag(scenario);

  if (scenarioTags.has(scenarioTag)) {
    const scenarioTagCount = scenarioTags.get(scenarioTag);
    if (scenarioTagCount === 1) {
      scenarioTags.delete(scenarioTag);
    } else {
      scenarioTags.set(scenarioTag, scenarioTagCount - 1)
    }
  }
}

/**
 * Store scenario before running it. Cleans up previous rerun command for first storage.
 * @param {scenario} scenario
 */
function addScenario(scenario) {
    if (scenarioTags.size === 0) {
        removeRerunCommand();
    }
  const scenarioTag = getScenarioTag(scenario);
  if (scenarioTags.has(scenarioTag)) {
    const scenarioTagCount = scenarioTags.get(scenarioTag);
    scenarioTags.set(getScenarioTag(scenario), scenarioTagCount + 1);
  } else {
    scenarioTags.set(getScenarioTag(scenario), 1);
  }  
}

/**
 * For first failed scenario create base rerun command and failed tags file
 * Appends scnario tag to both files when it is the first failing occurance of the scenario tag
 * @param {scenario} scenario
 */
function createRerunCommand(scenario) {
    if (!fs.existsSync(RERUN_COMMAND_FILE_PATH)) {
      createRerunCommandFolder();
      createCommandFile();
      createFailedTagsFile();
    }
  const scenarioTag = getScenarioTag(scenario);
  if (scenarioTags.has(scenarioTag) && scenarioTags.get(scenarioTag) === 1) {
    appendTagToCommand(scenarioTag);
    appendTagToFailedTagsFile(scenarioTag);
  }
}

module.exports = {
  addScenario,
  removeScenario,
  createRerunCommand,
};
