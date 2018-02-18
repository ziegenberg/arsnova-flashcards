//------------------------ IMPORTS

import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";
import {Session} from "meteor/session";
import {Leitner, Wozniak} from "../../api/learned.js";
import {turnCard} from "../card/card.js";
import "./learn.html";

Meteor.subscribe("cardsets");
Meteor.subscribe("cards");
Session.set('animationPlaying', false);

export function skipAnswer(scrollRight = true) {
	let skippedCard = $('.carousel-inner > .active').attr('data-id');
	if (scrollRight) {
		$('.carousel').carousel('next');
	} else {
		$('.carousel').carousel('prev');
	}
	$('html, body').animate({scrollTop: '0px'}, 300);
	$('#cardCarousel').on('slid.bs.carousel', function () {
		if (ActiveRoute.name('box')) {
			Meteor.call('skipCard', Router.current().params._id, skippedCard, 0);
		} else {
			Meteor.call('skipCard', Router.current().params._id, skippedCard, 1);
		}
		Session.set('animationPlaying', false);
	});
}

/*
 * ############################################################################
 * learnAlgorithms
 * ############################################################################
 */

Template.learnAlgorithms.onCreated(function () {
	Session.set('modifiedCard', undefined);
	Session.set('isQuestionSide', true);
	if (ActiveRoute.name('box')) {
		Meteor.subscribe('leitner');
	}
	if (ActiveRoute.name('memo')) {
		Meteor.subscribe("wozniak");
	}
	Session.set('animationPlaying', false);
});

Template.learnAlgorithms.helpers({
	noCards: function () {
		if (ActiveRoute.name('box')) {
			return !Leitner.findOne({
				cardset_id: Router.current().params._id,
				user_id: Meteor.userId(),
				box: {$ne: 6}
			});
		}
		if (ActiveRoute.name('memo')) {
			return !Wozniak.findOne({});
		}
	},
	isFinished: function () {
		if (ActiveRoute.name('box')) {
			return !Leitner.findOne({
				cardset_id: Router.current().params._id,
				user_id: Meteor.userId(),
				active: true
			});
		}
		if (ActiveRoute.name('memo')) {
			let actualDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
			actualDate.setHours(0, 0, 0, 0);

			return !Wozniak.findOne({
				cardset_id: Router.current().params._id,
				user_id: Meteor.userId(),
				nextDate: {
					$lte: actualDate
				}
			});
		}
	}
});

Template.learnAlgorithms.events({
	"click .box": function (evt) {
		if (($(evt.target).data('type') !== "cardNavigation")) {
			$('html, body').animate({scrollTop: '0px'}, 300);
		}
	}
});

/*
 * ############################################################################
 * learnAnswerOptions
 * ############################################################################
 */

Template.learnAnswerOptions.onRendered(function () {
	$('#answerOptions').css('width', $('#cardCarousel').width());
	$(window).resize(function () {
		$('#answerOptions').css('width', $('#cardCarousel').width());
	});
	$('#cardCarousel').on('slide.bs.carousel', function () {
		Session.set('animationPlaying', true);
	});
});

Template.learnAnswerOptions.helpers({
	isQuestionSide: function () {
		return Session.get('isQuestionSide');
	},
	isAnimationPlaying: function () {
		return Session.get('animationPlaying');
	},
	gotOneCardLeft: function () {
		if (Session.get('isQuestionSide')) {
			return $('.carousel-inner > .item').length === 1;
		}
	}
});

Template.learnAnswerOptions.events({
	"click #learnShowAnswer": function () {
		turnCard();
		$('html, body').animate({scrollTop: '0px'}, 300);
	},
	"click #skipAnswer": function () {
		skipAnswer();
	},
	"click #known": function () {
		let answeredCard = $('.carousel-inner > .active').attr('data-id');
		turnCard();
		$('.carousel').carousel('next');
		$('html, body').animate({scrollTop: '0px'}, 300);
		if ($('.carousel-inner > .item').length === 1) {
			Meteor.call('updateLeitner', Router.current().params._id, answeredCard, false);
		} else {
			$('#cardCarousel').on('slid.bs.carousel', function () {
				Meteor.call('updateLeitner', Router.current().params._id, answeredCard, false);
				Session.set('animationPlaying', false);
			});
		}
	},
	"click #notknown": function () {
		let answeredCard = $('.carousel-inner > .active').attr('data-id');
		turnCard();
		$('.carousel').carousel('next');
		$('html, body').animate({scrollTop: '0px'}, 300);
		if ($('.carousel-inner > .item').length === 1) {
			Meteor.call('updateLeitner', Router.current().params._id, answeredCard, true);
		} else {
			$('#cardCarousel').on('slid.bs.carousel', function () {
				Meteor.call('updateLeitner', Router.current().params._id, answeredCard, true);
				Session.set('animationPlaying', false);
			});
		}
	},
	"click .rate-answer": function (event) {
		let answeredCard = $('.carousel-inner > .active').attr('data-id');
		turnCard();
		$('.carousel').carousel('next');
		$('html, body').animate({scrollTop: '0px'}, 300);
		if ($('.carousel-inner > .item').length === 1) {
			Meteor.call("updateWozniak", Router.current().params._id, answeredCard, $(event.currentTarget).data("id"));
		} else {
			$('#cardCarousel').on('slid.bs.carousel', function () {
				Meteor.call("updateWozniak", Router.current().params._id, answeredCard, $(event.currentTarget).data("id"));
				Session.set('animationPlaying', false);
			});
		}
	}
});

/*
 * ############################################################################
 * learnAnswerOptions
 * ############################################################################
 */

Template.learnBackButton.events({
	"click #backButton": function () {
		Router.go('cardsetdetailsid', {
			_id: Router.current().params._id
		});
	}
});
