import "./errorRate.html";
import {BonusForm} from "../../../../../../../utils/bonusForm";
import {LeitnerProgress} from "../../../../../../../utils/leitnerProgress";

/*
 * ############################################################################
 * bonusFormSimulatorErrorRate
 * ############################################################################
 */

Template.bonusFormSimulatorErrorRate.helpers({
	getCardCount: function () {
		return BonusForm.getCardCount();
	}
});

Template.bonusFormSimulatorErrorRate.events({
	'change input': function () {
		BonusForm.adjustErrorCount();
		BonusForm.initializeSimulatorData();
		LeitnerProgress.updateGraph();
	}
});
