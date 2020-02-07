import "./starsMedian.html";
import {TranscriptBonusList} from "../../../../../../../utils/transcriptBonus";

/*
 * ############################################################################
 * cardsetIndexTranscriptStatisticsItemBoxStarsMedian
 * ############################################################################
 */

Template.cardsetIndexTranscriptStatisticsItemBoxStarsMedian.helpers({
	getStarsMedian: function (cardset_id, user_id, type) {
		return TranscriptBonusList.getStarsData(cardset_id, user_id, type);
	}
});
