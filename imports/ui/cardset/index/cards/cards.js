//------------------------ IMPORTS
import {Session} from "meteor/session";
import {Template} from "meteor/templating";
import {Cards} from "../../../../api/cards";
import {CardVisuals} from "../../../../api/cardVisuals";
import {CardType} from "../../../../api/cardTypes";
import {Cardsets} from "../../../../api/cardsets";
import {Route} from "../../../../api/route";
import {CardNavigation} from "../../../../api/cardNavigation";
import "./cards.html";

/*
 * ############################################################################
 * cardsetList
 * ############################################################################
 */

Template.cardsetList.helpers({
	isShuffledCardset: function () {
		if (Router.current().route.getName() === "demolist") {
			return Cardsets.findOne({kind: 'demo', name: "DemoCardset", shuffled: true}).shuffled;
		} else if (Router.current().route.getName() === "makinglist") {
			return Cardsets.findOne({kind: 'demo', name: "MakingOfCardset", shuffled: true}).shuffled;
		} else {
			return Cardsets.findOne({_id: Router.current().params._id}).shuffled;
		}
	},
	cardsetList: function () {
		let isDemo = (Router.current().route.getName() === "demolist" || Router.current().route.getName() === "makinglist");
		if (Router.current().route.getName() === "cardsetlistid" || Router.current().route.getName() === "presentationlist" || isDemo) {
			let cardsetId = Router.current().params._id;
			if (isDemo) {
				if (Route.isDemo()) {
					cardsetId = Cardsets.findOne({kind: 'demo', name: "DemoCardset", shuffled: true})._id;
				} else {
					cardsetId = Cardsets.findOne({kind: 'demo', name: "MakingOfCardset", shuffled: true})._id;
				}
			}
			if (this.shuffled) {
				let cardsetFilter = [];
				let sortCardsets = Cardsets.find({_id: {$in: this.cardGroups}}, {
					sort: {name: 1}, fields: {_id: 1, name: 1, kind: 1, owner: 1, quantity: 1, difficulty: 1, cardType: 1}
				}).fetch();
				sortCardsets.forEach(function (cardset) {
					if (cardset._id !== cardsetId) {
						cardsetFilter.push(cardset);
					}
				});
				return cardsetFilter;
			} else {
				return Cardsets.find({_id: this._id}).fetch();
			}
		} else {
			return Cardsets.find({_id: Session.get('tempLearningIndex')}).fetch();
		}
	},
	getPriority: function (index) {
		return index + 1;
	},
	cleanContent: function (text) {
		return CardVisuals.removeMarkdeepTags(text);
	},
	gotCards: function () {
		if (Router.current().route.getName() === "cardsetlistid" || Router.current().route.getName() === "presentationlist" || Router.current().route.getName() === "demolist" || Router.current().route.getName() === "makinglist") {
			if (this.shuffled) {
				return Cards.find({cardset_id: {$in: this.cardGroups}}).count();
			} else {
				return Cards.find({cardset_id: this._id}).count();
			}
		} else {
			return Cards.find({cardset_id: Session.get('tempLearningIndex'), cardType: 0}).count();
		}
	},
	cardSubject: function () {
		if (Router.current().route.getName() === "cardsetlistid" || Router.current().route.getName() === "presentationlist" || Router.current().route.getName() === "demolist" || Router.current().route.getName() === "makinglist") {
			return _.uniq(Cards.find({
				cardset_id: this._id
			}, {
				cardset_id: 1,
				subject: 1,
				sort: {subject: 1}
			}).fetch(), function (card) {
				return card.subject;
			});
		} else {
			return _.uniq(Cards.find({
				cardset_id: this._id
			}, {
				cardset_id: 1,
				subject: 1,
				sort: {subject: 1}
			}).fetch(), function (card) {
				return card.subject;
			});
		}
	},
	cardList: function (countCards) {
		let sortQuery;
		sortQuery = CardType.getSortQuery(Cardsets.findOne({_id: this.cardset_id}).cardType);
		if (countCards) {
			return Cards.find({
				cardset_id: this.cardset_id,
				subject: this.subject
			}, {
				fields: {
					_id: 1,
					front: 1,
					back: 1,
					hint: 1,
					lecture: 1,
					top: 1,
					bottom: 1,
					cardset_id: 1
				},
				sort: sortQuery
			}).count();
		}
		let cards = Cards.find({
			cardset_id: this.cardset_id,
			subject: this.subject
		}, {
			fields: {
				_id: 1,
				front: 1,
				back: 1,
				hint: 1,
				lecture: 1,
				top: 1,
				bottom: 1,
				cardset_id: 1
			},
			sort: sortQuery
		}).fetch();
		return CardVisuals.setTypeAndDifficulty(cards);
	},
	getColors: function () {
		switch (this.kind) {
			case "personal":
				return "btn-warning";
			case "free":
				return "btn-info";
			case "edu":
				return "btn-success";
			case "pro":
				return "btn-danger";
			case "demo":
				return "btn-demo";
		}
	},
	gotReferences: function () {
		return Cardsets.findOne({_id: Router.current().params._id}).cardGroups !== [""];
	},
	getText: function () {
		let cubeSides = CardType.getCardTypeCubeSides(this.cardType);
		switch (cubeSides[0].contentId) {
			case 1:
				return this.front;
			case 2:
				return this.back;
			case 3:
				return this.hint;
			case 4:
				return this.lecture;
			case 5:
				return this.top;
			case 6:
				return this.bottom;
		}
	}
});

Template.cardsetList.events({
	'click .cardListRow': function (evt) {
		let cubeSides = CardType.getCardTypeCubeSides($(evt.target).data('card-type'));
		Session.set('cardType', $(evt.target).data('card-type'));
		Session.set('activeCardContentId', cubeSides[0].contentId);
		if (Router.current().route.getName() === "cardsetlistid" || Router.current().route.getName() === "presentationlist" || Router.current().route.getName() === "demolist" || Router.current().route.getName() === "makinglist") {
			CardNavigation.setActiveCardData($(evt.target).data('id'));
			if (Router.current().route.getName() === "presentationlist") {
				Router.go('presentation', {
					_id: Router.current().params._id
				});
			} else if (Router.current().route.getName() === "demolist") {
				Router.go('demo');
			} else if (Router.current().route.getName() === "makinglist") {
				Router.go('making');
			} else {
				Router.go('cardsetcard', {
					_id: Router.current().params._id,
					card_id: $(evt.target).data('id')
				});
			}
		} else {
			let learningUnit = $(evt.target).data('id');
			Session.set('learningIndex', Session.get('tempLearningIndex'));
			Session.set('learningUnit', learningUnit);
			Session.set('subject', Cards.findOne({_id: learningUnit}).subject);
			$('#showSelectLearningUnitModal').modal('hide');
		}
	}
});