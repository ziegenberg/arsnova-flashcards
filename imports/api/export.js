import {Meteor} from "meteor/meteor";
import {Cardsets} from "./cardsets.js";
import {Cards} from "./cards.js";
import {check} from "meteor/check";

function exportCards(cardset_id) {
	if (Meteor.isServer) {
		let cards = Cards.find({
			cardset_id: cardset_id
		}, {
			fields: {
				'cardset_id': 0,
				'cardGroup': 0,
				'_id': 0
			}, sort: {
				'subject': 1,
				'front': 1
			}
		}).fetch();

		let cardsString = '';

		for (let i = 0; i < cards.length; i++) {
			cardsString += JSON.stringify(cards[i]);
			if (i < cards.length - 1) {
				cardsString += ", ";
			}
		}
		return cardsString;
	}
}

function getOriginalAuthorName(owner) {
	if (Meteor.isServer) {
		let author = Meteor.users.findOne({"_id": owner});
		let degree = "";
		if (author.profile.title) {
			degree = author.profile.title;
		}
		if (author.profile.givenname === undefined && author.profile.birthname === undefined) {
			author.profile.givenname = TAPi18n.__('cardset.info.undefinedAuthor');
			return author.profile.givenname;
		}
		if (degree !== "") {
			return degree + " " + author.profile.givenname + " " + author.profile.birthname;
		} else {
			return author.profile.givenname + " " + author.profile.birthname;
		}
	}
}

Meteor.methods({
	exportCards: function (cardset_id) {
		check(cardset_id, String);
		let cardset = Cardsets.findOne(cardset_id);
		if (cardset.owner !== Meteor.userId() && !Roles.userIsInRole(Meteor.userId(), ["admin", "editor"]) || cardset.shuffled) {
			throw new Meteor.Error("not-authorized");
		}
		return exportCards(cardset._id);
	},
	exportCardset: function (cardset_id) {
		check(cardset_id, String);
		let cardset = Cardsets.findOne({
			_id: cardset_id
		}, {
			fields: {
				'cardGroups': 0,
				'_id': 0
			}
		});
		if (cardset.owner !== Meteor.userId() && !Roles.userIsInRole(Meteor.userId(), ["admin", "editor"])) {
			throw new Meteor.Error("not-authorized");
		}
		cardset.originalAuthor = getOriginalAuthorName(cardset.owner);
		let cardsetString = JSON.stringify(cardset);
		cardsetString += exportCards(cardset_id);
		return cardsetString;
	}
});
