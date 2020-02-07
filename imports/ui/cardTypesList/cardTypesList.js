import "./cardTypesList.html";
import {Template} from "meteor/templating";
import {CardType} from "../../utils/cardTypes";
import {Cardsets} from "../../api/subscriptions/cardsets";
import {Filter} from "../../utils/filter";
import {Session} from "meteor/session";
import {UserPermissions} from "../../utils/userPermissions";

/*
 * ############################################################################
 * category
 * ############################################################################
 */

Template.cardTypesList.helpers({
	getCardTypes: function () {
		return CardType.getCardTypesOrder();
	},
	getCardTypeLongName: function () {
		return CardType.getCardTypeLongName(this.cardType);
	},
	filterCardTypes: function (cardType) {
		if (Session.get("selectingCardsetToLearn") && !CardType.gotLearningModes(cardType)) {
			return;
		}
		let query = Filter.getFilterQuery();
		query.cardType = cardType;
		return Cardsets.find(query).count();
	},
	resultsFilterCardType: function (cardType) {
		return Filter.getFilterQuery().cardType === cardType;
	},
	canCreateCardType: function (cardType) {
		if (CardType.gotTranscriptBonus(cardType)) {
			return (UserPermissions.isLecturer() || UserPermissions.isAdmin());
		} else {
			return true;
		}
	}
});
