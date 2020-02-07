import "./intervals.html";
import {BonusForm} from "../../../../../../utils/bonusForm";
import {LeitnerProgress} from "../../../../../../utils/leitnerProgress";

/*
* ############################################################################
* bonusFormIntervals
* ############################################################################
*/

Template.bonusFormIntervals.events({
	"change input": function () {
		BonusForm.adjustInterval();
		BonusForm.initializeSimulatorData();
		LeitnerProgress.updateGraph();
	}
});
