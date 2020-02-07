//------------------------ IMPORTS
import {Template} from "meteor/templating";
import {Session} from "meteor/session";
import {AspectRatio} from "../../../../utils/aspectRatio.js";
import "./presentation.html";

/*
 * ############################################################################
 * cardsetNavigationPresentation
 * ############################################################################
 */

Template.cardsetNavigationPresentation.events({
	"click .startPresentation": function () {
		Session.set('aspectRatioMode', AspectRatio.getDefault());
		Session.set('activeCardSide', undefined);
		Router.go('presentation', {_id: this._id});
	},
	"click .aspect-ratio-dropdown-button": function (evt) {
		Session.set('forcedAspectRatio', 1);
		Session.set('activeCardSide', undefined);
		Session.set('aspectRatioMode', $(evt.currentTarget).attr("data-id"));
		Router.go('presentation', {_id: Router.current().params._id});
	}
});
