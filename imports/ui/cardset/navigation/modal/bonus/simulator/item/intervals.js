import "./intervals.html";
import {BonusForm} from "../../../../../../../api/bonusForm";
import {LeitnerProgress} from "../../../../../../../api/leitnerProgress";

/*
* ############################################################################
* bonusFormSimulatorIntervals
* ############################################################################
*/

Template.bonusFormSimulatorIntervals.events({
	"change input": function () {
		BonusForm.adjustInterval(true);
		BonusForm.initializeSimulatorData();
		LeitnerProgress.updateGraph();
	}
});
