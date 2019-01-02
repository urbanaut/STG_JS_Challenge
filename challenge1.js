require('chromedriver');
var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;
var expect = require("chai").expect;
var until = webdriver.until;
var By = webdriver.By;


describe("Challenge1 Suite", function(){
    this.timeout(20000);
    let driver;

    before(function () {
        driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .forBrowser('chrome')
        .build();
    });

    after(function () {
        driver.quit();
    });

    it("should open the Copart website", function() {
        return driver.get("https://www.copart.com/");
    });

    it("should have a title containing 'Auto Auction'", function(done){
        driver.getTitle().then(function(title) {
            expect(title).to.contain('Auto Auction');
            done();
        }).catch(err => {
            done(err);
        })
    });

    it("should search for exotic", function() {
        var searchbox =  driver.findElement(By.id('input-search'));
        var submit = driver.findElement(By.xpath('//button[@data-uname="homepageHeadersearchsubmit"]'));

        searchbox.sendKeys('exotic');
        submit.click();
 
        return driver.wait(until.elementLocated(By.linkText('Save Search')), 10000);
    });

    it("should find a Porsche in the results", function(done) {
        setTimeout(function() {
            driver.findElements(By.xpath('//table//span[@data-uname="lotsearchLotmake" and text()="PORSCHE"]'))
            .then(function(elems) {
                assert.isAtLeast(elems.length, 1, "Porsche not found.")
                done();
            }).catch(err => {
                done(err);
            });
        },3000);
    });

})
