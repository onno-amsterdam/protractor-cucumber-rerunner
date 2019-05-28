// the javascript class with the after and before hooks
var rerun = require('./rerun.js'); 

module.exports = function() {

  this.setDefaultTimeout(60 * 1000);

  this.Before({timeout: 60 * 1000}, function (scenario, callback) {
    rerun.addScenarioTag(scenario); 
    callback(); 
  }); 

  this.After(function (scenario, callback) {
    // synchronisity needs to be added because else it possible the file does not exist when the tag is added; 
    if(scenario.isFailed()){
      rerun.createCommand(); 
      callback(); 
    } else {
      // needs to be synchronised because otherwise the tag added by the Before might be removed by the After;  
      rerun.removePassedTag(); 
      callback(); 
    }    
  });
};
