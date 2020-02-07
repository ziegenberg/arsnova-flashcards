import "./endPresentation.html";
import {Route} from "../../../../utils/route";

/*
 * ############################################################################
 * cardSidebarItemEndPresentation
 * ############################################################################
 */

Template.cardSidebarItemEndPresentation.events({
	"click .endPresentation": function () {
		if (Route.isMakingOf() || Route.isDemo()) {
			Router.go('home');
		} else if (Route.isPresentationTranscriptPersonal()) {
			Router.go('transcriptsPersonal');
		} else if (Route.isPresentationTranscriptBonus()) {
			Router.go('transcriptsBonus');
		} else if (Route.isPresentationTranscriptBonusCardset() || Route.isPresentationTranscriptReview()) {
			Router.go('transcriptBonus', {
				_id: Router.current().params._id
			});
		} else {
			Router.go('cardsetdetailsid', {
				_id: Router.current().params._id
			});
		}
	}
});
