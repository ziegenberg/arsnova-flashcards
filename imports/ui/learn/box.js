//------------------------ IMPORTS

import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";
import {Session} from "meteor/session";
import {Cards} from "../../api/cards.js";
import {Learned} from "../../api/learned.js";
import {Graph} from "../../api/graph.js";
import "./box.html";


Meteor.subscribe("cardsets");
Meteor.subscribe("cards");


Session.set('selectedBox', null);
Session.set('isFront', true);
Session.set('maxIndex', 1);
Session.set('isFinish', false);

Meteor.subscribe('learned', function () {
	Session.set('data_loaded', true);
});

function drawGraph() {
	var query = {};
	if (Meteor.userId() !== undefined) {
		query.user_id = Meteor.userId();
	}
	if (Router.current().params._id !== undefined) {
		query.cardset_id = Router.current().params._id;
	}
	query.box = 1;
	var box1 = Learned.find(query).count();
	query.box = 2;
	var box2 = Learned.find(query).count();
	query.box = 3;
	var box3 = Learned.find(query).count();
	query.box = 4;
	var box4 = Learned.find(query).count();
	query.box = 5;
	var box5 = Learned.find(query).count();
	query.box = 6;
	var box6 = Learned.find(query).count();
	var userData = [Number(box1), Number(box2), Number(box3), Number(box4), Number(box5), Number(box6)];

	if (Session.get('data_loaded')) {
		var ctx = document.getElementById("boxChart").getContext("2d");
		var boxChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: [TAPi18n.__('subject1'), TAPi18n.__('subject2'), TAPi18n.__('subject3'), TAPi18n.__('subject4'), TAPi18n.__('subject5'), TAPi18n.__('subject6')],
				datasets: [
					{
						backgroundColor: "rgba(242,169,0,0.5)",
						borderColor: "rgba(74,92,102,0.2)",
						borderWidth: 1,
						data: userData,
						label: 'Anzahl Karten'
					}
				]
			},
			options: {
				responsive: true,
				legend: {
					display: false
				},
				scales: {
		      yAxes: [{
		        ticks: {
		          stepSize: 1
						}
					}]
        }
			}
		});
	}
}


/**
 * ############################################################################
 * box
 * ############################################################################
 */

Template.box.onCreated(function () {
	var cardset_id = Router.current().params._id;
	var cards = Cards.find({
		cardset_id: cardset_id
	});
	cards.forEach(function (card) {
		Meteor.call("addLearned", card.cardset_id, card._id);
	});
});

Template.box.helpers({
	boxSelected: function () {
		var selectedBox = Session.get('selectedBox');
		if (this.learningActive) {
			return true;
		}
		return selectedBox !== null;
	},
	isNotEmpty: function () {
		var notEmpty;
		if (this.learningActive) {
			notEmpty = Learned.find({
				cardset_id: this._id,
				user_id: Meteor.userId(),
				active: true
			}).count();
		} else {
			notEmpty = Learned.find({
				cardset_id: this._id,
				user_id: Meteor.userId(),
				box: parseInt(Session.get('selectedBox'))
			}).count();
		}
		return notEmpty;
	},
	isFinish: function () {
		if (this.learningActive && Learned.find({cardset_id: this._id, user_id: Meteor.userId(), active: true}).count()) {
			Session.set('isFinish', false);
		}
		return Session.get('isFinish');
	}
});

/**
 * ############################################################################
 * boxMain
 * ############################################################################
 */

