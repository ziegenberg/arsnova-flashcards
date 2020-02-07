import "./submissions.html";
import {TranscriptBonusList} from "../../../../../../../utils/transcriptBonus";

/*
 * ############################################################################
 * cardsetIndexTranscriptStatisticsItemBoxSubmissions
 * ############################################################################
 */

Template.cardsetIndexTranscriptStatisticsItemBoxSubmissions.helpers({
	getSubmissions: function (cardset_id, user_id, type) {
		return TranscriptBonusList.getSubmissions(cardset_id, user_id, type);
	}
});
