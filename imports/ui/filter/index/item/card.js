//------------------------ IMPORTS

import {Template} from "meteor/templating";
import {Session} from "meteor/session";
import {Route} from "../../../../api/route";
import {TranscriptBonus, TranscriptBonusList} from "../../../../api/transcriptBonus";
import "../../../cardset/cardset.js";
import "./card.html";

/*
 * ############################################################################
 * filterIndexItemCard
 * ############################################################################
 */

Template.filterIndexItemCard.events({
	'click .deleteCard': function (event) {
		Session.set('activeCard', $(event.target).data('id'));
	},
	'click .editCard': function (event) {
		Router.go('editTranscript', {card_id: $(event.target).data('id')});
	}
});

Template.filterIndexItemCard.helpers({
	getName: function () {
		let shuffled = "";
		if (this.shuffled) {
			shuffled = TAPi18n.__('admin.shuffled') + " ";
		}
		return shuffled;
	},
	isBonusTranscriptsRouteAndDeadlineExpired: function () {
		if (Route.isMyBonusTranscripts() || Route.isTranscriptBonus()) {
			let bonusTranscript = TranscriptBonus.findOne({card_id: this._id});
			if (bonusTranscript !== undefined) {
				return TranscriptBonusList.isDeadlineExpired(bonusTranscript, true);
			}
		}
	},
	getCardsetID: function () {
		return Router.current().params._id;
	},
	setGridSize: function (gridSize) {
		let item = JSON.parse(JSON.stringify(this));
		item.gridSize = gridSize;
		return item;
	}
});
