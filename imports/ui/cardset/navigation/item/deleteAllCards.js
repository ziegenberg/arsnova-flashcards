//------------------------ IMPORTS
import {Meteor} from "meteor/meteor";
import {Session} from "meteor/session";
import {Template} from "meteor/templating";
import {Bonus} from "../../../../api/bonus";
import "../modal/deleteAllCards.js";
import "./deleteAllCards.html";

/*
 * ############################################################################
 * cardsetNavigationExport
 * ############################################################################
 */

Template.cardsetNavigationDeleteAllCards.helpers({
	isInBonus: function () {
		return Bonus.isInBonus(Session.get('activeCardset')._id, Meteor.userId());
	}
});
