import {Session} from "meteor/session";
import "./cardList.html";
import {CardIndex} from "../../../../utils/cardIndex";
import {CardsetNavigation} from "../../../../utils/cardsetNavigation";

/*
 * ############################################################################
 * cardSidebarItemCardList
 * ############################################################################
 */

Template.cardSidebarItemCardList.events({
	"click .selectCard": function () {
		CardsetNavigation.goToIndex();
	}
});

Template.cardSidebarItemCardList.helpers({
	gotMultipleCards: function () {
		if (Session.get('activeCard') !== -1) {
			return CardIndex.getCardIndex().length > 1;
		}
	}
});

