import "./start.html";
import {Template} from "meteor/templating";
import {Session} from "meteor/session";

/*
 * ############################################################################
 * cardsetSidebarBonusStart
 * ############################################################################
 */

Template.cardsetSidebarBonusStart.events({
	"click #startBonus": function () {
		Session.set('isNewBonus', true);
		$('#bonusFormModal').modal('show');
	}
});
