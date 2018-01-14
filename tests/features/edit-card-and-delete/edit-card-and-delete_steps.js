import * as cardset from "../../features_helper/cardset.js";
import * as navigation from "../../features_helper/navigation.js";

module.exports = function () {
	'use strict';
	var sFront,sBack, url;
	/**
	 * ---------------------------------------------------------------------
	 * Background
	 * ---------------------------------------------------------------------
	 */
	this.Given(/^User is logged in$/, function () {
		navigation.login("standardLogin");
	});
	this.Given(/^he is on the view of a cardset \(EaC\)$/, function () {
		navigation.selectMyCardset();
		navigation.selectCardsetLink(8);
		navigation.contentVisible(".carousel-inner");
	});
	this.When(/^the user clicks on the edit button of the first card$/, function () {
		url = browser.getUrl();
		cardset.editCard();
	});
	this.Then(/^he enters "([^"]*)" for the front of the card \(EaC\)$/, function (arg1) {
		navigation.contentVisible('#contentEditor');
		let frontSelector = browser.element('#editor');
		sFront = frontSelector.getAttribute("data-content");
		navigation.setContent('#contentEditor', arg1);
	});
	this.Then(/^he enters a "([^"]*)" for the back of the card \(EaC\)$/, function (arg1) {
		navigation.clickElement('#editBack');
		let backSelector = browser.element('#editor');
		sBack = backSelector.getAttribute("data-content");
		navigation.setContent('#contentEditor', arg1);
	});
	this.Then(/^he press on the save button \(EaC\)$/, function () {
		cardset.saveCardReturn();
	});
	this.Then(/^he should be redirected to his own cardsets view back again \(EaC\)$/, function () {
		navigation.compareUrl(url, browser.getUrl());
	});
	this.Then(/^the front of the card should be "([^"]*)"$/, function (arg1) {
		navigation.compareContent('.detailfront0', arg1, 0);
	});
	this.Then(/^he wants to undo previous changes$/, function () {
		cardset.editCard();
		navigation.setContent('#contentEditor', sFront);
		navigation.clickElement('#editBack');
		navigation.setContent('#contentEditor', sBack);
		cardset.saveCardReturn();
	});
	this.Then(/^he should be redirected to his own cardsets view once again \(EaC\)$/, function () {
		navigation.compareUrl(url, browser.getUrl());
	});
	this.Then(/^he wants to delete the card$/, function () {
		cardset.editCard();
		cardset.deleteCard();
		cardset.deleteCardConfirm();
	});
	this.Then(/^he logs out$/, function () {
		navigation.logout();
	});
};
