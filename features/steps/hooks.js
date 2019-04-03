// the javascript class with the after and before hooks
var rerun = require('./rerun.js'); 

module.exports = function() {

  this.setDefaultTimeout(60 * 1000);

  this.Before({timeout: 60 * 1000}, function (scenario, callback) {
    rerun.addScenarioTag(scenario); 
    callback(); 
  }); 

  this.After(function (scenario, callback) {
    if(scenario.isFailed()){
      rerun.createCommand(); 
    } else {
      rerun.removePassedTag(); 
    }    
    callback();
  });
};
