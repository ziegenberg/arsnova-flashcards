import {LeitnerProgress} from "../../../utils/leitnerProgress";
import {Template} from "meteor/templating";
import "./labels.html";

/*
* ############################################################################
* cardsetInfo
* ############################################################################
*/

Template.cardsetLabels.helpers({
	getCardsetCardCount: function () {
		if (this.useLeitnerCount) {
			return LeitnerProgress.getCardsetCardCount(true);
		} else {
			return this.quantity;
		}
	}
});
