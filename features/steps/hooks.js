// the javascript class with the after and before hooks
var rerun = require('./rerun.js'); 

module.exports = function() {

  // set the default global timeout
  this.setDefaultTimeout(60 * 1000);

  // Asynchronous Callback
  this.Before({timeout: 60 * 1000}, function (scenario, callback) {
    console.log("Onno_Debug: the Before is called!"); 
    rerun.addScenarioTag(scenario); 
    callback(); 
  }); 

  // Asynchronous Promise
  this.After(function (scenario, callback) {
    
    console.log("Onno_Debug: the After is called!"); 
    
    // if the scenario is not failed, remove it from the array; 
    if(scenario.isFailed()){
      console.log("Onno_Debug: the scenario is FAILED!"); 
      rerun.logAllFailed(); 
      rerun.createCommand(); 
    } else {
      console.log("Onno_Debug: the scenario is PASSED!");
      rerun.removePassedTag(scenario); 
      rerun.logAllFailed(); 
    }    
    callback();
  });
};
