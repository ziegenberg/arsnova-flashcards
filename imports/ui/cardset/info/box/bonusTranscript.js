//------------------------ IMPORTS
import {Template} from "meteor/templating";
import {CardsetVisuals} from "../../../../api/cardsetVisuals";
import "./item/bonusPointsFAQ.js";
import "./item/transcript/editDeadline.js";
import "./item/transcript/submissionDeadline.js";
import "./bonusTranscript.html";

/*
* ############################################################################
* bonusTranscriptInfoBox
* ############################################################################
*/

Template.bonusTranscriptInfoBox.events({
	"click #collapseBonusTranscriptInfoButton": function (event) {
		event.preventDefault();
		CardsetVisuals.changeCollapseElement("#collapseBonusTranscriptInfo");
	}
});
