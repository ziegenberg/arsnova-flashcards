import {Session} from "meteor/session";
import {AspectRatio} from "../../../../utils/aspectRatio.js";
import "./presentation.html";

/*
 * ############################################################################
 * cardSidebarItemPresentation
 * ############################################################################
 */

Template.cardSidebarItemPresentation.events({
	"click .startPresentation": function () {
		Session.set('aspectRatioMode', AspectRatio.getDefault());
		Router.go('presentation', {_id: Router.current().params._id});
	}
});
