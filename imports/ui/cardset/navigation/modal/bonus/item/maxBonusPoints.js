import "./maxBonusPoints.html";
import {BonusForm} from "../../../../../../utils/bonusForm";

/*
* ############################################################################
* bonusFormMaxPoints
* ############################################################################
*/

Template.bonusFormMaxPoints.events({
	"input #maxBonusPoints": function () {
		BonusForm.adjustMaxBonusPoints();
	}
});
