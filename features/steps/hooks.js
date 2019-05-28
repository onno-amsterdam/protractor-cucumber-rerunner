// the javascript class with the after and before hooks
const rerunManager = require('./rerun.js');

module.exports = function() {

  this.setDefaultTimeout(60 * 1000);

  this.Before({timeout: 60 * 1000}, function (scenario, callback) {
    rerunManager.addScenario(scenario);
    callback(); 
  }); 

  this.After(function (scenario, callback) {
    // synchronisity needs to be added because else it possible the file does not exist when the tag is added; 
    if(scenario.isFailed()){
      rerunManager.createRerunCommand(scenario);
      callback(); 
    } else {
      // needs to be synchronised because otherwise the tag added by the Before might be removed by the After;  
      rerunManager.removeScenario(scenario);
      callback(); 
    }    
  });
};
