import "./intervals.html";
import {BonusForm} from "../../../../../../../utils/bonusForm";
import {LeitnerProgress} from "../../../../../../../utils/leitnerProgress";

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
