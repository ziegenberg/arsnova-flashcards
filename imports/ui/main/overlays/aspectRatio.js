import {Template} from "meteor/templating";
import {Session} from "meteor/session";
import {Icons} from "../../../api/icons";
import {CardVisuals} from "../../../api/cardVisuals.js";
import {AspectRatio} from "../../../api/aspectRatio.js";
import "./aspectRatio.html";


/*
 * ############################################################################
 * mainOverlayAspectRatio
 * ############################################################################
 */

Template.mainOverlayAspectRatio.events({
	"click .aspect-ratio-dropdown-button": function (event) {
		Session.set('aspectRatioMode', $(event.currentTarget).attr("data-id"));
		CardVisuals.resizeFlashcard();
	}
});

/*
 * ############################################################################
 * mainOverlayAspectRatioContent
 * ############################################################################
 */


Template.mainOverlayAspectRatioContent.helpers({
	aspectRatios: function () {
		return AspectRatio.getAspectRatios();
	},
	getItem: function () {
		let aspectRatio;
		switch (this) {
			case "fill":
			case "din":
				aspectRatio = this;
				break;
			default:
				aspectRatio = this.replace(":", "");

		}
		return "<li class='aspect-ratio-dropdown-button aspect-ratio' data-id='" + this + "'> <i class ='" + Icons.aspectRatio(aspectRatio) + "' data-id='" + this + "'></i>&nbsp;" +  TAPi18n.__('presentation.aspectRatio.' + aspectRatio) + "</li>";
	}
});
