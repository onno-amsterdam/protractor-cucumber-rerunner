// the step definitions for the cucumber scenarios
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

module.exports = function() {

    this.Given(/^I open the page$/, function (callback) {
        browser.waitForAngularEnabled(false);
        browser.get("https://angular.io/guide/testing"); 
        browser.sleep(2000);
        callback();
    });

    this.Then(/^I check the elements text "([^"]*)"$/, function (expectedText, callback) {
        element(By.id("testing")).getText()
            .then((text) => expect(text).to.equal(expectedText))
            .then(() => callback())
    });

    this.Given(/^I check the random number is selected$/, function (callback) {
        let promise = new Promise(resolve, reject => {
            let randNum = Math.floor(Math.random() * (3 - 1)) + 1;
            console.log("Random number created: " + randNum); 
            resolve(randNum);
        });

        promise
        .then((randomNumber) => expect(randomNumber).to.equal(2))
        .then(() => callback())
        .catch(error => {
            console.log("Failed!");
            callback(error);
        }); 
        
    });
}; 