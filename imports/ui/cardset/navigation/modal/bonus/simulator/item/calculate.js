import "./calculate.html";
import {BonusForm} from "../../../../../../../utils/bonusForm";
import {LeitnerProgress} from "../../../../../../../utils/leitnerProgress";

/*
 * ############################################################################
 * bonusFormSimulatorCalculate
 * ############################################################################
 */

Template.bonusFormSimulatorCalculate.events({
	'click .calculateWorkload': function () {
		BonusForm.adjustErrorCount();
		BonusForm.calculateWorkload(BonusForm.getMaxWorkload());
		LeitnerProgress.updateGraph();
	}
});
