//------------------------ IMPORTS

import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";
import {Session} from "meteor/session";
import "./presentation.html";
import {updateNavigation} from "../card/card";

Meteor.subscribe("cardsets");
Meteor.subscribe("cards");
Session.set('animationPlaying', false);


function updatePresentationClock() {
	let date = new Date();
	let hr = date.getHours();
	let min = date.getMinutes();
	let sec = date.getSeconds();
	let hrPosition = hr * 360 / 12 + ((min * 360 / 60) / 12);
	let minPosition = min * 360 / 60;
	let secPosition = sec * 360 / 60;
	$("#hour").css("transform","rotate(" + hrPosition + "deg)");
	$("#minute").css("transform","rotate(" + minPosition + "deg)");
	$("#second").css("transform","rotate(" + secPosition + "deg)");
}

/*
 * ############################################################################
 * presentationView
 * ############################################################################
 */

Template.presentationView.onRendered(function () {
	updateNavigation();
});

/*
 * ############################################################################
 * presentationClock
 * ############################################################################
 */
let clockInterval;
Template.presentationClock.onRendered(function () {
	updatePresentationClock();
	if (clockInterval === undefined) {
		clockInterval = setInterval(updatePresentationClock, 1000);
	}
});

Template.presentationClock.onDestroyed(function () {
	if (clockInterval !== undefined) {
		clearInterval(clockInterval);
		clockInterval = undefined;
	}
});
