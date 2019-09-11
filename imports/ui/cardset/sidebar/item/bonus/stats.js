import "./stats.html";
import {Template} from "meteor/templating";

/*
 * ############################################################################
 * cardsetSidebarBonusStats
 * ############################################################################
 */

Template.cardsetSidebarBonusStats.events({
	"click #showStats": function () {
		Router.go('cardsetstats', {_id: Router.current().params._id});
	}
});
