require('chromedriver');
var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;
var expect = require("chai").expect;
var until = webdriver.until;
var By = webdriver.By;

describe("Chanllenge2 Suite", function() {
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

    it("should open the Copart website", function(done) {
        driver.get("https://www.copart.com/");

        setTimeout(function() {
            driver.getTitle().then(function(title) {
                expect(title).to.contain('Auto Auction');
                done();
            }).catch(err => {
                done(err);
            })
        }, 5000);
    });

    it("should get a list of all available car types", function(done) {
        setTimeout(function() {
            var typesLink = driver.findElement(By.linkText('Types'));
            typesLink.click();
            var moreLink = driver.findElement(By.linkText('More...'));
            moreLink.click();
            done();
        }, 3000)
    });

    it("should get a list of vehicle types", function(done) {
        setTimeout(function() {
            driver.findElements(By.xpath('(//div[@class="panel-body vehiclefinder-list"])[1]//a'))
            .then(function(elems) {
                var types = [];
                for(let i = 0; i < elems.length; i++) {
                    types.push(elems[i]);
                    types[i].getText()
                    .then(function(text) {
                        console.log(text);
                    })
                }
                assert.isAtLeast(types.length, 10, 'No types found.')
                done();
            }).catch(err => {
                done(err);
            });
        }, 3000);
    });


})