exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',
  
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
     // 'browserName': 'internet explorer', - special installation needed
     // 'version':'10',
     'browserName': 'chrome',
     //'browserName': 'firefox'
    },
    // Base URL can be used when test run on specific host and/or port 
    // baseUrl:'http://127.0.0.1:8080',
    // Spec patterns are relative to the current working directly when
    // protractor is called.
    // specs: ['test/protractor/protractor.js'],
  
    // spec location for the cucumber tests
    specs: ['features/*.feature'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
      showColors: true,
      defaultTimeoutInterval: 30000
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
  
    cucumberOpts: {
      require: [
        'features/steps/*_steps.js',
        'features/steps/hooks.js',
      ],
      format: 'pretty'
    }, 

    ignoreUncaughtExceptions:true
  };