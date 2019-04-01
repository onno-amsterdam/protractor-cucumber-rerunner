class Rerun {
    
    constructor(testRun, tags) {
        this.testRun = testRun; 
        this._tags = tags; 
        console.log("Debug: the constructor is called!");      
    } 


    addToRerun(scenario){
        // get the first name of the tag in the array of tags for the scenario
        var scenarioTag = scenario.getTags()[0].getName();
        tags.push[scenarioTag]; 
        console.log("Debug: the scenario is - " + scenarioTag); 
    }
        
    logAllFailed(){
        console.log("Debug: the rerun logAllFailed is called;"); 
        console.log("Debug: this is tag one: " + tags[0]); 
        for(tag in tags){
           console.log("Debug: the array of tags: " + tag); 
        }
    }
}