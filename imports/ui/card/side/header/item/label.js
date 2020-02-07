import {CardType} from "../../../../../utils/cardTypes";
import "./label.html";

/*
 * ############################################################################
 * cardContentItemLabel
 * ############################################################################
 */

Template.cardContentItemLabel.helpers({
	gotDifficulty: function (cardType) {
		return CardType.gotDifficultyLevel(cardType);
	}
});
