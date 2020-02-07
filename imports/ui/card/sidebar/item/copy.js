import "./copy.html";
import {CardNavigation} from "../../../../utils/cardNavigation";

/*
 * ############################################################################
 * cardSidebarItemCopy
 * ############################################################################
 */

Template.cardSidebarItemCopy.helpers({
	isCardNavigationVisible: function () {
		return CardNavigation.isVisible();
	}
});

Template.cardSidebarItemCopy.events({
	"click .copyCard": function () {
		$('#copyCard').children().addClass("pressed");
		$('#showCopyCardModal').modal('show');
	}
});
