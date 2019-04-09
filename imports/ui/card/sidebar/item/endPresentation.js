import "./endPresentation.html";
import {Route} from "../../../../api/route";

/*
 * ############################################################################
 * cardSidebarItemEndPresentation
 * ############################################################################
 */

Template.cardSidebarItemEndPresentation.events({
	"click .endPresentation": function () {
		if (Route.isMakingOf()) {
			Router.go('home');
		} else if (Route.isPresentationTranscript()) {
			Router.go('transcripts');
		} else {
			Router.go('cardsetdetailsid', {
				_id: Router.current().params._id
			});
		}
	}
});
