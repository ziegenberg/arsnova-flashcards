import {login, logout} from "../helper_functions.js";

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
	});

	this.Given(/^User is on the my cardset view$/, function () {
		browser.waitForVisible('#cardsets',5000);
		browser.click('#cardsets');
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
		browser.waitUntil(function () {
			browser.setValue('#editSetName', title);
			return browser.getValue('#editSetName') === title;
		}, 5000, 'expected text to be different after 5s');
	});

	this.Then(/^he should be able to edit the cardset description$/, function () {
		// Warten bis Beschreibung eingegeben wird eingetippt wird
		browser.waitUntil(function () {
			browser.setValue('#editSetDescription', description);
			return browser.getValue('#editSetDescription') === description;
		}, 5000, 'expected text to be different after 5s');
	});

	this.Then(/^he should be able to edit the module name$/, function () {
		browser.waitUntil(function () {
			browser.setValue('#editSetModule', module);
			return browser.getValue('#editSetModule') === module;
		}, 5000, 'expected text to be different after 5s');
	});
	this.Then(/^he should be able to edit the module initials$/, function () {
		browser.waitUntil(function () {
			browser.setValue('#editSetModuleShort', moduleInitials);
			return browser.getValue('#editSetModuleShort') === moduleInitials;
		}, 5000, 'expected text to be different after 5s');
	});

	this.Then(/^he should be able to edit the module ID$/, function () {
		browser.waitUntil(function () {
			browser.setValue('#editSetModuleNum', moduleID);
			return browser.getValue('#editSetModuleNum') === moduleID;
		}, 5000, 'expected text to be different after 5s');
	});
	this.Then(/^he should be able to edit the college$/, function () {
		browser.waitForVisible('#editSetCollege',5000);
		browser.click('#editSetCollege');
		browser.waitForVisible('li[data="' + college + '"] a', 5000);
		browser.click('li[data="' + college + '"] a');
	});
	this.Then(/^he should be able to edit the course$/, function () {
		browser.waitForVisible('#editSetCourse',5000);
		browser.click('#editSetCourse');
		browser.waitForVisible('li[data="' + course + '"] a', 5000);
		browser.click('li[data="' + course + '"] a');
	});
	this.Then(/^he should press the save deck of cards button$/, function () {
		browser.waitForVisible('#cardSetSave',5000);
		browser.click('#cardSetSave');
	});
	this.Then(/^he should see the details of that cardset with the correct values$/, function () {
		browser.waitUntil(function () {
			return browser.isExisting('.modal-open') === false;
		}, 5000, 'expected text to be different after 5s');
		browser.waitForVisible('#editCardset',5000);
		browser.click('#editCardset');
		browser.waitForVisible('#editSetName', 5000);
		browser.waitForExist('#editSetName',5000);
		expect(browser.elements('#editSetName').getAttribute("value")).toBe(title);
		browser.waitForExist('#editSetDescription',5000);
		expect(browser.elements('#editSetDescription').getAttribute("value")).toBe(description);
		browser.waitForExist('#editSetModule',5000);
		expect(browser.elements('#editSetModule').getAttribute("value")).toBe(module);
		browser.waitForExist('#editSetModuleShort',5000);
		expect(browser.elements('#editSetModuleShort').getAttribute("value")).toBe(moduleInitials);
		browser.waitForExist('#editSetModuleNum',5000);
		expect(browser.elements('#editSetModuleNum').getAttribute("value")).toBe(moduleID);

		browser.click('#cardSetCancel');
		browser.waitForVisible('#editSetName', 5000, true);
		logout();
	});
};
