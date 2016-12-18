import {login, logout, setResolution, agreeCookies} from "./helper_functions.js";

module.exports = function () {
	'use strict';

	var title = "new-title";
	var description = "new-description";
	var module = "new-module";
	var moduleInitials = "new-short";
	var moduleID = "43";
	var college = "JLU";
	var course = "Medizin";

	this.Given(/^User is on the site$/, function () {
		browser.url('http://localhost:3000');
	});

	this.Given(/^User is logged in$/, function () {
		login("testuser");
		agreeCookies();
		setResolution();
		browser.windowHandleSize();
	});

	this.Given(/^User is on the my cardset view$/, function () {
		browser.url('http://localhost:3000/created');
		var bool = browser.waitForVisible('#newCardSet', 15000);
		expect(bool).toBe(true);
	});

	this.When(/^User clicks on a cardset that he owns$/, function () {
		browser.click('#cardSetView tr:nth-child(1) td a');
	});

	this.Then(/^he is shown the details of the cardset$/, function () {
		browser.waitForVisible('#editCardset', 5000);
	});

	this.Then(/^he should push the edit cardset button$/, function () {
		browser.click('#editCardset');
	});

	this.Then(/^he should see the edit cardset form$/, function () {
		browser.waitForVisible('#editSetName', 5000);
	});

	this.Then(/^he should be able to edit the cardset title$/, function () {
		browser.setValue('#editSetName', title);
	});

	this.Then(/^he should be able to edit the cardset description$/, function () {
		browser.setValue('#editSetDescription', description);
	});
	this.Then(/^he should be able to edit the module name$/, function () {
		browser.setValue('#editSetModule', module);
	});
	this.Then(/^he should be able to edit the module initials$/, function () {
		browser.setValue('#editSetModuleShort', moduleInitials);
	});

	this.Then(/^he should be able to edit the module ID$/, function () {
		browser.setValue('#editSetModuleNum', moduleID);
	});
	this.Then(/^he should be able to edit the college$/, function () {
		browser.click('#editSetCollege');
		browser.waitForVisible('li[data="' + college + '"] a', 5000);
		browser.click('li[data="' + college + '"] a');
	});
	this.Then(/^he should be able to edit the course$/, function () {
		browser.click('#editSetCourse');
		browser.waitForVisible('li[data="' + course + '"] a', 5000);
		browser.click('li[data="' + course + '"] a');
	});
	this.Then(/^he should press the save deck of cards button$/, function () {
		browser.click('#cardSetSave');
		browser.pause(3000);
	});
	this.Then(/^he should see the details of that cardset with the correct values$/, function () {
		browser.click('#editCardset');
		browser.waitForVisible('#editSetName', 5000);

		expect(browser.elements('#editSetName').getAttribute("value")).toBe(title);
		expect(browser.elements('#editSetDescription').getAttribute("value")).toBe(description);
		expect(browser.elements('#editSetModule').getAttribute("value")).toBe(module);
		expect(browser.elements('#editSetModuleShort').getAttribute("value")).toBe(moduleInitials);
		expect(browser.elements('#editSetModuleNum').getAttribute("value")).toBe(moduleID);

		browser.click('#cardSetCancel');
		browser.waitForVisible('#editSetName', 5000, true);
		logout();
	});
};
