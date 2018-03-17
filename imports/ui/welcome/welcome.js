//------------------------ IMPORTS

import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";
import WordCloud from "wordcloud";
import {Cloud} from "../../api/cloud.js";
import {getUserLanguage} from "../../startup/client/i18n";
import "./welcome.html";
import {Session} from "meteor/session";

Meteor.subscribe("wordcloud");

function setActiveLanguage() {
	let language = getUserLanguage();
	TAPi18n.setLanguage(language);
	Session.set('activeLanguage', language);
}

/**
 * This method nserts a hover message for the wordcloud content
 *  @param {Object} item - Array containing data of the wordcloud object (name, description, kind and color)
 */
function wordcloudClick(item) {
	Session.set('wordcloudItem', item);
	$('#wordcloudModal').modal('show');
}

function wordcloudHover(item, dimension) {
	if (dimension !== undefined) {
		$('#tag-cloud-canvas').css('cursor', 'pointer');
	} else {
		$('#tag-cloud-canvas').css('cursor', 'unset');
	}
}

/**
 * This method fills the canvas with a wordcloud by using this library: https://github.com/timdream/wordcloud2.js
 */
function createTagCloud() {
	$('#cards-welcome-image').css('height', $('.color-cards').height());
	if ($(window).height() <= 500) {
		$('#tag-cloud-canvas').css('height', '0');
		$('#tag-cloud-container').css('height', '0');
		return;
	}
	$('#tag-cloud-canvas').css('height', 'unset');
	$('#tag-cloud-container').css('height', 'unset');
	let cloud = Cloud.find({}).fetch();
	let list = [];

	if (cloud.length > 0) {
		list = cloud[0].list;
	} else {
		return;
	}
	document.getElementById('tag-cloud-canvas').height = $(window).height() - ($('.panel-heading').outerHeight(true) + $('#login').outerHeight(true));
	document.getElementById('tag-cloud-canvas').width = document.getElementById('tag-cloud-container').offsetWidth;
	let textScale = 1.2;
	let gridSize = Math.round(16 * $('#tag-cloud-container').width() / 1440);
	let weightFactor = Math.pow(textScale, 2.3) * $('#tag-cloud-container').width() / 450;
	WordCloud(document.getElementById('tag-cloud-canvas'),
		{
			list: list,
			gridSize: gridSize,
			weightFactor: weightFactor,
			minSize: 14,
			drawOutOfBound: false,
			rotateRatio: 0,
			fontFamily: 'Roboto, Helvetica, Arial,sans-serif',
			color: "white",
			hover: wordcloudHover,
			click: wordcloudClick,
			backgroundColor: 'rgba(255,255,255, 0)',
			wait: 75
		});
}

//------------------------ LOGIN EVENT

Template.welcome.events({
	'click #facebook': function () {
		Meteor.loginWithFacebook({}, function (err) {
			if (err) {
				throw new Meteor.Error("Facebook login failed");
			} else {
				setActiveLanguage();
			}
		});
	},

	'click #twitter': function () {
		Meteor.loginWithTwitter({}, function (err) {
			if (err) {
				throw new Meteor.Error("Twitter login failed");
			} else {
				setActiveLanguage();
			}
		});
	},

	'click #google': function () {
		Meteor.loginWithGoogle({}, function (err) {
			if (err) {
				throw new Meteor.Error("Google login failed");
			} else {
				setActiveLanguage();
			}
		});
	},

	'click #cas': function () {
		Meteor.loginWithCas(function (err) {
			if (err) {
				throw new Meteor.Error("CAS login failed");
			} else {
				setActiveLanguage();
			}
		});
	},

	// Backdoor for login in acceptance tests
	'click #BackdoorLogin': function () {
		if (Meteor.settings.public.displayLoginButtons.displayTestingBackdoor) {
			Meteor.insecureUserLogin($("#TestingBackdoorUsername").val(), function (err, result) {
				if (result) {
					setActiveLanguage();
				}
			});
		}
	},

	'click #logout': function () {
		Meteor.logout(function (err) {
			if (err) {
				throw new Meteor.Error("Logout failed");
			}
		});
	}
});

Template.wordcloudModal.helpers({
	getWordcloudSubject: function () {
		return Session.get('wordcloudItem')[0];
	},
	getWordcloudContent: function () {
		return Session.get('wordcloudItem')[3];
	}
});

Template.welcome.onRendered(function () {
	if (Meteor.settings.public.displayLoginButtons.displayCas) {
		$('.panel-footer').append('<a id="cas" href=""><img src="img/gruen_eckig_Doktorhut.png" alt="use CAS for login"/></a>');
	}
	if (Meteor.settings.public.displayLoginButtons.displayFacebook) {
		$('.panel-footer').append('<a id="facebook" href=""><img src="img/social_facebook_box_white.png" alt="login using facebook"/></a>');
	}
	if (Meteor.settings.public.displayLoginButtons.displayTwitter) {
		$('.panel-footer').append('<a id="twitter" href=""><img src="img/social_twitter_box_white.png" alt="use twitter for login"/></a>');
	}
	if (Meteor.settings.public.displayLoginButtons.displayGoogle) {
		$('.panel-footer').append('<a id="google" href=""><img src="img/social_google_box_white.png" alt="use google for login"/></a>');
	}

	// Backdoor for login in acceptance tests
	if (Meteor.settings.public.displayLoginButtons.displayTestingBackdoor) {
		$('.panel-footer').append('<a id="BackdoorLogin" href=""><img src="img/backdoor-login.png" alt="use backdoor for' +
			' login"/></a>');
		$('.panel-footer').append('<span class="btn-group backdoorLogin"><label id="backdoor-label">Backdoor users:</label><br><select class="btn btn-secondary btn-raised" id="TestingBackdoorUsername" aria-labelledby="backdoor-label">' +
			'<option id="adminLogin" value="admin">admin  (Back end access)</option>' +
			'<option id="editorLogin" value="editor">editor (Back end access)</option>' +
			'<option id="standardLogin" value="standard">standard</option>' +
			'<option id="universityLogin" value="university">university</option>' +
			'<option id="lecturerLogin" value="lecturer">lecturer</option>' +
			'<option id="proLogin" value="pro">pro</option>' +
			'<option id="blockedLogin" value="blocked">blocked</option>' +
			'<option id="firstLogin" value="firstLogin">firstLogin</option>' +
			'</select></span>');
	}
	this.autorun(() => {
		createTagCloud();
	});
	$("#cards-welcome-image").load(function () {
		createTagCloud();
	});
	$(window).resize(function () {
		createTagCloud();
	});
});
