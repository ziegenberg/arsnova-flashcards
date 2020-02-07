import {Profile} from "../../../../utils/profile";
import {Session} from "meteor/session";
import {SweetAlertMessages} from "../../../../utils/sweetAlertMessages";
import {Template} from "meteor/templating";
import "./createRepetitoriumButton.html";

/*
 * ############################################################################
 * filterItemCreateRepetitoriumButton
 * ############################################################################
 */

Template.filterItemCreateRepetitoriumButton.events({
	'click #newRepetitorium': function () {
		if (Profile.isCompleted()) {
			Session.set('isNewCardset', true);
			$('#setCardsetFormModal').modal('show');
		} else {
			SweetAlertMessages.completeProfile();
		}
	}
});
