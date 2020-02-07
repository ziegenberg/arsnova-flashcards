import "./resetErrorRate.html";
import {BonusForm} from "../../../../../../../utils/bonusForm";

/*
 * ############################################################################
 * bonusFormSimulatorResetErrorRate
 * ############################################################################
 */

Template.bonusFormSimulatorResetErrorRate.events({
	'click #resetErrorRate': function () {
		BonusForm.resetErrorCount();
	}
});
