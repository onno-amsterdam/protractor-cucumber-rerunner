// module tests the rerun.js module; 

function getTagFromScenario(){
    // can't be tested without a scenario; 
    console.log('Test not yet implemented!'); 
}

function getSetTagsTest(){
    var rerun = require('../features/steps/rerun.js');
    var tags = ['tagOne', 'tagTwo']; 
    rerun.setTags(tags); 
    console.log('The tags returned: ' + rerun.getTags()); 
}

function addToRerunTest(){
    var rerun = require('../features/steps/rerun.js');
    rerun.addToRerun()
}

getTagFromScenario(); 
getSetTagsTest(); 
addToRerunTest(); 