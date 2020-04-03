import "./arsnovaClick.html";
import {Session} from "meteor/session";
import {Template} from "meteor/templating";
import {Cardsets} from "../../../../api/subscriptions/cardsets";
import {Cards} from "../../../../api/subscriptions/cards";

Session.setDefault('arsnovaClickSessionID', '');
/*
 * ############################################################################
 * cardSidebarItemArsnovaClick
 * ############################################################################
 */

Template.cardSidebarItemArsnovaClick.helpers({
	gotSessionID: function () {
		if (this.shuffled && this.arsnovaClick.overrideOnlyEmptySessions) {
			let currentCard = Cards.findOne(Session.get('activeCard'));
			if (currentCard !== undefined) {
				let currentCardset = Cardsets.findOne({_id: currentCard.cardset_id}, {fields: {arsnovaClick: true}});
				if (currentCardset !== undefined) {
					if (currentCardset.arsnovaClick.session !== undefined && currentCardset.arsnovaClick.session.length) {
						Session.set('arsnovaClickSessionID', currentCardset.arsnovaClick.session);
						return true;
					} else if (this.arsnovaClick.session !== undefined && this.arsnovaClick.session.length) {
						Session.set('arsnovaClickSessionID', this.arsnovaClick.session);
						return true;
					} else {
						Session.set('arsnovaClickSessionID', '');
					}
				}
			}
		} else if (this.arsnovaClick.session !== undefined) {
			Session.set('arsnovaClickSessionID', this.arsnovaClick.session);
			return true;
		} else {
			Session.set('arsnovaClickSessionID', '');
		}
	}
});

Template.cardSidebarItemArsnovaClick.events({
	"click .showArsnovaClick": function () {
		$('#arsnovaClickModal').modal('show');
	}
});
