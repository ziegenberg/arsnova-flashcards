import "./maxWorkload.html";
import {BonusForm} from "../../../../../../utils/bonusForm";
import {LeitnerProgress} from "../../../../../../utils/leitnerProgress";

/*
* ############################################################################
* bonusFormMaxWorkload
* ############################################################################
*/

Template.bonusFormMaxWorkload.events({
	"change input": function () {
		BonusForm.adjustMaxWorkload();
		BonusForm.initializeSimulatorData();
		LeitnerProgress.updateGraph();
	}
});
