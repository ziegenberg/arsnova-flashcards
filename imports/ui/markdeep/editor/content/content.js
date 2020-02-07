import {Session} from "meteor/session";
import {CardType} from "../../../../utils/cardTypes";
import {Template} from "meteor/templating";
import {CardVisuals} from "../../../../utils/cardVisuals";
import "./content.html";
import {Route} from "../../../../utils/route";
import {isNewCardset} from "../../../forms/cardsetForm";
import {Dictionary} from "../../../../utils/dictionary";

/*
 * ############################################################################
 * markdeepContent
 * ############################################################################
 */

Template.markdeepContent.rendered = function () {
	CardVisuals.isTextCentered();
};

Template.markdeepContent.events({
	'click #contentEditor': function () {
		Session.set('dictionaryBeolingus', 0);
		Session.set('dictionaryLinguee', 0);
		Session.set('dictionaryGoogle', 0);
	},
	'input #contentEditor': function () {
		let content = $('#contentEditor').val();
		$('#editor').attr('data-content', content);
		Session.set('content' + Session.get('activeCardContentId'), content);
		Dictionary.setMode(0);
	}
});

Template.markdeepContent.helpers({
	getPlaceholder: function () {
		return CardType.getPlaceholderText(Session.get('activeCardContentId'), Session.get('cardType'), Session.get('learningGoalLevel'));
	},
	getContent: function () {
		return Session.get('content' + Session.get('activeCardContentId'))	;
	},
	getShuffleDescription: function () {
		if (Session.get("ShuffleTemplate") !== undefined) {
			return ActiveRoute.name('shuffle') ? Session.get("ShuffleTemplate").description : "";
		}
	},
	isNew: function () {
		return Session.get('isNewCardset');
	},
	isRepetitorium: function () {
		if (isNewCardset()) {
			return Route.isRepetitorienFilterIndex();
		} else {
			if (Session.get('activeCardset') !== undefined) {
				return Session.get('activeCardset').shuffled;
			}
		}
	}
});
