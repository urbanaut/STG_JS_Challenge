require('chromedriver');
var fs = require('fs');
var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;
var expect = require("chai").expect;
const {By, Key, until} = webdriver;


describe("Challenge5 Suite", function(){
    this.timeout(20000);
    let driver;

    before(function () {
        driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .forBrowser('chrome')
        .build();
        driver.manage().window().maximize();
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

    it("should catch exception and take a screenshot if 'skyline' model not found", function(done) {
        setTimeout(function() {
            return driver.findElement(By.xpath('//a[@data-uname="homePageFindAVehicle"]')).click()
            .then(function() {
            return driver.findElement(By.xpath('//a[@data-uname="vehicleFinderTab"]')).click()
            .then(function() {
            setTimeout(function() {
                    return driver.findElement(By.xpath('//select[@data-uname="vehiclefinderMakedownbox"]')).click()
                    .then(function() {
                    return driver.findElement(By.xpath('//option[@label="Nissan"]')).click()
                    .then(function() {
                    return driver.findElement(By.xpath('//select[@data-uname="vehiclefinderModeldownbox"]')).click()
                    .then(function() {
                    return driver.findElement(By.xpath('//option[@label="SKYLINE"]')).click()
                    .then(function() {
                    return driver.findElement(By.xpath('//button[@data-uname="vehiclefinderSearchbutton"]')).click()
                    .then(function() {
                    done();
                    })
                    })
                    })
                    })
                    })
            }, 3000)
            })
            })
        }, 5000)
    });

    // it('should catch and throw an exception if link not found', async function() {
    //     try{

    //         // await driver.elementLocated(By.xpath('//h1[@class="nmt"]'));
    //         await driver.wait(until.elementLocated(By.xpath('//h1[@class="nmt"]')), 3000);
    //         // driver.wait(until.elementLocated(By.xpath('//h1[@class="nmt"]')), 3000);
    //         driver.findElement(By.xpath('//td/span[contains(text(),"SKYLINE")]')).click();
    //     } catch(e) {
    //         console.log('Unable to find link for Nissan Skyline.');
    //         driver.takeScreenshot()
    //         .then(function(base64Image) {
    //             var decodedImage = new Buffer.from(base64Image, 'base64');
    //             fs.writeFile('screen.jpg', decodedImage, function(err) {})
    //         })
    //     }
    // });
    it("should catch and throw an exception if link not found", function(done) {

        try{
            setTimeout(function(){
                return driver.findElement(By.xpath('//td/span[contains(text(),"SKYLINE")]')).click();
            },10000);
            done(err);
        } catch(err) {
            console.log('Unable to find link for Nissan Skyline.');
            driver.takeScreenshot()
            .then(function(base64Image) {
                console.log('\nTaking screenshot...\n');
                var decodedImage = new Buffer.from(base64Image, 'base64');
                return fs.writeFile('screen2.jpg', decodedImage, function(err) {})
            })
        }

    });
    
})