import {CardVisuals} from "../../../../utils/cardVisuals.js";
import "./aspectRatio.html";

/*
 * ############################################################################
 * cardSidebarItemAspectRatio
 * ############################################################################
 */

Template.cardSidebarItemAspectRatio.events({
	"click .aspect-ratio-button": function () {
		CardVisuals.toggleAspectRatioContainer();
	}
});
