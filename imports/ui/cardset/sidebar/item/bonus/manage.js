import "./manage.html";
import {Template} from "meteor/templating";
import {Session} from "meteor/session";

/*
 * ############################################################################
 * cardsetSidebarBonusManage
 * ############################################################################
 */

Template.cardsetSidebarBonusManage.events({
	"click #startBonus": function () {
		Session.set('isNewBonus', true);
		$('#bonusFormModal').modal('show');
	},
	"click #manageBonus": function () {
		Session.set('isNewBonus', false);
		$('#bonusFormModal').modal('show');
	}
});
