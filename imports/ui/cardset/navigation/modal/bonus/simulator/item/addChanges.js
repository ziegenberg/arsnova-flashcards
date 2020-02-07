import "./addChanges.html";
import {BonusForm} from "../../../../../../../utils/bonusForm";

/*
 * ############################################################################
 * bonusFormSimulatorAddChanges
 * ############################################################################
 */

Template.bonusFormSimulatorAddChanges.events({
	'click #addSimulatorChanges': function () {
		BonusForm.addSimulatorChanges();
		$('#cardsetLeitnerSimulatorModal').modal('hide');
	}
});