Template.boxMain.helpers({
	isLearningActive: function () {
		return this.learningActive;
	},
	isFront: function () {
		var isFront = Session.get('isFront');
		return isFront === true;
	},
	box: function () {
		return Session.get("selectedBox");
	},
	getCardsByBox: function () {
		var selectedBox = parseInt(Session.get('selectedBox'));

		var learnedCards = Learned.find({
			cardset_id: this._id,
			user_id: Meteor.userId(),
			box: selectedBox
		}, {
			sort: {
				currentDate: 1
			}
		});

		var cards = [];
		learnedCards.forEach(function (learnedCard) {
			var card = Cards.findOne({
				_id: learnedCard.card_id
			});
			cards.push(card);
		});

		return cards;
	},
	getCardsByLeitner: function () {
		var learnedCards = Learned.find({
			cardset_id: this._id,
			user_id: Meteor.userId(),
			active: true
		}, {
			sort: {
				currentDate: 1
			}
		});

		var cards = [];
		learnedCards.forEach(function (learnedCard) {
			var card = Cards.findOne({
				_id: learnedCard.card_id
			});
			cards.push(card);
		});

		return cards;
	},
	cardActiveByBox: function (index) {
		return 1 === index + 1;
	},
	countBox: function () {
		var maxIndex = Learned.find({
			cardset_id: this._id,
			user_id: Meteor.userId(),
			box: parseInt(Session.get('selectedBox'))
		}).count();
		Session.set('maxIndex', maxIndex);
		return maxIndex;
	},
	countLeitner: function () {
		var maxIndex = Learned.find({
			cardset_id: this._id,
			user_id: Meteor.userId(),
			active: true
		}).count();
		Session.set('maxIndex', maxIndex);
		return maxIndex;
	},
	boxMarkdownFront: function (front, index) {
		Meteor.promise("convertMarkdown", front)
			.then(function (html) {
				$(".front" + index).html(html);
				$('table').addClass('table');
			});
	},
	boxMarkdownBack: function (back, index) {
		Meteor.promise("convertMarkdown", back)
			.then(function (html) {
				$(".back" + index).html(html);
				$('table').addClass('table');
			});
	}
});

Template.boxMain.events({
	"click .box": function () {
		var isFront = Session.get('isFront');
		if (isFront === true) {
			Session.set('isFront', false);
		} else {
			Session.set('isFront', true);
		}
	},
	"click #known": function () {
		var currentCard = $('.carousel-inner > .active').attr('data');
		var currentLearned = Learned.findOne({
			card_id: currentCard,
			user_id: Meteor.userId()
		});

		var selectedBox;
		if (this.learningActive) {
			selectedBox = currentLearned.box;
		} else {
			selectedBox = parseInt(Session.get('selectedBox'));
		}

		if (selectedBox < 6) {
			var date = new Date();
			if (this.learningActive) {
				date = new Date(date.getTime() + this.learningInterval[selectedBox] * 86400000);
			}
			Meteor.call('updateLearned', currentLearned._id, selectedBox + 1, date);
		}

		if (1 === parseInt(Session.get('maxIndex'))) {
			Session.set('isFinish', true);
		}
		Session.set('isFront', true);
	},
	"click #notknown": function () {
		var currentCard = $('.carousel-inner > .active').attr('data');
		var currentLearned = Learned.findOne({
			card_id: currentCard,
			user_id: Meteor.userId()
		});

		Meteor.call('updateLearned', currentLearned._id, 1, new Date());

		if (1 === parseInt(Session.get('maxIndex'))) {
			Session.set('isFinish', true);
		}
		Session.set('isFront', true);
	}
});

/**
 * ############################################################################
 * boxSide
 * ############################################################################
 */

Template.boxSide.events({
	"click .learn-box": function (event) {
		var box = $(event.currentTarget).val();
		Session.set('selectedBox', box);
		Session.set('isFront', true);
		Session.set('isFinish', false);
	},
	'click #cardsetUser': function () {
		Router.go('profileOverview', {
			_id: Meteor.userId()
		});
	},
	"click #back-button": function () {
		window.history.go(-1);
	}
});

Template.boxSide.helpers({
	selectedBox: function (boxId) {
		var selectedBox = Session.get('selectedBox');
		if (boxId === selectedBox) {
			return "active";
		}
	},
	countBox: function (boxId) {
		return Learned.find({
			cardset_id: this._id,
			user_id: Meteor.userId(),
			box: boxId
		}).count();
	},
	isDisabled: function () {
		return this.learningActive ? 'disabled' : '';
	}
});

Template.boxSide.onDestroyed(function () {
	Session.set('selectedBox', null);
});

/**
 * ############################################################################
 * boxEnd
 * ############################################################################
 */

Template.boxEnd.helpers({
	isLearningActive: function () {
		return this.learningActive;
	}
});

Template.boxEnd.events({
	"click #endscreenBack": function () {
		Session.set('selectedBox', null);
		Session.set('isFinish', false);
		Router.go('cardsetdetailsid', {
			_id: this._id
		});
	}
});

/**
 * ############################################################################
 * Chart
 * ############################################################################
 */


Template.boxSide.onRendered(function () {
	var self = this;
	self.subscribe("learned", function () {
		self.autorun(function () {
			drawGraph();
		});
	});
});
