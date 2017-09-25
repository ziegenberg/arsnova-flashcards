//------------------------ IMPORTS

import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";
import {Session} from "meteor/session";
import {Cardsets} from "../../api/cardsets.js";
import {Learned} from "../../api/learned.js";
import {turnCard, resizeAnswers} from "../card/card.js";
import "./box.html";

Meteor.subscribe("cardsets");
Meteor.subscribe("cards");
Meteor.subscribe('learned');

Session.set('isFront', true);

/*
 * ############################################################################
 * box
 * ############################################################################
 */

Template.box.onCreated(function () {
	Session.set('modifiedCard', undefined);
	Session.set('activeCardset', Cardsets.findOne({"_id": Router.current().params._id}));
});

Template.box.helpers({
	noCards: function () {
		return !Learned.findOne({
			cardset_id: Session.get('activeCardset')._id,
			user_id: Meteor.userId(),
			box: {$ne: 6}
		});
	},
	isFinished: function () {
		return !Learned.findOne({
			cardset_id: Session.get('activeCardset')._id,
			user_id: Meteor.userId(),
			active: true
		});
	}
});


Template.box.events({
	/**
	 * Go back to cardset from leitner box mode
	 * Go back one page in the history, on click of the "Return to cardset" button
	 */
	"click #backButton": function () {
		window.history.go(-1);
	}
});

/*
 * ############################################################################
 * boxMain
 * ############################################################################
 */

Template.boxMain.onRendered(function () {
	resizeAnswers();
	$(window).resize(function () {
		resizeAnswers();
	});
});

Template.boxMain.helpers({
	isFront: function () {
		var isFront = Session.get('isFront');
		return isFront === true;
	}
});

Template.boxMain.events({
	"click .box": function (evt) {
		if (($(evt.target).data('type') !== "showHint")) {
			var isFront = Session.get('isFront');
			if (isFront === true) {
				Session.set('isFront', false);
			} else {
				Session.set('isFront', true);
			}
			$('html, body').animate({scrollTop: '0px'}, 300);
		}
	},
	"click #known": function () {
		Meteor.call('updateLearned', Session.get('activeCardset')._id, $('.carousel-inner > .active').attr('data-id'), false);
		Session.set('isFront', true);
		turnCard();
		$('html, body').animate({scrollTop: '0px'}, 300);
	},
	"click #notknown": function () {
		Meteor.call('updateLearned', Session.get('activeCardset')._id, $('.carousel-inner > .active').attr('data-id'), true);
		Session.set('isFront', true);
		turnCard();
		$('html, body').animate({scrollTop: '0px'}, 300);
	}
});
