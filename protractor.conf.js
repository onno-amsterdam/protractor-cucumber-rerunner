exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',
  
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
      'browserName': 'chrome'
    },

    // spec location for the cucumber tests
    specs: ['features/scenarios.feature'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
      showColors: true,
      defaultTimeoutInterval: 30000
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
  
    cucumberOpts: {
      require: [
        'features/steps/step_defs.js',
        'features/steps/hooks.js',
      ],
      format: 'pretty'
    }, 

    ignoreUncaughtExceptions:true
  };