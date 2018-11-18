import {Template} from "meteor/templating";
import {Session} from "meteor/session";
import {Route} from "../../../api/route";
import {CardType} from "../../../api/cardTypes";
import {Cardsets} from "../../../api/cardsets";
import {CardNavigation} from "../../../api/cardNavigation";
import "./settings.html";

/*
 * ############################################################################
 * cardSettingsModal
 * ############################################################################
 */

Template.cardSettingsModal.helpers({
	getText: function () {
		if (Route.isDemo() || ((Route.isBox() || Route.isMemo()) && Cardsets.findOne({_id: Router.current().params._id}).shuffled)) {
			if (Route.isDemo()) {
				CardType.gotCardTypesWithSwapAnswerQuestionButton(Cardsets.findOne({name: "DemoCardset", shuffled: true})._id);
			} else {
				CardType.gotCardTypesWithSwapAnswerQuestionButton(Router.current().params._id);
			}
			return TAPi18n.__('swapQuestionAnswer.modal.shuffled', {cardTypes: CardType.getCardTypesWithSwapAnswerQuestionTooltip()});
		} else {
			return TAPi18n.__('swapQuestionAnswer.modal.normal');
		}
	}
});

Template.cardSettingsModal.events({
	"click #cardSettingsForward": function () {
		$('#cardSettingsModal').modal('hide');
	},
	"click #cardSettingsBackward": function () {
		Session.set('swapAnswerQuestion', 1);
		CardNavigation.resetNavigation();
		$('#cardSettingsModal').modal('hide');
	}
});

