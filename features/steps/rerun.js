// rerun module holds all functions to rerun the tests

var tags = []; 

function getTagFromScenario(scenario){
    console.log('Onno_Debug: the tag from scenario function is called!'); 
    var tag = scenario.getTags()[0].getName();
    console.log('Onno_Debug: this is the tag: ' + tag); 
    return tag; 
}



module.exports = {   

    // function finds the tag by the index, logs the tag and returns it; 
    getTagByIndex(index){
        var tag = tags[index];  
        console.log('Onno_Debug: the tag at index ' + index + ' = ' + tag); 
        return tag; 
    },

    removeTag(index){
        console.log('Onno_Debug: the remove tag function is called'); 
        tags.splice(index); 
    },

    getIndexByTag(tag){
        return tags.indexOf(tag); 
    },

    setTags: function(tags) {
        tags = tags; 
    }, 

    getTags: function() {
        return tags;  
    },

    addScenarioTag : function(scenario){
        // get the first name of the tag in the array of tags for the scenario
        var tag = getTagFromScenario(scenario);
        tags.push(tag); 
        console.log("Onno_Debug: tag added to array: " + tags[tags.length - 1]); 
    },

    // function removes the tag, should be called only when scenario is passed; 
    removePassedTag : function(tag) {
        this.removeTag(this.getIndexByTag(tag)); 
    }, 

    logAllFailed : function(){
        console.log('Onno_Debug: the log all failed function is called!'); 
        console.log('Onno_Debug: the length of the array = ' + tags.length); 
        for (tag in tags){
            console.log('Onno_Debug: the tag ' + tag + ' array of tags: ' + tags[tag]); 
        }
    }
}
